

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Wishlist.module.css"; // Import CSS module
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiPokerHeartsLine } from "react-icons/ri";


const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    return (
        <div className={classes.wishlistContainer}>
            {wishlist.length === 0 ? (
                // <p className={classes.emptyMessage}>No products in wishlist.</p>
                <div style={{textAlign:"center", height:"60vh",paddingTop:"90px" }}>
                    
                        <RiPokerHeartsLine  style={{ fontSize: "120px" }}/>
                        <p style={{paddingTop:"20px"}}>The wishlist table is empty.</p>
                        <button onClick={() => navigate("/shop")} style={{backgroundColor:"#343A40",color:"white",border:"none",padding:"12px 20px",fontWeight:"600",marginTop:"20px"}}>Return to shop</button>
                   
                </div>

            ) : (
                <table className={classes.wishlistTable}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th className={classes.hideOnMobile}>Price</th>
                            <th className={classes.hideOnMobile}>Date Added</th>
                            <th className={classes.hideOnMobile}>Stock</th>
                            {/* <th>Add to Cart</th> */}
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.map((item) => (
                            <tr key={item.id}>
                                <td className={classes.productInfo}>
                                    <img src={`http://localhost:5000/${item.images[0]}`} alt={item.name} className={classes.wishlistImg} />
                                    <Link to={`/product/${item.id}`} className={classes.productName}>{item.name}</Link>
                                </td>
                                <td className={`${classes.price} ${classes.hideOnMobile}`}>${item.price}</td>
                                <td className={classes.hideOnMobile}>{item.dateAdded ? new Date(item.dateAdded).toLocaleDateString() : "Not Available"}</td>
                                <td className={`${classes.stockStatus} ${classes.hideOnMobile}`}>
                                    {item.product_status ? item.product_status : "Not Available"}
                                </td>
                                {/* <td>
                                    <button className={classes.addToCartBtn}>
                                        {item.hasOptions ? "Select options" : "Add to cart"}
                                    </button>
                                </td> */}
                                <td>
                                    <button className={classes.removeBtn} onClick={() => removeFromWishlist(item.id)}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Wishlist;
