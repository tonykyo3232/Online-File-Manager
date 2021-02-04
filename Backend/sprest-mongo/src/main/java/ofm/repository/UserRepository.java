package ofm.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ofm.model.UserModel;

@Repository
public interface UserRepository extends MongoRepository < UserModel, String > {
	
}