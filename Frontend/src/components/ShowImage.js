import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import { FiDownload } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowImage() {
    let { id } = useParams();
    const [image, setImage] = useState([]);
    const [photoObj, setPhoto] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // get specofic image information
          let res = await axios.get(`http://localhost:8080/file/${id}/view`);
          setImage(res.data);

          // get specofic photo json object
          let res2 = await axios.get(`http://localhost:8080/file/${id}/image`);
          setPhoto(res2.data);
        }
        fetchData();
      }, [id]);

      function f(){
        setTimeout(function(){
          document.getElementById("photo").src = "data:image/png;base64," + image;
          var img = document.getElementById("photo");
          img.width = 800;
          img.height = 750;
        }, 500)
      }

      function f2(){
        console.log(photoObj)
        return "data:image/png;base64," + image;
      }
    return(
        <> 
          <div style = {{margin: '30px'}}>
            {/*Download image*/}
            {photoObj.map((entry) => {
              return <Button href={f2()} download={entry.name}>Download <FiDownload/></Button>
            })}
            {/*Show image*/}
            <Image id="photo" src="" />
            {f()}
          </div>
        </>
    );
}

export default ShowImage;