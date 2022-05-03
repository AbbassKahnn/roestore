import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CatagoryCard = ({id, name, image}) => {
    return (<>

        <Col>
        <Link to={`/product/${id}`}>
            <Card style={{ width: '25rem', height:"100%" }}  >
                <Card.Img variant="top" src={image} style={{ height:"100%" }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
            </Link>
        </Col>
        
    </>
    );
}

export default CatagoryCard;
