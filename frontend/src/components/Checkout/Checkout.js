


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//     const [addresses, setAddresses] = useState([]);
//     const [selectedAddress, setSelectedAddress] = useState(null);
//     const [paymentMethod, setPaymentMethod] = useState("cod");
//     const [loading, setLoading] = useState(false);
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAddresses = async () => {
//             setLoading(true);
//             try {
//                 const { data } = await axios.get("http://localhost:5000/api/address", {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//                 });
//                 setAddresses(data);
//                 if (data.length > 0) setSelectedAddress(data[0].id);
//             } catch (error) {
//                 console.error("Error fetching addresses", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAddresses();
//     }, []);

//     const placeOrder = async () => {
//         if (!selectedAddress) {
//             alert("Please select a shipping address.");
//             return;
//         }

//         if (!paymentMethod) {
//             alert("Please select a payment method.");
//             return;
//         }

//         if (cart.length === 0) {
//             alert("Your cart is empty.");
//             return;
//         }

//         const orderData = {
//             address_id: selectedAddress,
//             payment_method: paymentMethod,
//             items: cart.map(item => ({
//                 product_id: item.id,
//                 quantity: item.quantity
//             })),
//             total_price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
//         };
//         console.log("Order Data:", JSON.stringify(orderData, null, 2));


//         try {
//             setLoading(true);
//             const { data } = await axios.post("http://localhost:5000/api/orders/place-order", orderData, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//             });

//             alert("Order Placed Successfully!");
//             localStorage.removeItem("cart"); // Clear cart after order placement
//             navigate("/order-success");
//         } catch (error) {
//             console.error("Order placement failed", error);
//             alert("Failed to place order. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="checkout-container">
//             <h2>Checkout</h2>

//             {/* Address Selection */}
//             <h3>Select Shipping Address</h3>
//             {loading ? (
//                 <p>Loading addresses...</p>
//             ) : addresses.length > 0 ? (
//                 <div>
//                     {addresses.map(addr => (
//                         <label key={addr.id} className="address-option">
//                             <input
//                                 type="radio"
//                                 name="address"
//                                 value={addr.id}
//                                 checked={selectedAddress === addr.id}
//                                 onChange={() => setSelectedAddress(addr.id)}
//                             />
//                             {addr.address_line1}, {addr.city}, {addr.state} - {addr.pincode}
//                             <input
//                                 type="radio"
//                                 name="address"
//                                 value={addr.id}
//                                 checked={selectedAddress === addr.id}
//                                 onChange={() => setSelectedAddress(addr.id)}
//                             />
//                             {addr.address_line2}, {addr.city}, {addr.state} - {addr.pincode}
//                         </label>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No saved addresses. Please add one.</p>
//             )}

//             {/* Payment Method Selection */}
//             <h3>Payment Method</h3>
//             <div>
//                 <label>
//                     <input
//                         type="radio"
//                         name="payment"
//                         value="cod"
//                         checked={paymentMethod === "cod"}
//                         onChange={() => setPaymentMethod("cod")}
//                     />
//                     Cash on Delivery
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="payment"
//                         value="upi"
//                         checked={paymentMethod === "upi"}
//                         onChange={() => setPaymentMethod("upi")}
//                     />
//                     UPI
//                 </label>
//             </div>

//             {/* Cart Summary */}
//             <h3>Order Summary</h3>
//             {cart.length > 0 ? (
//                 <ul>
//                     {cart.map(item => (
//                         <li key={item.id}>
//                             {item.name} x {item.quantity} - ₹{item.price * item.quantity}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Your cart is empty.</p>
//             )}
//             <h4>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h4>

//             {/* Place Order Button */}
//             <button onClick={placeOrder} disabled={loading}>
//                 {loading ? "Processing..." : "Place Order"}
//             </button>
//         </div>
//     );
// };

// export default Checkout;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Checkout.module.css"; // Import CSS module

const Checkout = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [loading, setLoading] = useState(false);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("http://localhost:5000/api/address", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setAddresses(data);
                if (data.length > 0) setSelectedAddress(data[0].id);
            } catch (error) {
                console.error("Error fetching addresses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();
    }, []);

    const placeOrder = async () => {
        if (!selectedAddress) {
            alert("Please select a shipping address.");
            return;
        }

        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const orderData = {
            address_id: selectedAddress,
            payment_method: paymentMethod,
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            })),
            total_price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        };

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/orders/place-order", orderData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            alert("Order Placed Successfully!");
            localStorage.removeItem("cart");
            navigate("/order-success");
        } catch (error) {
            console.error("Order placement failed", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classes.checkout}>
            <h2>Checkout</h2>

            {/* Address Selection */}
            <h3>Select Shipping Address</h3>
            {loading ? (
                <p>Loading addresses...</p>
            ) : addresses.length > 0 ? (
                <div className={classes.addressContainer}>
                    {addresses.map(addr => (
                        <label key={addr.id} className={classes.addressOption}>
                            <input
                                type="radio"
                                name="address"
                                value={addr.id}
                                checked={selectedAddress === addr.id}
                                onChange={() => setSelectedAddress(addr.id)}
                            />
                            {addr.address_line1}, {addr.city}, {addr.state} - {addr.pincode}
                        </label>
                    ))}
                </div>
            ) : (
                <p>No saved addresses. Please add one.</p>
            )}

            {/* Payment Method Selection */}
            <h3>Payment Method</h3>
            <div className={classes.paymentContainer}>
                <label className={classes.paymentOption}>
                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                    Cash on Delivery
                </label>
                <label className={classes.paymentOption}>
                    <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                    />
                    UPI
                </label>
            </div>

            {/* Cart Summary */}
            <h3>Order Summary</h3>
            <div className={classes.cartSummary}>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                {/* <h4>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h4> */}
                <h4>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h4>

            </div>

            {/* Place Order Button */}
            <button onClick={placeOrder} disabled={loading} className={classes.placeOrderBtn}>
                {loading ? "Processing..." : "Place Order"}
            </button>
        </div>
    );
};

export default Checkout;
