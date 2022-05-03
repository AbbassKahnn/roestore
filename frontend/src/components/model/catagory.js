import { useEffect, useRef, useState } from 'react';
import { GetAPIService, PostAPIService, PutAPIService } from '../../services';
import './style.css'

const CatagoryModal = ({ action, active, setCatagories, catagories, catagory }) => {
console.log("🚀 ~ file: catagory.js ~ line 6 ~ CatagoryModal ~ catagory", catagory)
    const [formData, setFormData] = useState(catagory?.product_catagories_id ? catagory :{
        image:'',
        name: '',
        description: '',
        product_catagories_id: ''
    });

    const {
        image,
        name,
        description,
    } = formData;

    const onChangeFormData = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const SaveProduct = () => {
        let oldP = catagories;
        
        if(catagory?.product_catagories_id){
            console.log("🚀 ~ Update", catagory)
            // update catagory
            PutAPIService('http://localhost:5001/product_catagory', formData).then(res=>{
                const cata = catagories?.map(ele=> {
                    if(ele.product_catagories_id == catagory.product_catagories_id){
                        ele.name = formData.name;
                        ele.image = formData.image;
                        ele.description = formData.description;
                    }
                    return ele;
                })
                setCatagories(cata);
                action(!active);
            }).catch(err=> {
            console.log("🚀 ~ file: product.js ~ line 43 ~ PutAPIService ~ err", err)
            })
        } else{
            PostAPIService('http://localhost:5001/product_catagory', formData).then(res=>{
            oldP.unshift(formData);
            setCatagories(oldP);
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
        if(!catagory?.product_catagories_id){
       GetAPIService('http://localhost:5001/product_catagory').then(res=>{
       setCatagories(res?.data?.data);
       setFormData({ ...formData, ['product_catagories_id']: res?.data?.data[0]?.product_catagories_id });
       }).catch(err=>{
       console.log("🚀 ~ file: product.js ~ line 73 ~ GetAPIService ~ err", err)
       });
}
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
                                    <th scope="col">Catagory Name</th>
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
                                    <td><input type="text" className='form-control' name="name" value={name} onChange={onChangeFormData} /></td>
            
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

export default CatagoryModal;