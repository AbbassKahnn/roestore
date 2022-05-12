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

    if(parseInt(product.quantity) >= parseInt(orderDetail.quantity) && orderDetail.quantity > 0){

    PostAPIService('http://localhost:5002/shopping_orders', orderDetail).then(res => {
        setMsgHeading('Success')
        setMessage('Your order confirmed.')
        product.quantity = product.quantity - quantity;

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

        <div className="modal-container">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header border-bottom-0">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {title}
                        </h5>
                        <button type="button"
                        onClick={()=>action(!active)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-image">
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
                                    <td className="w-25">
                                        <img src={product?.image} className="img-fluid img-thumbnail" alt="" />
                                    </td>
                                    <td>{product?.name}</td>
                                    <td>{product?.price}$</td>
                                    <td className="qty">
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
                    <div className="modal-footer border-top-0 d-flex justify-content-between">
                        <button type="button" className='btn btn-danger'  onClick={()=>action(!active)} >Close</button>
                        <button type="button" className="btn btn-success" onClick={makeOrder}>{buttonTxt}</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default OrderModel;