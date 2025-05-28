import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";
import { FiBox } from "react-icons/fi";
import { BsCartX } from "react-icons/bs";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Data:", storedCart);
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, (updatedCart[index].quantity || 1) + delta);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className={classes.cartContainer}>
      {/* <h2>Shopping Cart</h2> */}
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", height: "60vh", paddingTop: "90px" }}>

          <BsCartX style={{ fontSize: "120px" }} />
          <p style={{ paddingTop: "20px" }}>Your cart is currently empty.</p>
          <button onClick={() => navigate("/shop")} style={{ backgroundColor: "#343A40", color: "white", border: "none", padding: "12px 20px", fontWeight: "600", marginTop: "20px" }}>Return to shop</button>

        </div>
      ) : (
        <>
          <div className={classes.orderQualify}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <FiBox />
              <p>Your order qualifies for free shipping!</p>
            </div>
            <div style={{ width: "100%", height: "5px", backgroundColor: "#3BB150", borderRadius: "5px", marginTop: "15px" }}></div>
          </div>
          <table className={classes.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th className={classes.hideOnMobile}>Price</th>
                <th className={classes.hideOnMobile}>Quantity</th>
                <th>Subtotal</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td className={classes.productInfo}>
                    <img src={`http://localhost:5000/${product.img}`} alt={product.name} className={classes.wishlistImg} />
                    <Link to={`/product/${product.id}`} className={classes.productName}>{product.name}</Link>
                  </td>
                  <td className={classes.hideOnMobile}>${product.discount_price || product.price}</td>
                  <td className={`${classes.quantityBtn} ${classes.hideOnMobile}`}>
                    <span>
                      <button onClick={() => updateQuantity(index, -1)}>-</button>
                      {product.quantity || 1}
                      <button onClick={() => updateQuantity(index, 1)}>+</button>
                    </span>
                  </td>
                  <td>${(product.price * (product.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <button className={classes.removeBtn} onClick={() => removeFromCart(index)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={classes.totalSection}>
            <h3>Total: $
              {cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0).toFixed(2)}
            </h3>
            <button className={classes.checkoutBtn} onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};



export default Cart;
