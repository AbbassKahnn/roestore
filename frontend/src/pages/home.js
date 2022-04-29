import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import Banner from '../assets/banner.png';
import CatagoryCard from "../components/cards/catagoryCard";
import { GetAPIService } from "../services";

const Home = () => {
    // catagory list
    const [catagories, setCatagories] = useState([]);
    // API call to get all catagories
    useEffect(() => {
        GetAPIService('http://localhost:5001/product_catagory').then(prod => {
            setCatagories(prod?.data?.data)
        }).catch(err => {
            console.log("🚀 ~ file: items.js ~ line 14 ~ PostAPIService ~ err", err)
        })
    }, []);
    return (<>
        <Container fluid className="bg-light">
            <div className="pb-3 mb-3">
                <Image src={Banner} alt='' className="d-block mx-auto img-fluid w-50" fluid={true} />
            </div>
        </Container>
        <Container>
            <div className="shadow p-2 mb-5 bg-gray rounded ">
                <div className="pb-3">
                    <Row>
                        {catagories?.map(ele=>{
                            return <CatagoryCard 
                            id={ele.product_catagories_id}
                            name={ele.name} 
                            image={ele.image}
                            />
                        }) }
                    </Row>
                </div>
            </div>
        </Container>

    </>
    );
}

export default Home;
