import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertModal from "../components/model/alert";
import OrderModel from "../components/model/model";
import { GetAPIService, PostAPIService } from "../services";

const SingleProduct = () => {
    const {id} = useParams();
    const [message, setMessage] = useState();
    const [msgHeading, setMsgHeading]= useState();

    const [product, setProduct] = useState({});
    useEffect(() => {
        // API CALL to get single product by id
        GetAPIService(`http://localhost:5001/product/${id}`).then(res=>{
        setProduct(res?.data?.data[0]);
        }).catch(err=>{
        console.log("🚀 ~ file: product.js ~ line 14 ~ GetAPIService ~ err", err)
        })
    }, []);
    // open or close singleProduct modal.
    const [active, setActive] = useState(false);
    const toggleModal = (value) => {
        setActive(value);
    }
    // closes success or failure modal
    const closeAlert = () =>{
        setMessage('');
        setMsgHeading('');
    }
// this function uses for adding single product to the cart
    const addToCart = () => {
        const orderDetail = {
            product_id: product.product_id,
            user_id: JSON.parse(localStorage.getItem('user')).user_id,
          }
          // API CALL to add single product into the shopping cart
          PostAPIService('http://localhost:5002/shopping_cart', orderDetail).then(res => {
            setMsgHeading('Success')
            setMessage('Your order confirmed.')
        }).catch(err => {
            setMsgHeading('Oops!')
            setMessage('Your order operation failed! please try again');
            });
          
    }

    return (
        <>
        {message && <AlertModal 
        action={closeAlert} 
        message={message} 
        msgHeading={msgHeading} 
        />}

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
            <div className="App">

                <section className="section-content padding-y bg">
                    <div className="container pt-5">

                        <article className="card">
                            <div className="card-body">
                                <div className="row">
                                    <aside className="col-md-6">
                                        <article className="gallery-wrap">
                                            <div className="card img-big-wrap">
                                                
                                        <img src={product?.image} alt='' style={{height: '500px'}} />
                                                
                                            </div>
                                            {/* <div className="thumbs-wrap">
                                                 <img src={product?.cat_image} alt='' />
                                            </div> */}
                                        </article>
                                    </aside>
                                    <main className="col-md-6">
                                        <article>
                                            <a href="#" className="text-primary btn-link">{product?.cat_name}</a>
                                            <h3 className="title">{product?.cat_name}</h3>
                                            <div>
                                                
                                                <a href="#" className="btn-link text-muted"> <i className="fa fa-book-open"></i> {product?.title} </a>
                                            </div>

                                            <hr />

                                            <div className="mb-3">
                                                <h6>Description</h6>
                                                <div>{product?.description}</div>
                                            </div>

                                            <div className="form-group">
                                                <label className="text-muted">price</label>
                                            </div>

                                            <div className="mb-3">
                                                <var className="price h4">${product?.price}</var> <br />
                                                <span className="monthly">Quantity: {product?.quantity} </span>
                                            </div>

                                            {product?.quantity && JSON.parse(localStorage.getItem('user')) && <div className="mb-4">
                                                <button className="btn btn-primary mr-1" onClick={() => {
                                                    toggleModal(!active)}
                                                    }>Buy now</button>
                                                <button className="btn btn-light" onClick={()=>addToCart()}>Add to card</button>
                                            </div>}

                                        </article>
                                    </main>
                                </div>
                            </div>
                        </article>
                        <article className="card mt-5">
                            <div className="card-body">
                                <div className="row">
                                    <aside className="col-md-6">
                                        <h5>Parameters</h5>
                                        <dl className="row">
                                            <dt className="col-sm-3">Style:</dt>
                                            <dd className="col-sm-9">{product?.product_style}</dd>

                                            <dt className="col-sm-3">Model:</dt>
                                            <dd className="col-sm-9">{product?.model_number}</dd>

                                            <dt className="col-sm-3">Material:</dt>
                                            <dd className="col-sm-9">{product?.material}</dd>

                                            <dt className="col-sm-3">Color:</dt>
                                            <dd className="col-sm-9">{product?.color}</dd>
                                        </dl>
                                    </aside>
                                    <aside className="col-md-6">
                                        <h5>Parameters</h5>
                                        <dl className="row">
                                        <dt className="col-sm-3">Brand name:</dt>
                                            <dd className="col-sm-9">{product?.brand_name}</dd>

                                            <dt className="col-sm-3">Place of origin:</dt>
                                            <dd className="col-sm-9">{product?.place_of_origin}</dd>

                                            <dt className="col-sm-3">Supply Ability:</dt>
                                            <dd className="col-sm-9">{product?.supple_ability}</dd>

                                        </dl>
                                    </aside>
                                </div>
                                <hr />
                                <p>
                               {product?.cat_description}
                                </p>
                            </div>
                        </article>
                    </div>


                </section>

            </div>
        </>
    )
}

export default SingleProduct;
