import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button';
import axios from "axios";

function SpecFolder() {

    let { id } = useParams();
    const [entries, setEntries] = useState([]);
    const [entry_folder, setEntry_folder] = useState([]);
    const [entry_folder_parent, setEntry_parent] = useState([]);

    useEffect(() => {
      async function fetchData() {
        // get specofic level of folders and files
        let res = await axios.get(`http://localhost:8080/folder/${id}`);
        setEntries(res.data);

        // get a single folder of current folder 
        let res2 = await axios.get(`http://localhost:8080/folder/${id}/single_folder`);
        setEntry_folder(res2.data);

        // get a parent folder of current folder 
        let res3 = await axios.get(`http://localhost:8080/folder/${id}/parent`);
        setEntry_parent(res3.data);
      }
      fetchData();
    }, [id]);

    function getVal(){
       let currFolderId = entry_folder.map((val)=>{  
        return val.id;
      });
      return "/SpecFolder/" + currFolderId;
    }
    
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          {entry_folder_parent.map(entry =>{
            if(entry.id === -1){
              return <Breadcrumb.Item href="/topLv">Previous folder</Breadcrumb.Item>;
            }
            else{
              return <Breadcrumb.Item href={`/SpecFolder/${entry.id}`}>Previous folder</Breadcrumb.Item>;
            }       
          })}
        </Breadcrumb>
        <h2>Online File Manager</h2>
        <p>
          {entry_folder.map((entry) => (
              <Link to={`/addSpecLv/${entry.id}`}><Button variant="outline-primary">Create Folder</Button></Link>
          ))}
        </p>
        <table border="1">
          <thead>
            {entries.map((entry) => {
              if(entry.isFolder !== 0 && entry.id != id){
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
                        to={getVal()}
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