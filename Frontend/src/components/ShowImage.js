import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowImage() {
    let { id } = useParams();
    const [image, setImage] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // get specofic image information
          let res = await axios.get(`http://localhost:8080/file/${id}/view`);
          setImage(res.data);
        }
        fetchData();
      }, [id]);

      function f(){
        setTimeout(function(){
          document.getElementById("photo").src = "data:image/png;base64," + image;
        }, 500)
      }

    return(
        <> 
            <Image id="photo" src="" />
            {f()}
        </>
    );
}

export default ShowImage;