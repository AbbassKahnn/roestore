import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { GetAPIService, PutAPIService } from "../services";

const Orders = () => {
    // Orders list
    const [cartItems, setCartItems] = useState([]);
    // get user id and userName for local storage
const {user_id, user_name} = JSON.parse(localStorage.getItem('user'));
   
    useEffect(() => {
        //API call to get all the Orders for Admin
        if(user_name === 'admin'){
        GetAPIService(`http://localhost:5002/shopping_orders`).then(cart => {
            setCartItems(cart?.data?.data)
        }).catch(err => {
            console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)
        })
        }else{
            //API CALL to get all orders for user
            GetAPIService(`http://localhost:5002/shopping_orders/${user_id}`).then(cart => {
                setCartItems(cart?.data?.data)
            }).catch(err => {
                console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)
            })
        }
    }, []);
    // API CALL  function is used for updating list of Orders from admin side. 
    const updateOrder = (data) => {
        PutAPIService(`http://localhost:5002/shopping_orders`, data).then(cart => {
           const updatedItem = cartItems.map(ele => {
                if(ele.shopping_orders_id===data.shopping_orders_id){
                    ele.shopping_status = data.shopping_status
                }
                return ele;
            });
            setCartItems(updatedItem)
    }).catch(err => {
            console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)
        })
    }



    return (
        <>
            <div class="container">
           
                <h1>My Orders</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            
                            {user_name === 'admin' ? <>
                            <th>Product</th>
                            <th>User</th>
                            <th>Address</th>
                            <th>Brand/Model/Sytle</th>
                            <th>Price</th>
                            <th>Order Quantity</th>
                            <th>Quantity</th>
                            <th>Action</th>
                            </> : <>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Material</th>
                            <th>Style</th>
                            <th>Price</th>
                            <th>Supply Ability</th>
                            <th>Status</th>
                            </>

                            }
                        </tr>
                    </thead>
                    <tbody>
                       { cartItems?.map(ele=>{
                           return  <tr key={ele.product_id}>
                           
                           {user_name === 'admin' ? <>
                           <td className="with-50px">
                               <img src={ele.image} alt='' className="with-50px" />
                               <p>{ele.name} ({ele.title})</p></td>
                               <td>{ele.user.first_name} {ele.user.last_name}</td>
                               <td>{ele.user.address}</td>
                               <td>{ele.brand_name}/{ele.style}/({ele.model_number})</td>
                               <td>{ele.price}</td>
                               <td>{ele.orderQuantity}</td>
                           <td>{ele.quantity}</td>
                           <td>
                               <select className="form-control"
                               name="shopping_status" value={ele.shopping_status} onChange={(e)=> {
                                   const dt = {
                                    shopping_status: e.target.value,
                                    quantity: parseInt(ele.quantity) -  parseInt(ele.orderQuantity),
                                    shopping_orders_id: ele.shopping_orders_id
                                   }
                                   updateOrder(dt)
                               }}>
                                   <option value={0} >Pending</option>
                                   <option value={1} >Inprogress</option>
                                   <option value={2} >Delivered</option>
                               </select>
                           </td>
                           </>: <>
                           <td className="with-50px"><img src={ele.image} alt='' className="with-50px" /></td>
                           <td>{ele.name} ({ele.title})</td>
                           <td>{ele.brand_name} ({ele.model_number})</td>
                           <td>{ele.material}</td>
                           <td>{ele.style}</td>
                           <td>{ele.price}</td>
                           <td>{ele.supply_ability}</td>
                           <td>{ele.shopping_status == 0 ? 'Pending' : ele.shopping_status == 1 ? 'Progress' : 'Delivered'}</td>
                           </>}
                       </tr>
                       })
                       
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );

}

export default Orders;