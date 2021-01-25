import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ShowImage() {
    let { id} = useParams();
    const [image, setImage] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // get specofic image information
          let res = await axios.get(`http://localhost:8080/file/${id}/view`);
          setImage(res.data);
        }
        fetchData();
      }, [id]);

    return(
        <>
            <p>{image}</p>
        </>
    );
}

export default ShowImage;