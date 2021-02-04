package ofm.model;

import java.util.Date;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Photos")
public class PhotoModel {
	
    @Id
    private Integer id;
    
    private Binary image;
    private String name;
    private Integer parentId;
    private Date creationDate = new Date();
    private Integer isFolder;
    private Integer fileVersion;
    
    public PhotoModel() {
    	// fixed value
    	this.isFolder = 0;;
    }
    
    /*
     * Getter and Setter methods
     */
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
	public Binary getImage() {
		return image;
	}

	public void setImage(Binary image) {
		this.image = image;
	}
    
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getParentId() {
		return parentId;
	}
	
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	
	public Date getCreationDate() {
		return creationDate;
	}
	
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	public Integer getIsFolder() {
		return isFolder;
	}
	
	public void setIsFolder(Integer isFolder) {
		this.isFolder = isFolder;
	}
	
	public Integer getFileVersion() {
		return fileVersion;
	}
	
	public void setFileVersion(Integer fileVersion) {
		this.fileVersion = fileVersion;
	}
}