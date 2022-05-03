import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import ProductModal from "../components/model/product";
import { DeleteAPIService, GetAPIService } from "../services";

const Items = () => {
    //products list
    const [products, setProducts] = useState([]);
//product object for updating product
    const [product, setProduct] = useState({});
//API CALL to get all products
    useEffect(() => {
        GetAPIService('http://localhost:5001/product').then(prod => {
            setProducts(prod?.data?.data)
        }).catch(err => {
            console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)

        })
    }, []);
// opens or closes creates new product or updates product modal.
    const [active, setActive] = useState(false);
    const toggleModal = (value) => {
        setActive(value);
        setProduct({});
    }
// This function takes product from product list and pass to product modal. 
    const updateProduct = (product) => {
        setProduct(product);
        setActive(true)
    }
//API CALL for deleting a product
    const deleteProduct = (id) => {
        DeleteAPIService('http://localhost:5001/product/'+id).then(res => {
          const prod =  products?.filter(ele=>{
                if(ele.product_id != id)
                return ele;
            });
            setProducts(prod);
        }).catch(err=> {
        console.log("🚀 ~ file: items.js ~ line 33 ~ DeleteAPIService ~ err", err)
            
        })
    }
    return (

        <>
            {active && <ProductModal 
            action={toggleModal} 
            setProducts={setProducts} 
            products={products} 
            active={active} 
            product={product}
            /> 
            }

            <div class="container">
                <h1>Items</h1>
                <div className=" pb-2">
                    {/* <div className="with-25 float-left">
                        <Form.Select size="sm">
                            <option>Small select</option>
                        </Form.Select>
                    </div> */}
                    <div className="float-left">
                        <button type="button"
                            onClick={() => toggleModal(!active)}
                            className="btn btn-primary">ADD NEW PRODUCT</button>
                    </div>

                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            return <>
                                {index % 2 === 0 ? <tr>
                                    <td className="with-10">{product?.name}</td>
                                    <td className="with-10">{product?.title}</td>
                                    <td className="with-5">{product?.price}</td>
                                    <td className="with-5">{product?.quantity}</td>
                                    <td className="with-10">
                                        <img src={product?.image} class="img-fluid img-thumbnail" alt="Item" />
                                        <p>{product?.image_title}</p>
                                    </td>
                                    <td className="with-25">{product?.description}</td>
                                    <td className="with-10">
                                        <button className="btn btn-primary" onClick={()=> updateProduct(product)}>Update</button>
                                        <button className="btn btn-danger" onClick={()=> deleteProduct(product.product_id)}>Delete</button>
                                        </td>
                                </tr> :
                                    <tr>
                                        <td className="with-10">{product?.name}</td>
                                        <td className="with-10">{product?.title}</td>
                                        <td className="with-5">{product?.price}</td>
                                        <td className="with-5">{product?.quantity}</td>
                                        <td className="with-10">
                                            <img src={product?.image} class="img-fluid img-thumbnail" alt="Item" />
                                            <p>{product?.image_title}</p>
                                        </td>
                                        <td className="with-25">{product?.description}</td>
                                        <td className="with-10">
                                        <button className="btn btn-primary" onClick={()=> updateProduct(product)} >Update</button>
                                        <button className="btn btn-danger" onClick={()=> deleteProduct(product.product_id)}>Delete</button>
                                        </td>
                                    </tr>}
                            </>
                        })
                        }

                    </tbody>
                </Table>
            </div>
        </>
    );

}

export default Items;