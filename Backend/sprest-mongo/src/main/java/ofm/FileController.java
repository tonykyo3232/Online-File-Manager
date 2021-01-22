package ofm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequestMapping(value = "/file")
public class FileController {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private FileRepository fileRepository;
	private FolderRepository folderRepository;
	private IdRepository idRepository;

	public FileController(FileRepository entry_fileRepository, FolderRepository entry_folderRepository, IdRepository entry_idRepository) {
		this.fileRepository = entry_fileRepository;
		this.folderRepository = entry_folderRepository;
		this.idRepository = entry_idRepository;
	}
		
	// Show All Files
	@GetMapping("/all")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public List<FileModel> getAllFiles() {
		logger.info("Getting all files.");
		return fileRepository.findAll();
	}
	
	// List Top-level Files
	@GetMapping
	@ResponseStatus(HttpStatus.ACCEPTED)
	public List<FileModel> getTopLvFiles() {
		logger.info("Getting top-level files.");
		return fileRepository.findByParentId(0);
	}

	// get a single file
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public FileModel getFile(@PathVariable Integer id) {
		logger.info("Getting file with ID: {}.", id);
		Optional<FileModel> fileModel = fileRepository.findById(id);
		return fileModel.get();
	}
	
	// get the belong folder of the file
	@GetMapping("/{id}/parent")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public FolderModel getBelongFolder(@PathVariable Integer id) {
		logger.info("Getting this file's belong folders with ID: {}.", id);
		Optional<FileModel> file = fileRepository.findById(id);
		System.out.println("Parentid: " + file.get().getParentId());
		Optional<FolderModel> belongFolder = folderRepository.findById(file.get().getParentId());
		return belongFolder.get();
	}
		
	// delete a file
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFile(@PathVariable Integer id) {
		FileModel model = fileRepository.findById(id).get();
		logger.info("Deleting file.");		
		fileRepository.delete(model);
	}
	   
