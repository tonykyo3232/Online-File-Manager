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
    private Integer belFolderId;
    private Date creationDate = new Date();

    private int fileVersion;
    
    public long getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBelFolderId() {
        return belFolderId;
    }

    public void setBelFolderId(Integer bel_folder_id) {
        this.belFolderId = bel_folder_id;
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

	public int getFileVersion() {
		return fileVersion;
	}

	public void setFileVersion(int fileVersion) {
		this.fileVersion = fileVersion;
	}
	
	@Override
    public String toString() { 
        return String.format("\nid: " + this.id + "\nname: " + this.name + "\nbelFolderId: " + this.belFolderId 
        		+ "\ncreationDate: " + this.creationDate + "\nFile Version: " + this.fileVersion); 
    } 
}