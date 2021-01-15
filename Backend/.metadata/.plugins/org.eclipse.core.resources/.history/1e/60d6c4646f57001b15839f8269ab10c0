package ofm;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@EntityScan
@Document(collection = "Folders")
public class FolderModel {
	
    @Id
    private Integer id;
    private String fileName;
    private Integer parentId;
    private Date creationDate = new Date();
    private Integer isFolder;
    private Integer fileVersion;
    
    public FolderModel() {
    	//default values
    	this.fileVersion = 0;
    	this.isFolder = 1;
    }
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return fileName;
    }

    public void setName(String name) {
        this.fileName = name;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer par_folder_id) {
        this.parentId = par_folder_id;
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
	
    @Override
    public String toString() { 
        return String.format("\nid: " + this.id + "\nname: " + this.fileName + "\nparentId: " + this.parentId 
        		+ "\ncreationDate: " + this.creationDate); 
    }
}