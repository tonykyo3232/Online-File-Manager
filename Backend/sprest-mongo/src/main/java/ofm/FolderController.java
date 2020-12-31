package ofm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/folder")
public class FolderController {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final FolderRepository folderRepository;

	public FolderController(FolderRepository userRepository) {
		this.folderRepository = userRepository;
	}

	// dummy method for testing the connection
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String greetings() {
		logger.info("Greetings!");
		return "Hello!";
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<FolderModel> getAllUsers() {
		logger.info("Getting all folders.");
		return folderRepository.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public FolderModel getFolder(@PathVariable long id) {
		logger.info("Getting folders with ID: {}.", id);
		Optional<FolderModel> folderModel = folderRepository.findById(id);
		return folderModel.get();
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public FolderModel addFolder(@RequestBody FolderModel folderModel) {
		logger.info("Saving folders.");
		return folderRepository.save(folderModel);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void deleteFolder(@PathVariable Long id) {
		FolderModel model = folderRepository.findById(id).get();
		logger.info("Deleting folders.");
		folderRepository.delete(model);
	}
}