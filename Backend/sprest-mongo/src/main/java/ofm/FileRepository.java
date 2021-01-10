package ofm;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends MongoRepository < FileModel, Integer > {
	// return a list of files that has same belFolderId
	List<FileModel> findByBelFolderId(Integer belFolderId);
    
	// return a list of files that has same file name
	List<FileModel> findByName(String name);
}