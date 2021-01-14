package ofm;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin
@RestController
@RequestMapping("/id")
public class IdController {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private IdRepository idRepository;
	
	public IdController(IdRepository entry_idRepository) {
		this.idRepository = entry_idRepository;
	}
	
	@PatchMapping("/init")
	@ResponseStatus(HttpStatus.OK)
	public IdModel init(@RequestBody IdModel id) {
		logger.info("init Id...");
		idRepository.save(id);
		return id;
	}
}
