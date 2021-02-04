package ofm.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ofm.model.IdModel;

@Repository
public interface IdRepository extends MongoRepository < IdModel, Integer > {	
	// return Id current value
	Integer findByValue(Integer value);
}