import { useEffect, useRef, useState } from 'react';
import { GetAPIService, PostAPIService, PutAPIService } from '../../services';
import './style.css'

const ProductModal = ({ action, active, setProducts, products, product }) => {

    const [catagories, setCatagories] = useState([]);
    const [formData, setFormData] = useState(product? product :{
        image:'',
        name: '',
        title: '',
        price: '',
        quantity: '',
        description: '',
        product_catagories_id: 0,
        color: '',
        product_style: '',
        material: '' ,
        place_of_origin: '',
         model_number: '',
          supple_ability: '',
        brand_name: ''
    });
    console.log("🚀 ~ file: product.js ~ line 9 ~ ProductModal ~ formData", formData)

    const {
        image,
        name,
        title,
        price,
        quantity,
        description,
        product_catagories_id,
        color,
        product_style,
        material,
        place_of_origin,
        model_number,
        supple_ability,
        brand_name
    } = formData;

    const onChangeFormData = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const SaveProduct = () => {
        let oldP = products;
        
        if(product.product_id){
            // update product
            PutAPIService('http://localhost:5001/product', formData).then(res=>{
                const prod = products?.map(ele=> {
                    if(ele.product_id == product.product_id){
                        ele.image=formData.image;
                        ele.name=formData.name;
                        ele.title=formData.title;
                        ele.price=formData.price;
                        ele.quantity=formData.quantity;
                        ele.description=formData.description;
                        ele.product_catagories_id=formData.product_catagories_id;
                        ele.color=formData.color;
                        
                    }
                    return ele;
                })
                setProducts(prod);
                action(!active);
            }).catch(err=> {
            console.log("🚀 ~ file: product.js ~ line 43 ~ PutAPIService ~ err", err)
            })
        } else{
            //create product
            PostAPIService('http://localhost:5001/product', formData).then(res=>{
                oldP.unshift(formData);
            setProducts(oldP);
            action(!active);
        }).catch(err=>{
        console.log("🚀 ~ file: product.js ~ line 39 ~ PostAPIService ~ err", err)
        });
        }
        
        
    }

    const inputRef = useRef(null);
    const handleUpload = () => {
        inputRef.current?.click();
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadImage = (event) => {
        const file = event.target.files[0];  
        getBase64(file).then((data) => {
          setFormData({ ...formData, image: data });
        });
    };

    useEffect(() => {
       GetAPIService('http://localhost:5001/product_catagory').then(res=>{
       setCatagories(res?.data?.data);
       if(!product.product_catagories_id)
       setFormData({ ...formData, ['product_catagories_id']: res?.data?.data[0]?.product_catagories_id });
       }).catch(err=>{
       console.log("🚀 ~ file: product.js ~ line 73 ~ GetAPIService ~ err", err)
       })
    }, []);

    

    return (<>
        <div class="modal-container">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-with-95" role="document">
                <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Add New Product
                        </h5>
                        <button type="button" className='btn-danger'
                            onClick={() => action(!active)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Catagory</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="w-15">
                                        <img src={image} class="img-fluid img-thumbnail" alt="" />
                                        <input type='file' ref={inputRef} className='d-none' name='image' onChange={
                                            (e) => uploadImage(e)
                                        } />
                                        <br />
                                        <button onClick={handleUpload} className="btn btn-outline">Upload</button>
                                    </td>
                                    <td>
                                        <input type="text" className='form-control' name="name" value={name} onChange={onChangeFormData} />
                                        <label>Brand</label>
                                        <input type="text" className='form-control' name="brand_name" value={brand_name} placeholder="Brand name" onChange={onChangeFormData} />
                                    </td>
                                    <td>
                                        <input type="text" className='form-control' name="title" value={title} onChange={onChangeFormData} />
                                        <label>Style</label>
                                        <input type="text" className='form-control' name="product_style" value={product_style} placeholder="Style" onChange={onChangeFormData} />
                                        
                                    </td>
                                    <td class="qty">
                                        <input type="number" className='form-control' name="price" value={price} onChange={onChangeFormData} />
                                        <label>Material</label>
                                        <input type="text" className='form-control' name="material" value={material} placeholder="Material" onChange={onChangeFormData} />

                                        </td>
                                    <td class="qty">
                                        <input type="number" className='form-control' name="quantity" value={quantity} onChange={onChangeFormData} />
                                        <label>Model</label>
                                        <input type="number" className='form-control' name="model_number" value={model_number} placeholder='Model number' onChange={onChangeFormData} />
                                    </td>
                                    <td class="qty">
                                        <input type="text" className='form-control' name="color" value={color} onChange={onChangeFormData} />
                                        <label>Origin</label>
                                        <input type="text" className='form-control' name="place_of_origin" value={place_of_origin} placeholder='Place of origin' onChange={onChangeFormData} />
                                    </td>
                                    <td class="qty">
                                        <select className='form-control'
                                        name='product_catagories_id' value={product_catagories_id}
                                        onChange={onChangeFormData}>
                                            {catagories?.map(cat=> {
                                                return <option value={cat.product_catagories_id}>{cat.name}</option>
                                            })}
                                            
                                        </select>
                                        <label>Supply ability</label>
                                        <input type="text" className='form-control' name="supple_ability" value={supple_ability} placeholder='Supple ability' onChange={onChangeFormData} />
                                        </td>
                                    <td><textarea className='form-control' name="description" rows={6} value={description} onChange={onChangeFormData} /></td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="modal-footer border-top-0 d-flex justify-content-between">
                        <button type="button" className='btn btn-danger' onClick={() => action(!active)} >Close</button>
                        <button type="button" onClick={() => SaveProduct()} class="btn btn-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ProductModal;