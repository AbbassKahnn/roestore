import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { PostAPIService } from "../../services";

const ShadowCard = ({
    color,
    created_at,
    description,
    image,
    name,
    price,
    product_catagories_id,
    product_id,
    quantity,
    title,
    setMsgHeading,
    setMessage,
    closeAlert
}) => {
    
    const addToCart = () => {
        const orderDetail = {
            product_id: product_id,
            user_id: JSON.parse(localStorage.getItem('user')).user_id,
          }
          //API CALL for adding product to shopping cart
          PostAPIService('http://localhost:5002/shopping_cart', orderDetail).then(res => {
            setMsgHeading('Success')
            setMessage('Your order confirmed.')
        }).catch(err => {
            setMsgHeading('Oops!')
            setMessage('Your order operation failed! please try again');
            });
          
    }
   
    return (<>
    
        <Col>
        
            <Card style={{ width: '25rem' }}>
            <Link to={`/single/${product_id}`} >
                <Card.Img variant="top" src={image} style={{ height: '300px' }} />
                </Link>
                <Card.Body>
                    <Card.Title>{name} <small>{title}</small></Card.Title>
                    {JSON.parse(localStorage.getItem('user')) && <div className="col text-center pb-3">
                        <button className="btn-primary" onClick={()=> addToCart()}>ADD TO CART</button>
                    </div>}
                    <Card.Footer>
                        <small className="text-muted"><strong>Price ${price} </strong>- Quantity {quantity}</small>
                    </Card.Footer>
                </Card.Body>
            </Card>
            
        </Col>
    </>
    );
}

export default ShadowCard;
