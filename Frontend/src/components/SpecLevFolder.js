import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function SpecFolder() {

  let { id } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:8080/folder/${id}`);
      setEntries(res.data);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <h2>Online File Manager</h2>
      <p>
        <Link to="/add">Create Folder</Link>
      </p>
      <table border="1">
        <thead>
          {entries.map((entry) => {
            if(entry.isFolder !== 0){
              return(
                <tr key={entry.id}>
                <td> <Link to = {`/SpecFolder/${entry.id}`}>\{entry.name} </Link> </td>
                <td>               
                  <Link
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8080/folder/${entry.id}`)
                        .then(() => {
                          let newEntries = entries.filter(
                            (e) => e.id !== entry.id
                          );
                          setEntries(newEntries);
                        });
                    }}
                    to="/"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
              );
            }
          })}
        </thead>
      </table>
      <br/>
      <table border="1">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            if(entry.isFolder !== 1){
              return(
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.fileVersion}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </>
  );
}

export default SpecFolder;
