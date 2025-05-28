import React from "react";
import { useNavigate } from "react-router-dom";
import successImage from "../../../src/assets/checkout-success.png";
import classes from "./OrderSucess.module.css"; // Adjust the path based on your folder structure
const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.orderSuccess} >
            <img src={successImage} alt="Order Successful" />
            <p >Thank you for your purchase! Your order has been placed successfully. You will receive a confirmation email shortly.</p>
            <button onClick={()=>navigate("/")} >Back to Home Page</button>
        </div>
    );
};

export default OrderSuccess;
