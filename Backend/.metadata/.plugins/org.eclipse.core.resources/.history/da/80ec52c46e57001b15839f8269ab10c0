package ofm;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepository extends MongoRepository < FolderModel, Integer > {	
    // return a list of folders that has same parentId
	List<FolderModel> findByParentId(Integer parentId);
	
	// return a list of folders that has same name
    List<FolderModel> findByName(String name);
}