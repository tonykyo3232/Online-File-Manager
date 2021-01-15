import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddFolder() {
  const [name, setName] = useState("");
  let history = useHistory();
  
  const onSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/folder", {
        name,
        parentId: 0
      })
      .then(() => history.push("/"));
  };

  return (
    <form onSubmit={onSubmit}>
      folderName:{" "}
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button>Create Folder</button>
    </form>
  );

}

export default AddFolder;
