package ofm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/file")
public class FileController {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	public FileController(FileRepository entry_fileRepository, FolderRepository entry_folderRepository) {
		this.fileRepository = entry_fileRepository;
		this.folderRepository = entry_folderRepository;
	}
	
	// dummy method for testing the connection
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String greetings() {
		logger.info("Greetings!");
		return "Hello! from FileController!";
	}
	
	// Top level files
	@GetMapping("/all")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public List<FileModel> getAllFiles() {
		logger.info("Getting all files.");
		return fileRepository.findAll();
	}
	
	// Top level files
	@GetMapping
	@ResponseStatus(HttpStatus.ACCEPTED)
	public List<FileModel> getTopLvFiles() {
		logger.info("Getting top-level files.");
		return fileRepository.findByBelFolderId(0);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public FileModel getFile(@PathVariable long id) {
		logger.info("Getting file with ID: {}.", id);
		Optional<FileModel> fileModel = fileRepository.findById(id);
		return fileModel.get();
	}
	
	@GetMapping("/{id}/parent")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public FolderModel getBelongFolder(@PathVariable long id) {
		logger.info("Getting this file's belong folders with ID: {}.", id);
		Optional<FileModel> file = fileRepository.findById(id);
		System.out.println("Parentid: " + file.get().getBelFolderId());
		Optional<FolderModel> belongFolder = folderRepository.findById(file.get().getBelFolderId());
		return belongFolder.get();
	}
	
	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public FileModel UploadFile(@RequestBody FileModel file) {
		logger.info("Upload files.");
		return fileRepository.save(file);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFile(@PathVariable Long id) {
		FileModel model = fileRepository.findById(id).get();
		logger.info("Deleting files.");
		fileRepository.delete(model);
	}
}