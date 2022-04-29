import { useEffect, useState } from "react";
import { Container,  Row } from "react-bootstrap";
import ShadowCard from "../components/cards/shadowCard";
import {useParams} from 'react-router-dom';
import { GetAPIService } from "../services";
import AlertModal from "../components/model/alert";

const Product = () => {
    // catagory id get from params
    const {id} = useParams();
    //product list
    const [products, setProducts] = useState([]);
    //success or failure message
    const [message, setMessage] = useState();
    //message heading
    const [msgHeading, setMsgHeading]= useState();
    //search text get from URL splitted form ?
    const searchText = window.location.href?.split('?')[1]

    //API CALL for searching to get all the products
    useEffect(() => {
        if(searchText){
            GetAPIService(`http://localhost:5001/product/slug/${searchText}`).then(res=>{
                setProducts(res?.data?.data);
                }).catch(err=>{
                // console.log("🚀 ~ file: product.js ~ line 14 ~ GetAPIService ~ err", err)
                    
                }) 
        }else{
            //API CALL To get products by catagory id
            GetAPIService(`http://localhost:5001/product/catagory/${id}`).then(res=>{
                setProducts(res?.data?.data);
                }).catch(err=>{
                // console.log("🚀 ~ file: product.js ~ line 14 ~ GetAPIService ~ err", err)
                    
                })
        }
       
       
    }, []);
    // closes success or failure modal
    const closeAlert = () =>{
        setMessage('');
        setMsgHeading('');
    }

    return (<>
        <Container fluid className="bg-light">
            <div className="pb-3 mb-3 banner-products-image">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <h1></h1>
                </div>
            </div>
        </Container>
        <Container>
            <div className="shadow p-2 mb-5 bg-gray rounded ">
                <div className="pb-3">
                {message && <AlertModal 
                    action={closeAlert} 
                     message={message} 
                    msgHeading={msgHeading} 
                    />}
                    <Row>
                        {products.map(ele=>{
                            return <ShadowCard 
                            setMsgHeading={setMsgHeading}
                            setMessage={setMessage}
                            closeAlert={closeAlert}
                            color={ele.color}
                            created_at={ele.created_at}
                            description={ele.description}
                            image={ele.image}
                            name={ele.name}
                            price={ele.price}
                            product_catagories_id={ele.product_catagories_id}
                            product_id={ele.product_id}
                            quantity={ele.quantity}
                            title={ele.title}
                            />
                        })}
                    </Row>
                </div>
            </div>
        </Container>

    </>
    );
}

export default Product;
