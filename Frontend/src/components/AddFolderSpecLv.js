import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function AddFolderSpecLv() {
  const [name, setName] = useState("");
  let { id } = useParams();
  let history = useHistory();
  const onSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/folder", {
        name,
        parentId: id
      })
      .then(() => history.push(`/SpecFolder/${id}`));
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

export default AddFolderSpecLv;
