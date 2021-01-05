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
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFolder(@PathVariable Long id) {
		FolderModel model = folderRepository.findById(id).get();
		logger.info("Deleting folders.");
		folderRepository.delete(model);
	} 
}