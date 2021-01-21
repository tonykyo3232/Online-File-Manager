import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
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

  // create folder
  const [name, setName] = useState("");
  const onSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/folder", {
        name,
        parentId: 0
      })
      handleClose();
      window.location.reload(); 
  };

  // model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      </Breadcrumb>
      <h2 style = {{margin: '10px'}}>Online File Manager</h2>
      <p style = {{margin: '10px'}}>
          <Button variant="outline-primary" onClick={handleShow}>Create Folder</Button>
      </p>
      <div className = "row" style = {{margin: '10px'}}>
      {entries.map((entry) => {
        if(entry.isFolder !== 0){
          return(
            <div class="column">
            <Card style={{ width: '13rem'}}>
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
            </div>
          );
        }
      })}
      </div>
      <br/>
      <div className = "row" style = {{margin: '10px'}}>
      {entries.map((entry) => {
        if(entry.isFolder !== 1){
          return(
            <div class = "column">
            <CardGroup style={{ width: '10rem' }}>
              <Card >
                <Card.Img variant="top" src="file.png" />
                <Card.Body>
                  <Card.Title>{entry.name}</Card.Title>
                  <Button variant="primary">Check</Button>
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
                  to="/topLv"
                >
                  <Button variant="outline-danger">Delete</Button>
                </Link>
                </Card.Body>
              </Card>
            </CardGroup>
            </div>
          )
        }
      })}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title >Enter folder name:</Modal.Title>
        </Modal.Header>
        <Form style = {{margin: '10px'}}> 
          <Form.Group controlId="formFolderName">
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
            type="name" 
            placeholder="folder name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Folder;
