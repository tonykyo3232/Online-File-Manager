import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import 'bootstrap/dist/css/bootstrap.min.css';

function Folder() {
  
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("http://localhost:8080/folder");
      setEntries(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Online File Manager</h2>
      <p>
        <Link to="/add">
          <Button variant="outline-primary">Create Folder</Button>
        </Link>
      </p>
      
      {entries.map((entry) => {
        if(entry.isFolder !== 0){
          return(
            <Card style={{ width: '10rem' }}>
              <Card.Img variant="top" src="folder.jpg" />
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
                <Card.Img variant="top" src="file.png" />
                <Card.Body>
                  <Card.Title>{entry.name}</Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
          )
        }
      })}
    </>
  );
}

export default Folder;
