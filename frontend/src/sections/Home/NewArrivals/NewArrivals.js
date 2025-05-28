


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import classes from "./NewArrivals.module.css";
import ProductModal from "../../../components/Products/ProductModal";
import { FaStar } from "react-icons/fa";


const NewArrivals = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 70,
        hours: 13,
        minutes: 8,
        seconds: 0,
    });

    const navigate = useNavigate(); // Initialize navigate function
    const { products, status } = useSelector((state) => state.products);
    const { reviews, loading } = useSelector((state) => state.reviews);
    const averageRating = useSelector((state) => state.reviews.averageRating);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    if (minutes > 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                        seconds = 59;
                    } else if (days > 0) {
                        days -= 1;
                        hours = 23;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        clearInterval(timer);
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Failed to load products</p>;
    if (!Array.isArray(products) || products.length === 0) return <p>No products found.</p>;

    const necklaceProduct = products.find((d) => d.category_name?.toLowerCase() === "necklaces");
    const ringProduct = products.find((d) => d.category_name?.toLowerCase() === "rings");
    if (!necklaceProduct && !ringProduct) return <p style={{ color: "red" }}>No matching products found.</p>;

    const selectedProducts = [necklaceProduct, ringProduct].filter(Boolean);
    // Open Modal Handler
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Close Modal Handler
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };
    // Open Single Product Page
    const handleViewProduct = (id) => {
        navigate(`/product/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={classes.newArrivalsContainer}>
            <div className={classes.hideOnMobile} style={{ display: 'flex', padding: "25px 0", gap: "25px", alignItems: "center" }}>
                <h3 style={{ fontWeight: "600", fontSize: "17px" }}>New Arrivals</h3>
                <p style={{ color: "#90979F", fontSize: "12px", fontWeight: "500" }}>
                    Lörem ipsum groupie heterock. Multin suprant Tintingate. Telagt osänings.
                </p>
            </div>

            <div className={classes.productsWrapper}>
                {selectedProducts.map((product) => {
                    const discountPercent = product.discount_price
                        ? Math.round(((product.price - product.discount_price) / product.price) * 100)
                        : 0;

                    return (
                        <div key={product.id} className={classes.productRow}>
                            {/* Clickable Image */}
                            <div
                                className={classes.imageWrapper}
                                style={{ cursor: "pointer" }}
                            >
                                <img onClick={() => handleViewProduct(product.id)} src={`http://localhost:5000/${product.images[0]}`} alt={product.name || "Product"} />
                                <div className={classes.quickView}>
                                    <button onClick={() => handleOpenModal(product)}>QUICK VIEW</button>
                                </div>
                                {product.discount_price && (
                                    <div className={classes.discountBadge}>{discountPercent}%</div>
                                )}
                            </div>

                            <div className={classes.detailsWrapper}>
                                <p className={classes.category}>{product.category_name}</p>
                                <p className={classes.name}>{product.name}</p>
                                {product.discount_price ? (
                                    <p className={classes.price}>
                                        <span className={classes.discountPrice}>${product.discount_price}</span>
                                        <span className={classes.originalPrice}>${product.price}</span>
                                    </p>
                                ) : (
                                    <p className={`${classes.price} ${classes.normalPrice}`}>${product.price}</p>
                                )}
                                <div style={{ display: "flex", alignItems: "center", padding: "15px 0" }}>
                                    <h1 style={{ fontSize: "11px" }}><FaStar /> {averageRating ? averageRating.toFixed(2) : "0.00 "}</h1>
                                    <p style={{ fontSize: "10px", paddingLeft: "5px" }}>{reviews.length} Reviews</p>
                                </div>
                                <p className={classes.shortDesc}>{product.short_desc}</p>

                                <div className={classes.midnightSales}>
                                    <p style={{ fontSize: "11px", fontWeight: "400", color: "#CA3030" }}>
                                        <span> {timeLeft.days}  {" "} </span> :
                                        <span> {timeLeft.hours}  {" "} </span> :
                                        <span> {timeLeft.minutes}  {" "}</span>:
                                        <span> {timeLeft.seconds} {" "}</span>
                                        Campaign expiration date. {" "}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* Product Modal */}
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                />
            </div>
        </div>
    );
};

export default NewArrivals;
