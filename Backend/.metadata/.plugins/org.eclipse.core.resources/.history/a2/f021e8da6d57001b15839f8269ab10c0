package ofm;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@EntityScan
@Document(collection = "Files")
public class FileModel {
    @Id
    private Integer id;
    private String name;
    private Integer parentId;
    private Date creationDate = new Date();
    private Integer isFolder;
    private Integer fileVersion;
    
    public FileModel() {
    	// fixed value
    	this.isFolder = 0;;
    }
    
    public long getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

	public Integer getFileVersion() {
		return fileVersion;
	}

	public void setFileVersion(int fileVersion) {
		this.fileVersion = fileVersion;
	}
	
	public Integer getIsFolder() {
		return isFolder;
	}

	public void setIsFolder(Integer isFolder) {
		this.isFolder = isFolder;
	} 
	
	@Override
    public String toString() { 
        return String.format("\nid: " + this.id + "\nname: " + this.name + "\nparentId: " + this.parentId 
        		+ "\ncreationDate: " + this.creationDate + "\nFile Version: " + this.fileVersion); 
    }
}