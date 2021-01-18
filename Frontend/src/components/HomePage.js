import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel'

function HomePage() {
    return(
        <>
            <Jumbotron>
                <h1>Online File Manager</h1>
                <p>A online service that manage your files online.</p>
                <p>
                    <Link to ="/topLv">
                        <Button variant="primary">Manage your files</Button>
                    </Link>
                </p>
            </Jumbotron>

            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block w-100"
                    src="image1.png"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <p>Upload your folders and files</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    src="image2.png"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <p>Your files will be protected</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="image3.png"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <p>Access your file from any device</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
      </>
    );
}

export default HomePage;