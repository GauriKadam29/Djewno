

// import classes from "./WishlistModal.module.css";
// import { Link } from "react-router-dom";

// const WishlistModal = ({ productName, onClose }) => {
//     return (
//         <div className={classes.modalOverlay}>
//             <div className={classes.modalContent}>
//                 <p><strong>{productName}</strong> has been added to Wishlist.</p>
//                 <button className={classes.viewWishlist}>
//                     <Link to="/wishlist">❤️ View Wishlist</Link>
//                 </button>
//                 <button className={classes.closeBtn} onClick={onClose}>✖ Close</button>
//             </div>
//         </div>
//     );
// };

// export default WishlistModal;



import React from "react";
import ReactDOM from "react-dom";
import { Link, Navigate } from "react-router-dom";
import classes from "./WishlistModal.module.css";
import { useNavigate } from "react-router-dom";

const WishlistModal = ({ productName, onClose }) => {
    const navigate = useNavigate();
    return ReactDOM.createPortal(
        <div className={classes.modalOverlay}>
            <div className={classes.modalContent}>
                <p><strong>{productName}</strong> has been added to Wishlist.</p>
                <button className={classes.viewWishlist} onClick={()=>navigate("/wishlist")}>❤️ View Wishlist</button>
                <button className={classes.closeBtn} onClick={onClose}>✖ Close</button>

            </div>
        </div>,
        document.getElementById("modal-root") // Ensure this exists in index.html
    );
};

export default WishlistModal;
