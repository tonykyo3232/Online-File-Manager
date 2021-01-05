package ofm;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends MongoRepository < FileModel, Long > {
    List<FileModel> findByBelFolderId(long belFolderId);
}