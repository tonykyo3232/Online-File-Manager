import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import 'bootstrap/dist/css/bootstrap.min.css';

import img_folder from "./img/folder.jpg";
import img_file from "./img/file.png";

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
        {entries.map((entry) => {
        if(entry.isFolder !== 0 && entry.id != id){
          return(
            <Card style={{ width: '10rem' }}>
              <Card.Img variant="top" src={img_folder} />
              <Card.Body>
                <Card.Title>{entry.name}</Card.Title>
                <Link to = {`/SpecFolder/${entry.id}`}><Button variant="primary">go</Button></Link>
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
                to="/topLv"
              >
                <Button variant="outline-danger">Delete</Button>
              </Link>
              </Card.Body>
            </Card>
          );
        }
      })}
      <br/>
      {entries.map((entry) => {
        if(entry.isFolder !== 1){
          return(
            <CardGroup style={{ width: '10rem' }}>
              <Card >
                <Card.Img variant="top" src={img_file} />
                <Card.Body>
                  <Card.Title>{entry.name}</Card.Title>
                  <Link
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8080/file/${entry.id}`)
                        .then(() => {
                          let newEntries = entries.filter(
                            (e) => e.id !== entry.id
                          );
                          setEntries(newEntries);
                        });
                    }}
                    to={`/SpecFolder/${entry.id}`}
                  >
                    <Button variant="outline-danger">Delete</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          )
        }
      })}
      </>
    );
  }

export default SpecFolder;