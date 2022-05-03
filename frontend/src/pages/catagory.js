import { useEffect, useState } from "react";
import {  Table } from "react-bootstrap";
import CatagoryModal from "../components/model/catagory";
import { DeleteAPIService, GetAPIService } from "../services";

const Catagory = () => {
    // all catagory list
    const [catagories, setCatagories] = useState([]);
    // single catagory object for update.
    const [catagory, setCatagory] = useState({});

    // API call to get products catagory.
    useEffect(() => {
        GetAPIService('http://localhost:5001/product_catagory').then(prod => {
            setCatagories(prod?.data?.data)
        }).catch(err => {
            console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)

        })
    }, []);

    // open or close create new catagory or update catagory modal.
    const [active, setActive] = useState(false);
    const toggleModal = (value) => {
        setActive(value);
        setCatagory({});
    }

    // This function take catagory from catagory list and pass to catagory modal. 
    const updateProduct = (catagory) => {
        setCatagory(catagory);
        setActive(true)
    }

    // API for delete catagory by catagory id.
    const deleteProduct = (id) => {
        DeleteAPIService('http://localhost:5001/product_catagory/'+id).then(res => {
          console.log("🚀 ~ file: catagory.js ~ line 34 ~ DeleteAPIService ~ res", res)
          const cata =  catagories?.filter(ele=>{
                if(ele.product_catagories_id != id)
                return ele;
            });
            setCatagories(cata);
        }).catch(err=> {
        console.log("🚀 ~ file: items.js ~ line 33 ~ DeleteAPIService ~ err", err)
            
        })
    }
    return (

        <>
            {active ? <CatagoryModal 
            action={toggleModal} 
            setCatagories={setCatagories} 
            catagories={catagories} 
            active={active} 
            catagory={catagory}
            /> : <></>
            }

            <div class="container">
                <h1>Catagories</h1>
                <div className=" pb-2">
                    <div className="float-left">
                        <button type="button"
                            onClick={() => toggleModal(!active)}
                            className="btn btn-primary">ADD NEW CATAGORY</button>
                    </div>

                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catagories?.map((catagory, index) => {
                            return <>
                                {index % 2 === 0 ? <tr>
                                    <td className="with-25" >{catagory?.name}</td>
                                    
                                    <td className="with-25" >
                                        <img src={catagory?.image} className="img-fluid img-thumbnail with-100" alt="Item" />
                                        <p>{catagory?.image_title}</p>
                                    </td>
                                    <td  className="with-25">{catagory?.description}</td>
                                    <td className="with-10">
                                        <button className="btn btn-primary" onClick={()=> updateProduct(catagory)}>Update</button>
                                        <button className="btn btn-danger" onClick={()=> deleteProduct(catagory.product_catagories_id)}>Delete</button>
                                        </td>
                                </tr> :
                                    <tr>
                                        <td  className="with-25">{catagory?.name}</td>
                                        <td className="with-25">
                                            <img src={catagory?.image} class="img-fluid img-thumbnail with-100" alt="Item" />
                                            <p>{catagory?.image_title}</p>
                                        </td>
                                        <td className="with-25" >{catagory?.description}</td>
                                        <td className="with-10">
                                        <button className="btn btn-primary" onClick={()=> updateProduct(catagory)} >Update</button>
                                        <button className="btn btn-danger" onClick={()=> deleteProduct(catagory.product_catagories_id)}>Delete</button>
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

export default Catagory;