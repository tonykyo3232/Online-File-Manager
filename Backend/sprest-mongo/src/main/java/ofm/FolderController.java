package ofm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/folder")
public class FolderController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	public FolderController(FileRepository entry_fileRepository, FolderRepository entry_folderRepository) {
		this.fileRepository = entry_fileRepository;
		this.folderRepository = entry_folderRepository;
	}
	
	// dummy method for testing the connection
	@GetMapping("/hello")
	public String greetings() {
		logger.info("Greetings!");
		return "Hello from FolderController!";
	}
	
	@GetMapping("/all")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public List<FolderModel> getAllFolders() {
		logger.info("Getting all folders.");
		return folderRepository.findAll();
	}

	// Top level files and folders
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@GetMapping
	@ResponseStatus(HttpStatus.ACCEPTED)
	public List getTopLevel() {
		logger.info("Getting all top-level folders.");
		List merged = new ArrayList(folderRepository.findByParentId(0));
        merged.addAll(fileRepository.findByBelFolderId(0));
		return merged;
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public FolderModel getFolder(@PathVariable long id) {
		logger.info("Getting folders with ID: {}.", id);
		Optional<FolderModel> folderModel = folderRepository.findById(id);
		return folderModel.get();
	}
	
	@GetMapping("/{id}/parent")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public FolderModel getParentFolder(@PathVariable long id) {
		logger.info("Getting folders with ID: {}.", id);
		Optional<FolderModel> folderModel = folderRepository.findById(id);
		System.out.println("Parentid: " + folderModel.get().getParentId());
		Optional<FolderModel> parentFolder = folderRepository.findById(folderModel.get().getParentId());
		return parentFolder.get();
	}
		
	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public FolderModel CreateFolder(@RequestBody FolderModel folder) {
		logger.info("Saving folders.");
		return folderRepository.save(folder);
	}
	
	// delete the folder (including its sub-folder and files)
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFolder(@PathVariable Long id) {
		FolderModel folder = folderRepository.findById(id).get();
		logger.info("Deleting folders.");
			
		// get sub folders
		List<FolderModel> subFolders = folderRepository.findByParentId(folder.getId());
				
		// check if this folder contains any sub folders
		if(subFolders.size() != 0) {
			logger.info("deleteFolder - processing folder " + folder.getName());
			for (FolderModel f: subFolders) {
				_deleteFolder(f);
			}
		}
		
		// after cleaning up its sub folder and files, start deleting the current level files
		List<FileModel> files = fileRepository.findByBelFolderId(folder.getId());
		
		// if this folder't contain any file, it will only delete folder itself
		// otherwise delete file(s) through a loop
		if(files.size() != 0) {
			for(FileModel f: files) {
				logger.info("deleteFolder - processing file " + f.getName());
				fileRepository.delete(f);
			}
		}
		
		// delete folder itself at the end of the method
		folderRepository.delete(folder);
	}
	
	// Recursion function
	// helper function to delete all the sub folders and files
	// always delete files first then folder after
	public void _deleteFolder(FolderModel folder) {
	
		// check if this folder contains any sub folders
		List<FolderModel> folders = folderRepository.findByParentId(folder.getId());
		
		if(folders.size() != 0) {
			// loop through each folder and delete its sub folders and files
			for (FolderModel f: folders) {
				logger.info("_deleteFolder - processing folder" + f.getName());
				_deleteFolder(f);
			}
		}
		
		// if this folder doesn't contain any sub folder(s), start deleting file
		List<FileModel> files = fileRepository.findByBelFolderId(folder.getId());
			
		// if this folder't contain any file, it will only delete folder itself
		// otherwise delete file(s) through a loop
		if(files.size() != 0) {
			for(FileModel f: files) {
				logger.info("_deleteFolder - processing file " + f.getName());
				fileRepository.delete(f);
			}
		}
			
		// delete the folder at current level
		folderRepository.delete(folder);
	}
	
}