package ofm.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ofm.model.PhotoModel;

@Repository
public interface PhotoRepository extends MongoRepository < PhotoModel, Integer > {
	
	// return a list of files that has same belFolderId
	List<PhotoModel> findByParentId(Integer parentId);
    
	// return a list of files that has same file name
	List<PhotoModel> findByName(String name);
}