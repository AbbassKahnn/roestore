import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AlertModal from "../components/model/alert";
import OrderModel from "../components/model/model";
import { GetAPIService, DeleteAPIService } from "../services";

const Cart = () => {
    // Shopping cart list
    const [cartItems, setCartItems] = useState([]);
    // single product object for order from cart.
    const [product, setProduct] = useState();
    // error or success message.
    const [message, setMessage] = useState();
    // error or success message heading.
    const [msgHeading, setMsgHeading]= useState();

const {user_id} = JSON.parse(localStorage.getItem('user'));
   // API call to Get all my shopping cart list
    useEffect(() => {
        GetAPIService(`http://localhost:5002/shopping_cart/${user_id}`).then(cart => {
            setCartItems(cart?.data?.data)
        }).catch(err => {
            console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)
        })
    }, []);

    // open or close order modal.
    const [active, setActive] = useState(false);
    const toggleModal = (value) => {
        setActive(value);
    }

    // close error or success modal.
    const closeAlert = () =>{
        setMessage('');
        setMsgHeading('');
    }
    
    // This function take product from shopping cart list and pass to oder modal. 
    const makeOrder = (product) =>{
        setProduct(product)
        toggleModal(!active);
    }

    // Remove deleted cart product from list by cart id or product id.
    const itemRemoveFromList = (id) => {
        const list=  cartItems.filter((ele) => {
            if(ele.product_id === id || ele.shopping_cart_id === id ){

            }else{
                return ele;
            }
        });
        setCartItems(list);
    } 

    useEffect(() => {
        if(msgHeading === 'Success'){
            itemRemoveFromList(product.product_id)
        }
    }, [msgHeading]);

    /**
     * API call for delete my shopping cart by shopping cart id.
     * @param id 
     */
    const deleteCart = (id) => {
        DeleteAPIService(`http://localhost:5002/shopping_cart/${id}`).then(res=>{
        itemRemoveFromList(id)
        }).catch(err=>{
        console.log("🚀 ~ file: cart.js ~ line 51 ~ DeleteAPIService ~ err", err)
            
        })
    }

   

    return (
        <>
        {active && <OrderModel 
            action={toggleModal}  
            active={active} 
            product={product}
            title='Your Order Cart'
            buttonTxt='Order'
            setMessage={setMessage}
            setMsgHeading={setMsgHeading}
            /> 
            }
            <div class="container">
           
                <h1>My Shopping Cart</h1>
        {message && <AlertModal 
        action={closeAlert} 
        message={message} 
        msgHeading={msgHeading} 
        />}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Material</th>
                            <th>Style</th>
                            <th>Price</th>
                            <th>Supply Ability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       { cartItems?.map(ele=>{
                           return  <tr key={ele.product_id}>
                           <td className="with-50px"><img src={ele.image} alt='' className="with-50px" /></td>
                           <td>{ele.name} ({ele.title})</td>
                           <td>{ele.brand_name} ({ele.model_number})</td>
                           <td>{ele.material}</td>
                           <td>{ele.style}</td>
                           <td>{ele.price}</td>
                           <td>{ele.supply_ability}</td>
                           <td>
                               <button className="btn btn-primary" onClick={() => makeOrder(ele)}>Order</button>
                               <button className="btn btn-danger" onClick={() => deleteCart(ele.shopping_cart_id)}>Delete</button>
                           </td>
                       </tr>
                       })
                       
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );

}

export default Cart;