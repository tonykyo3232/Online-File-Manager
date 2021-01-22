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
      });
    handleClose_folder();
    window.location.reload(); 
  };

  // upload file
  const onSubmit_file = () => {
    // create form-data format and append values
    var FormData = require('form-data');
    var fileFormData = new FormData();
    fileFormData.append('file', upload_file);
    fileFormData.append('folderId', 0);

    // post request
    axios({
      method: 'post',
      url: 'http://localhost:8080/file',
      data: fileFormData,
      headers: {'Content-Type': 'multipart/form-data'}
      });

    // close modal and refresh the page
    handleClose_file();
    window.location.reload(); 
  };

  // model for folder
  const [show, setShow] = useState(false);
  const handleClose_folder = () => setShow(false);
  const handleShow_folder = () => setShow(true);

  // model for file
  const [show_file, setShow_file] = useState(false);
  const handleClose_file = () => setShow_file(false);
  const handleShow_file = () => setShow_file(true);

  let upload_file;
  // read the uploading file's content
  const handleFileChosen = (file) => {
    upload_file = file;
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      </Breadcrumb>
      <h2 style = {{margin: '10px'}}>Online File Manager</h2>
      <p style = {{margin: '10px'}}>
          <Button variant="outline-primary" onClick={handleShow_folder}>Create Folder</Button>
      </p>
      <p style = {{margin: '10px'}}>
          <Button variant="outline-primary" onClick={handleShow_file}>Upload File</Button>
      </p>
      <div className = "row" style = {{margin: '10px'}}>
      {entries.map((entry) => {
        if(entry.isFolder !== 0){
          return(
            <div className="column">
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
            <div className = "column">
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

      {/* modal for creating the folders */}
      <Modal
        show={show}
        onHide={handleClose_folder}
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
          <Button variant="secondary" onClick={handleClose_folder}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* modal for uploading files */}
      <Modal
        show={show_file}
        onHide={handleClose_file}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title >Select the file to upload:</Modal.Title>
        </Modal.Header>
        <Form style = {{margin: '10px'}}>
          <Form.Group>
            <input
              type='file'
              id='FormControlFile'
              className='input-file'
              enctype="multipart/form-data"
              onChange={e => handleFileChosen(e.target.files[0])}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose_file}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit_file}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Folder;
