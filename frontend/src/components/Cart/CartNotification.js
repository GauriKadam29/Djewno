import React from "react";
import styles from "./CartNotification.module.css"; // ✅ Import the CSS file

const CartNotification = ({ product, onClose, onViewCart }) => {
  return (
    <div className={styles.notification}>
      <p>{product.name} has been added to the cart.</p>
      <button onClick={onViewCart} className={styles.viewCartBtn}>
        View Cart
      </button>
      <button onClick={onClose} className={styles.closeBtn}>X</button>
    </div>
  );
};

export default CartNotification;
