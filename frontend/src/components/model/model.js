import './style.css'
import {useState, useEffect } from 'react';
import { PostAPIService } from '../../services';

const OrderModel = ({
    action, 
    active, 
    product, 
    title, 
    buttonTxt, 
    setMessage,
     setMsgHeading
    }) => {
const [total, setTotal] = useState(0);   
const [quantity, setQuantity] = useState(product?.quantity); 

useEffect(() => {
    setTotal(parseInt(product?.price * parseInt(quantity)))
}, [product?.price, quantity]);


const makeOrder = () => {
    
    const orderDetail = {
      product_id: product.product_id,
      user_id: JSON.parse(localStorage.getItem('user')).user_id,
      quantity: quantity  
    }

    if(parseInt(product.quantity) >= parseInt(orderDetail.quantity)){

    PostAPIService('http://localhost:5002/shopping_orders', orderDetail).then(res => {
        setMsgHeading('Success')
        setMessage('Your order confirmed.')
    }).catch(err => {
        setMsgHeading('Oops!')
        setMessage('Your order operation failed! please try again');
        });
} else {
    setMsgHeading('Oops!')
    setMessage('Your quantity is greater the our quantity! please try again');
    
}
action(!active);
};


return (<>

        <div class="modal-container">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {title}
                        </h5>
                        <button type="button"
                        onClick={()=>action(!active)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="w-25">
                                        <img src={product?.image} class="img-fluid img-thumbnail" alt="" />
                                    </td>
                                    <td>{product?.name}</td>
                                    <td>{product?.price}$</td>
                                    <td class="qty">
                                        <input 
                                        type="number" 
                                        min={1}
                                        max={product?.quantity}
                                        className="form-control" 
                                        id="input1" 
                                        value={quantity} 
                                        onChange={(e)=>setQuantity(e.target.value)} />
                                        </td>
                                    <td>{total? total+'$':'' }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer border-top-0 d-flex justify-content-between">
                        <button type="button" className='btn btn-danger'  onClick={()=>action(!active)} >Close</button>
                        <button type="button" class="btn btn-success" onClick={makeOrder}>{buttonTxt}</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default OrderModel;