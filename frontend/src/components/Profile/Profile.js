



import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        addresses: [{ full_name: "", phone: "", address_line1: "", address_line2: "", city: "", state: "", country: "", pincode: "" }]
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchUserProfile();
        fetchOrders();
    }, []);


    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(data);
        } catch (err) {
            navigate("/my-account");
            setError("Failed to load profile");

        }
    };
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/orders/my-orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data);
            console.log("Orders:", response.data);

        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAddresses = [...user.addresses];
        updatedAddresses[index][name] = value;
        setUser({ ...user, addresses: updatedAddresses });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:5000/api/users/profile", user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully");
        } catch (err) {
            setError("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className={classes.profile}>
                    <h2 className={classes.title}>Profile</h2>
                    {error && <p className={classes.error}>{error}</p>}
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <div className={classes.formGroup}>
                            <label>Username:</label>
                            <input type="text" name="name" value={user.name} onChange={handleChange} required />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Email:</label>
                            <input type="email" name="email" value={user.email} onChange={handleChange} required />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Phone:</label>
                            <input type="text" name="phone" value={user.phone} onChange={handleChange} required />
                        </div>

                        {/* <h3 className={classes.subTitle}>Addresses</h3> */}
                        {user.addresses.map((address, index) => (
                            <div key={index} className={classes.addressBox}>
                                <div className={classes.formGroup}>
                                    <label>Full Name:</label>
                                    <input type="text" name="full_name" value={address.full_name} onChange={(e) => handleAddressChange(index, e)} required />
                                </div>
                                <div className={classes.formGroup}>
                                    {/* <label>Phone:</label>
                            <input type="text" name="phone" value={address.phone} onChange={(e) => handleAddressChange(index, e)} required /> */}
                                </div>
                                <div className={classes.formGroup}>
                                    <label>Address Line 1:</label>
                                    <input type="text" name="address_line1" value={address.address_line1} onChange={(e) => handleAddressChange(index, e)} required />
                                </div>
                                <div className={classes.formGroup}>
                                    <label>Address Line 2:</label>
                                    <input type="text" name="address_line2" value={address.address_line2} onChange={(e) => handleAddressChange(index, e)} />
                                </div>
                                <div className={classes.formGroup}>
                                    <label>City:</label>
                                    <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} required />
                                </div>
                                <div className={classes.formGroup}>
                                    <label>State:</label>
                                    <input type="text" name="state" value={address.state} onChange={(e) => handleAddressChange(index, e)} required />
                                </div>
                                <div className={classes.formGroup}>
                                    <label>Country:</label>
                                    <input type="text" name="country" value={address.country} onChange={(e) => handleAddressChange(index, e)} required />
                                </div>
                                <div className={classes.formGroup}>
                                    <label>Pincode:</label>
                                    <input type="text" name="pincode" value={address.pincode} onChange={(e) => handleAddressChange(index, e)} required />
                                </div>
                            </div>
                        ))}

                        <button type="submit" className={classes.submitButton} disabled={loading}>
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>


                <div className={classes.ordersContainer}>
                    <h2>Your Orders</h2>
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.order_id} className={classes.orderCard}>
                                <div className={classes.orderHeader}>
                                    <div><strong>Order ID:</strong> {order.order_id}</div>
                                    <div><strong>Status:</strong> {order.status}</div>
                                    <div><strong>Payment:</strong> {order.payment_method}</div>
                                    {/* <div><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</div> */}
                                    <div><strong>Date: </strong>{new Date(order.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}</div>
                                    <div><strong>Total:</strong> ₹{order.total_price}</div>
                                </div>
                                <div className={classes.orderProducts}>
                                    {order.products.map((product, index) => (
                                        <div key={index} className={classes.productCard}>
                                            <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
                                            <div className={classes.productInfo}>
                                                <h4>{product.name}</h4>
                                                <p>Quantity: {product.quantity}</p>
                                                <p>Price: ₹{product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </>
    );
};

export default Profile;