   // upload the file (not adding any folder)
   // assuming that the file with the same name is the same file
   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public FileModel uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("folderId") Integer folderId) throws IOException {
	   logger.info("Upload files.");

	   System.out.println("folderId is: " + folderId);
	   FolderModel folder = null;
	   if(folderId != 0) {
		   folder = folderRepository.findById(folderId).get();
	   }
	   
	   // to check the file version, we need to check
	   // if there is a file with same name and in same folder
	   List<FileModel> files = fileRepository.findAll(); 
	   int curr_version = 1;
	   
	   // find the current version of the file
	   // if the file already exists in database, keep looking for the latest version
	   for(FileModel f: files) {
		   if(f.getName().equals(file.getOriginalFilename()) && 
				   curr_version <= f.getFileVersion() && folderId == f.getParentId()) {
			   curr_version++;
		   }
	   }
	   
	   // upload the file to local disk
	   File uploadedFile;
	   
	   if(folderId == 0) {
		   if(curr_version == 1) {
			   uploadedFile = new File(System.getProperty("user.dir") + "/fileIO/localDB/" + file.getOriginalFilename());
		   }
		   else {
			   uploadedFile = new File(System.getProperty("user.dir") + "/fileIO/localDB/" + "(" + curr_version + ")" + file.getOriginalFilename());
		   }
	   }
	   else {
		   if(curr_version == 1) {
			   uploadedFile = new File(System.getProperty("user.dir") + "/fileIO/localDB/" + "Folder(" + folder.getName() + ")-" + file.getOriginalFilename());
		   }
		   else {
			   uploadedFile = new File(System.getProperty("user.dir") + "/fileIO/localDB/" + "Folder(" + folder.getName() + ")-" +"(" + curr_version + ")" + file.getOriginalFilename());
		   }
	   }
	   
	   uploadedFile.createNewFile();
		
	   try (FileOutputStream fout = new FileOutputStream(uploadedFile)) {
			fout.write(file.getBytes());
	   }catch(Exception e) {
			e.printStackTrace();
		}
		
	   // find the Id value for the new file
	   IdModel idModel = idRepository.findById(1).get();
	   Integer id = idModel.getValue();
	   
	   // update the id for the next post request
	   idModel.setValue(id+1);
	   idRepository.save(idModel);
	   
	   // Upload the file info to MongoDB
	   FileModel newFile = new FileModel();
	   newFile.setName(file.getOriginalFilename());
	   newFile.setFileVersion(curr_version);
	   newFile.setParentId(folderId);
	   newFile.setId(id);
	   newFile.setCreationDate(new Date());
	   logger.info(newFile.toString());
	   return fileRepository.save(newFile);
	}
   
   	// download the file
 	// given the file id, it can download the file at any version and level
 	@GetMapping("/{file_id}/download")
 	public void download(HttpServletRequest request, HttpServletResponse response,
 			@PathVariable int file_id) 
 			throws ServletException, IOException {
 		
 		FileModel file = fileRepository.findById(file_id).get(); 
 				
        String fileType = findValue("([./].*)",file.getName());
        String fileName = findValue("([a-zA-Z_0-9]*)", file.getName());
        
        if(fileType.equals("NOT FOUND!") == false && fileName.equals("NOT FOUND!") == false) {
         	  // You must tell the browser the file type you are going to send
         	  // for example application/pdf, text/plain, text/html, image/jpg
               
         	  String typeOption = "";
         	  if(fileType.equals("jpg") || fileType.equals("jepg") || 
         			  fileType.equals("JPG") || fileType.equals("JEPG")) {
         		  typeOption = "image/jpeg";
  	      	  }
  	      	  else if(fileType.equals("txt")) {
  	      		typeOption = "text/plain";
  	      	  }
  	      	  else if(fileType.equals("pdf")) {
  	      		typeOption = "application/pdf";
  	      	  }
  	      	  response.setContentType(typeOption);

              // Make sure to show the download dialog
              response.setHeader("Content-disposition","attachment; filename=" + fileName + "." + fileType);

              // Assume file name is retrieved from database
              // For example D:\\file\\test.pdf
              // check if there's any version
              File my_file;
              File downloadFile;
              String fileFormat = "";
               
              // if file doesn't belongs to a folder
              if(file.getParentId() == 0) {
                if(file.getFileVersion() == 1) {
                	fileFormat = file.getName();
               	}
               	else {
               		fileFormat = "(" + file.getFileVersion() + ")" + file.getName();
               	}
              }
              // if file belongs to a folder
              else {
	              // get file's belong folder   
	              FolderModel folder = folderRepository.findById(file.getParentId()).get();
	              if(file.getFileVersion() == 1) {
	            	  fileFormat = "Folder(" + folder.getName() + ")-" + file.getName();
	              }
	              else {
	               		fileFormat = "Folder(" + folder.getName() + ")-(" + file.getFileVersion() + ")" + file.getName();  
	              }
              }
                           
              my_file = new File( System.getProperty("user.dir") + "/fileIO/localDB/" + fileFormat);
           	  downloadFile = new File( System.getProperty("user.dir") + "/fileIO/download/" + fileFormat);
               
              // download the file to local disk
              downloadFile.createNewFile(); 		
       		  FileOutputStream fout = new FileOutputStream(downloadFile);
      
              // Send the response of file to DB 
              OutputStream out = response.getOutputStream();
              FileInputStream in = new FileInputStream(my_file);
              byte[] buffer = new byte[4096];
              int length;
              while ((length = in.read(buffer)) > 0){
                 out.write(buffer, 0, length);
                 fout.write(buffer, 0, length);
              }
              in.close();
              out.flush();
              fout.close();
        }
 	}
  
 	// helper function
  	// use regular expression to find the wanted value
  	public String findValue(String pattern, String target) {
  		
  		String returnval = "";
  		
  		// Create a Pattern object
  		Pattern r = Pattern.compile(pattern);
  		
  		// Now create matcher object.
  		Matcher m = r.matcher(target);
  		if (m.find()) {
  			returnval = m.group(0);
  			if(returnval.contains("."))
  				returnval = returnval.replace(".", "");
  		}
  		else {
  			returnval = "NOT FOUND!";
  		}
  		return returnval;
  	}
}