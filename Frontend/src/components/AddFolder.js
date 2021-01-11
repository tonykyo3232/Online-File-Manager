import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddFolder() {
  const [folderName, setName] = useState("");
  let history = useHistory();
  const onSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/folders", {
        folderName,
      })
      .then(() => history.push("/"));
  };
  return (
    <form onSubmit={onSubmit}>
      folderName:{" "}
      <input
        type="text"
        name="name"
        value={folderName}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button>Create Folder</button>
    </form>
  );
}

export default AddFolder;
