


import React, { useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // ✅ Import icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsCard from "../../../components/Products/ProductsCard";
import ProductModal from "../../../components/Products/ProductModal";
import classes from "./BestSellers.module.css";
import WishlistModal from "../../../components/WishlistModal/WishlistModal";
import { useEffect } from "react";
// import { useSelector } from "react-redux";

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
    <button className={`${classes.arrow} ${classes.nextArrow}`} onClick={onClick}>
        <AiOutlineRight />
    </button>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
    <button className={`${classes.arrow} ${classes.prevArrow}`} onClick={onClick}>
        <AiOutlineLeft />
    </button>
);

const BestSellers = () => {
    const { products, status } = useSelector((state) => state.products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistProduct, setWishlistProduct] = useState(null);



    useEffect(() => {
        // Load wishlist from localStorage on component mount
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    const bestSellers = products.filter((product) => product.best_seller === 1);

    if (status === "loading") return <p>Loading best sellers...</p>;
    if (status === "failed") return <p>Failed to load best seller products</p>;

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };



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

    // Add/Remove Product from Wishlist
    const handleWishlistToggle = (product) => {
        let updatedWishlist;
        if (wishlist.some((item) => item.id === product.id)) {
            // Remove product from wishlist
            updatedWishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
            // Add product to wishlist
            updatedWishlist = [...wishlist, product];
            setWishlistProduct(product);
            setShowModal(true);
        }

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    return (
        <>
                <div className={classes.bestSellerSection}>
                    <div className={classes.ourBest} style={{ display: 'flex', padding: "25px 0", gap: "25px", alignItems: "center" }}>
                        <h3 style={{ fontWeight: "600", fontSize: "20px" }}>Our Best Sellers</h3>
                        <p style={{ color: "#90979F", fontSize: "14px", fontWeight: "500" }}>
                            Lörem ipsum groupie heterock. Multin suprant Tintingate. Telagt osänings.
                        </p>
                    </div>
                    <Slider {...settings}>
                        {bestSellers.map((product, index) => (
                            <div key={product.id} className={classes.productContainer}>
                                <ProductsCard
                                    id={product.id}
                                    img={product.images[0]}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category_name}
                                    discount_price={product.discount_price}
                                    index={index}
                                    showAddToCart={false}
                                    hideWishlist={false}
                                    // hideAddToCart={true}
                                    onViewProduct={() => handleOpenModal(product)}
                                    onToggleWishlist={() => handleWishlistToggle(product)}
                                    isWishlisted={wishlist.some((item) => item.id === product.id)}

                                    product_status={product.product_status}  // ✅ Add this line
                                    productId={product.id}  // ✅ Add this line

                                // product_status={product.product_status}


                                />
                            </div>
                        ))}
                    </Slider>


                </div>
                {showModal && <WishlistModal productName={wishlistProduct.name} onClose={() => setShowModal(false)} />}
                {/* Product Modal */}

                {isModalOpen && (
                    <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
                )}

        </>
    );
};

export default BestSellers;











