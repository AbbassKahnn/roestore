import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/nav/nav";
import Cart from "../pages/cart";
import Catagory from "../pages/catagory";
import Home from "../pages/home";
import Items from "../pages/items";
import Orders from "../pages/orders";
import Product from "../pages/product";
import SignIn from "../pages/signin";
import SingleProduct from "../pages/singleProduct";

const AppRoutes = () => {
    return (
        <>
            <div className="shadow p-2 mb-3 bg-white rounded ">
                <div className="pb-2">
                    <NavBar />
                </div>
            </div>
            <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/home" exact={true} element={<Home />} />
                <Route path="/product/:id" exact={true} element={<Product />} />
                <Route path="/single/:id" exact={true} element={<SingleProduct />} />
                <Route path="/login" exact={true} element={<SignIn />} />
                <Route path="/orders" exact={true} element={<Orders />} />
                <Route path="/items" exact={true} element={<Items />} />
                <Route path="/catagory" exact={true} element={<Catagory />} />
                <Route path="/cart" exact={true} element={<Cart />} />
                <Route path="/product" exact={true} element={<Product />} />

            </Routes>
        </>

    );
};

export default AppRoutes;
