


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ProductsCard.module.css";
import WishlistModal from "../WishlistModal/WishlistModal";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ProductModal from "./ProductModal";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useSelector } from "react-redux";
// import { fetchProducts } from "../../redux/productSlice";
import { fetchUserProfile } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";


const ProductsCard = ({
    id,
    img,
    name,
    price,
    short_desc,
    index,
    category,
    discount_price,
    onViewProduct,
    showAddToCart,
    product_status,
    hideAddToCart,
    simplePriceView,
    disableHoverEffect,
    product,
    hideWishlist,
    productId,
    isWishlistedProp,

}) => {
    const [showNotification, setShowNotification] = useState(false);
    const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
    // const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);



    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const dispatch = useDispatch();



    // ✅ Get logged-in user from Redux store
    const user = useSelector((state) => state.auth.user);

    // ✅ Get products from Redux store
    const { products, status, error } = useSelector((state) => state.products);

    const { reviews, loading } = useSelector((state) => state.reviews);
    const averageRating = useSelector((state) => state.reviews.averageRating);


    // ✅ Find the specific product from Redux store
    // const product = products.find((item) => item.id === productId) || null;
    const wishlistProduct = products.find((item) => item.id === productId) || null;

    // ✅ Wishlist state
    const [isWishlisted, setIsWishlisted] = useState(isWishlistedProp);

    // ✅ Fetch user when the component mounts (optional)
    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, user]);

    // ✅ Check if the product is already in the wishlist
    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(wishlist.some((item) => item.id === productId));
    }, [productId]);

    // console.log("User from Redux:", user);
    // console.log("Products from Redux:", products);
    // console.log("Received productId:", productId);

    // ✅ Handle wishlist logic
    const handleWishlistClick = () => {
        if (!user) {
            navigate("/my-account"); // Redirect to login if user is not logged in
            return;
        }

        if (!wishlistProduct) {
            console.error("🚨 Product is undefined! Check Redux state.");
            return;
        }

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const alreadyExists = wishlist.some((item) => item.id === wishlistProduct.id);

        if (!alreadyExists) {
            wishlist.push({ ...wishlistProduct, dateAdded: new Date().toISOString() });
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            setIsWishlisted(true); // ✅ Update the wishlist state
            setShowModal(true);

            // console.log("✅ Product added to wishlist:", wishlistProduct);
        } else {
            // Remove from wishlist
            wishlist = wishlist.filter((item) => item.id !== wishlistProduct.id);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            setIsWishlisted(false); // ✅ Update the wishlist state
            // console.log("❌ Product removed from wishlist:", wishlistProduct);
        }
    };

    if (status === "loading") return <p>Loading products...</p>;
    if (status === "failed") return <p>Error: {error}</p>;





    const addToCart = () => {
        if (!user) {
            navigate("/my-account"); // Redirect to login if user is not logged in
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const productData = {
            id: id,
            name: name,
            price: price,
            discount_price: discount_price || null,
            img: img,
            quantity: 1
        };


        const existingProductIndex = cart.findIndex((item) => item.id === id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(productData);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setShowNotification(true);
        // ✅ Trigger notification in BestSellers
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    // Function to open modal
    const handleQuickView = () => {
        // console.log("Quick View Button Clicked");  // ✅ Check if button is clicked
        // console.log("Product Data:", product);
        setSelectedProduct(product); // ✅ Set product state
    };

    // Function to close modal
    const closeModal = () => {
        console.log("Modal Closed");
        setSelectedProduct(null); // ✅ Reset product state
    };


    return (
        <>
            <div className={`${classes.productCard} ${disableHoverEffect ? classes.noHoverEffect : ""}`}>
                {/* Wishlist Button (Hidden if `hideWishlist` is true) */}
                {!hideWishlist && (

                    <div className={classes.wishlistBtn} onClick={handleWishlistClick}>
                        {isWishlisted ? <GoHeartFill className={classes.redHeart} /> : <GoHeart className={classes.emptyHeart} />}
                    </div>
                )}

                {/* Product Image */}
                <div className={classes.image}>
                    <div className={classes.productImg}>
                        <Link to={`/product/${id}`}>
                            <img key={index} src={`http://localhost:5000/${img}`} alt={`Product ${index}`} />
                        </Link >
                        {discount_price && (
                            <div className={classes.discountBadge}>
                                {Math.round(((price - discount_price) / price) * 100)}%
                            </div>
                        )}
                    </div>

                    {/* Conditionally Render Buttons */}
                    {showAddToCart ? (
                        <div className={classes.addCart}>
                            <button onClick={addToCart}>ADD TO CART</button>
                        </div>
                    ) : (
                        <div className={classes.quickView}>
                            {/* <button onClick={onViewProduct}>QUICK VIEW</button> */}
                            {/* <button onClick={handleQuickView} className={classes.quickViewBtn}>
                                QUICK VIEW
                            </button> */}
                            <button onClick={() => onViewProduct(product)}>QUICK VIEW</button>

                        </div>

                    )}
                </div>

                {/* Product Information */}
                <div className={classes.productInfo}>
                    <p className={classes.category}>{category}</p>
                    <Link to={`/product/${id}`}>
                        <p className={classes.name}>{name}</p>
                    </Link>

                    {/* Price Section */}
                    <div className={simplePriceView ? classes.simplePriceContainer : classes.priceContainer}>
                        {discount_price ? (
                            <p className={classes.price}>
                                <span className={classes.discountPrice}>${discount_price}</span>
                                <span className={classes.originalPrice}>${price}</span>
                            </p>
                        ) : (
                            <p className={classes.normalPrice}>${price}</p>
                        )}
                        {!hideAddToCart && <button className={classes.addToCart} onClick={addToCart}>ADD TO CART</button>}

                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                        <h1 style={{ fontSize: "11px" }}><FaStar /> {averageRating ? averageRating.toFixed(2) : "0.00 "}</h1>
                        <p style={{ fontSize: "10px", paddingLeft: "5px" }}>{reviews.length} Reviews</p>
                    </div>
                    {/* Product Status */}
                    <p className={classes.productStatus}>
                        {product_status}

                    </p>




                    <p>{short_desc}</p>
                </div>

                {/* Wishlist Modal */}
                {/* {isWishlistModalOpen && <WishlistModal productName={name} onClose={() => setIsWishlistModalOpen(false)} />} */}
                {showModal && <WishlistModal productName={wishlistProduct.name} onClose={() => setShowModal(false)} />}

                {/* Notification */}
                {showNotification && (
                    <div className={classes.notification}>
                        <p style={{ fontSize: "14px" }}>"{name}" has been added to the cart.</p>
                        <button onClick={() => navigate("/cart")} className={classes.viewCartBtn}>View Cart</button>
                        <button onClick={() => setShowNotification(false)} className={classes.closeBtn}>X</button>
                    </div>
                )}
            </div>
            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}



        </>
    );
};

export default ProductsCard;





