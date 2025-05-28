

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuBadgeCheck, LuLock, LuRotateCcw } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import {
    FaLinkedinIn,
    FaWhatsapp,
    FaFacebookF,
    FaTwitter,
    FaPinterest,
} from "react-icons/fa6";
import classes from "./SingleProduct.module.css";
import ProductsCard from "./ProductsCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchReviews } from "../../redux/reviewSlice";
import { fetchProducts } from "../../redux/productSlice";
import { addReview } from "../../redux/reviewSlice";

import { FaStar, FaRegStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";


const SingleProduct = ({ addToWishlist }) => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products); // Get all products from Redux
    const product = products.find((p) => p.id === id); // Find product by ID
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { reviews, loading, error } = useSelector((state) => state.reviews);
    const user = useSelector((state) => state.auth.user);
    // console.log("User from Redux:", user); 

    const averageRating = useSelector((state) => state.reviews.averageRating);

    const [activeTab, setActiveTab] = useState("description");

    const [mainImage, setMainImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (!product) return; // Prevents errors if product is null or undefined
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setIsInCart(cart.some((item) => item?.id === product?.id));
    }, [product]);

    useEffect(() => {
        if (product && product.images?.length > 0) {
            setMainImage(product.images[0]);
            setCurrentIndex(0);
        }
    }, [product]);

    // useEffect(() => {
    //     console.log("User from Redux:", user);
    //     console.log("User token from Redux:", user?.token); // Debug here
    // }, [user]);


    useEffect(() => {
        if (product) {
            let viewedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

            // Remove the current product from the list (if it exists)
            viewedProducts = viewedProducts.filter((p) => p.id !== product.id);

            // Add the current product to the front of the list
            viewedProducts.unshift({
                id: product.id,
                name: product.name,
                image: product.images[0],
                price: product.discount_price || product.price,
            });

            // Keep only the last 6 products (remove the oldest if more than 6)
            if (viewedProducts.length > 6) {
                viewedProducts = viewedProducts.slice(0, 6); // Keep only first 6 items
            }

            // Save updated list to local storage
            localStorage.setItem("recentlyViewed", JSON.stringify(viewedProducts));

            // Update state
            setRecentlyViewed(viewedProducts);
        }
    }, [id]); // ✅ Updates when the product ID changes


    useEffect(() => {
        if (id) {
            dispatch(fetchProducts(id));
            dispatch(fetchReviews(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (!product) return;
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(wishlist.some((item) => item.id === product.id));
    }, [product]);

    const handleWishlist = () => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (isWishlisted) {
            wishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
            wishlist.push(product);
        }
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsWishlisted(!isWishlisted);
        if (addToWishlist) addToWishlist(product);
    };

    // Count total reviews per rating
    const ratingCounts = [0, 0, 0, 0, 0]; // [1★, 2★, 3★, 4★, 5★]
    reviews.forEach((review) => ratingCounts[review.rating - 1]++);

    const handleRatingClick = (star) => {
        setRating(star);
    };


    const handleAddToCart = () => {
        if (!product) return; // Prevent errors
        // console.log("product",product);


        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = cart.findIndex((item) => item.id === product.id);

        if (existingItemIndex !== -1) {
            // If product exists, update quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // If new product, add full details
            cart.push({
                id: product.id,
                name: product.name,
                price: product.discount_price || product.price,
                quantity: quantity,
                img: product.images.length > 0 ? product.images[0] : "", // ✅ Store only the first image
            });
            console.log("cart", cart);

        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setIsInCart(true); // ✅ Update button text
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("User before check:", user);
        console.log("User token before check:", user?.token);

        if (!user || !user.token) {
            // alert("Please log in to add a review.");
            navigate("/my-account");
            return;
        }

        if (rating === 0 || comment.trim() === "") {
            alert("Please add a rating and review before submitting.");
            return;
        }

        const reviewData = {
            product_id: id,
            rating,
            comment,
        };

        dispatch(addReview({ reviewData }))
            .unwrap()
            .then(() => {
                // alert("Review added successfully!");
                setRating(0);
                setComment("");


                // ✅ Fetch updated reviews from the server
                dispatch(fetchReviews(id));

            })
            .catch((error) => {
                console.error("Error adding review:", error);
                alert(error || "Failed to add review.");
            });
    };



    if (!product) return <p>Loading product...</p>;


    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);


    return (
        <>
            <div className={classes.productContainer}>
                <div className={classes.mobView} style={{ display: "flex" }}>
                    {/* Left Side: Image Gallery */}
                    <div className={classes.leftSide}>

                        {mainImage && (
                            <img
                                src={`http://localhost:5000/${mainImage}`}
                                alt="Main"
                                className={classes.mainImage}
                            />

                        )}


                        <div className={classes.thumbnailContainer}>
                            {product.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000/${img}`}
                                    alt={`Thumbnail ${index}`}
                                    className={`${classes.thumbnail} ${mainImage === img ? classes.activeThumbnail : ""
                                        }`}
                                    onClick={() => {
                                        setMainImage(img);
                                        setCurrentIndex(index);
                                    }}
                                />

                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className={classes.rightSide}>
                        <h2 className={classes.productName}>{product.name}</h2>

                        <p className={classes.sku} style={{ display: "flex", alignItems: "center", fontSize: "11px", fontWeight: "500" }}>
                            {/* <FaStar /> */}
                            <h1 style={{ fontSize: "11px" }}><FaStar /> {averageRating ? averageRating.toFixed(2) : "0.00 "}</h1>
                            <p style={{ fontSize: "11px", paddingLeft: "5px" }}> ({reviews.length})</p>


                            <span style={{ color: "gray", fontSize: "13px", paddingLeft: "15px" }}>SKU:</span> {product.SKU}
                        </p>
                        <div className={classes.priceContainer}>
                            {product.discount_price ? (
                                <>
                                    <span className={classes.discountPrice}>
                                        ${product.discount_price}
                                    </span>
                                    <span className={classes.originalPrice}>${product.price}</span>
                                </>
                            ) : (
                                <span className={classes.normalPrice}>${product.price}</span>
                            )}
                        </div>
                        <p className={classes.productStatus}>
                            {product.product_status.charAt(0).toUpperCase() +
                                product.product_status.slice(1)}
                        </p>
                        <p className={classes.shortDesc}>{product.short_desc}</p>

                        {/* Quantity Selector */}
                        <div className={classes.quantityContainer}>
                            <div className={classes.quantitySelector}>
                                <button onClick={decreaseQuantity} className={classes.quantityBtn}>
                                    -
                                </button>
                                <span className={classes.quantity}>{quantity}</span>
                                <button onClick={increaseQuantity} className={classes.quantityBtn}>
                                    +
                                </button>
                            </div>
                            <button className={classes.addToCart} onClick={handleAddToCart} disabled={isInCart}>
                                {isInCart ? "ADDED TO CART" : "ADD TO CART"}
                            </button>
                        </div>

                        {/* Wishlist Button */}
                        {/* <button className={classes.wishlistBtn} onClick={handleWishlist}>
                            {isWishlisted ? (
                                <FaHeart className={classes.heartIcon} />
                            ) : (
                                <FaRegHeart className={classes.heartIcon} />
                            )}
                            {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
                        </button> */}
                        <button className={classes.wishlistBtn} onClick={handleWishlist}>
                            {isWishlisted ? <GoHeartFill className={classes.heartIcon} /> : <GoHeart className={classes.heartIcon} />}
                            {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
                        </button>

                        <div className={classes.productlistMessage}>
                            <ul>
                                <li><LuBadgeCheck /> <span> Price match promise</span></li>
                                <li><BsBox /> <span> Free delivery on all orders</span></li>
                                <li><LuLock /> <span> Safe & secure transaction</span></li>
                                <li><LuRotateCcw /> <span> Extended return policy</span></li>
                            </ul>
                        </div>

                        <div className={classes.shareContainer}>
                            <p>Share this product:</p>
                            <ul className={classes.shareIcons}>
                                <li><FaFacebookF /></li>
                                <li><FaTwitter /></li>
                                <li><FaPinterest /></li>
                                <li><FaLinkedinIn /></li>
                                <li><FaWhatsapp /></li>
                            </ul>
                        </div>
                    </div>

                    {/* Recently Viewed Products */}
                    <div className={classes.recentlyViewed}>
                        <h3>Recently Viewed</h3>
                        {recentlyViewed.length > 0 ? (
                            <div className={classes.recentlyViewedList}>
                                {recentlyViewed.map((item) => (
                                    <div key={item.id} className={classes.recentlyViewedItem}>
                                        <Link to={`/product/${item.id}`} style={{ width: "25%", height: "100%", backgroundColor: "#FAFAFA" }}>
                                            <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                                        </Link>

                                        <div style={{ width: "70%" }}>

                                            <Link to={`/product/${item.id}`}><p>{item.name}</p>      </Link>

                                            {item.discount_price ? (
                                                <>
                                                    <h3 className={classes.discountPrice}>
                                                        ${item.discount_price}
                                                    </h3>
                                                    <span className={classes.originalPrice}>${item.price}</span>
                                                </>
                                            ) : (
                                                <p className={classes.normalPrice}>${item.price}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No recently viewed products</p>
                        )}
                    </div>
                </div>
            </div>






            <div className={classes.productTabs}>
                {/* Tabs */}
                <div className={classes.tabs}>
                    {/* <button onClick={() => setActiveTab("description")} className={classes.descTab}>Description</button>
                    <button onClick={() => setActiveTab("reviews")} className={classes.reviewTab}>Reviews</button> */}
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`${classes.descTab} ${activeTab === "description" ? classes.activeTab : ""}`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`${classes.reviewTab} ${activeTab === "reviews" ? classes.activeTab : ""}`}
                    >
                        Reviews ({reviews.length})
                    </button>
                </div>

                {/* Description Tab */}
                {activeTab === "description" && (
                    <div className={classes.descriptionSection}>
                        {/* <h3>Description</h3> */}
                        <p>{product.long_desc}</p>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (


                    <>
                        <div className={classes.reviewsSection}>
                            <h3>{reviews.length} reviews for {product?.name}</h3>


                            <div className={classes.ratingSummary}>
                                <h1>{averageRating ? averageRating.toFixed(2) : "0.00"}</h1>

                                <div className={classes.stars}>
                                    <div>
                                        {/* {"★".repeat(Math.floor(averageRating))}
                                        {averageRating % 1 !== 0 && "☆"} */}

                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}>
                                                {index < Math.floor(averageRating) ? <FaStar color="#FACC15" /> : <FaStar color="#D1D5DB" />}
                                            </span>
                                        ))}
                                    </div>
                                    <p>Average of {reviews.length} reviews</p>

                                </div>

                                <div className={classes.ratingBreakdown}>
                                    {ratingCounts.map((count, index) => (
                                        <div key={index} className={classes.ratingRow}>
                                            <span>{5 - index} <FaStar color="#FACC15" /></span>
                                            <div className={classes.progressBar}>
                                                <div style={{ width: `${(count / reviews.length) * 100}%` }}></div>
                                            </div>
                                            <span>{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            {loading && <p>Loading reviews...</p>}
                            {error && <p>Error fetching reviews: {error}</p>}
                            {reviews.length === 0 ? (
                                <p>No reviews yet.</p>
                            ) : (
                                <ul className={classes.reviewsList}>
                                    {reviews.map((review) => (
                                        <li key={review.id || Math.random()} className={classes.reviewItem}>
                                            <div>
                                                <strong>{review.user_name}</strong> — {new Date(review.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}

                                                <div className={classes.stars}>
                                                    {/* {"★".repeat(review.rating)}
                                                    {"☆".repeat(5 - review.rating)} */}
                                                    {[...Array(5)].map((_, index) => (
                                                        <span key={index}>
                                                            {index < review.rating ? (
                                                                <FaStar color="#FACC15" />
                                                            ) : (
                                                                <FaStar color="#D1D5DB" />
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p>{review.comment}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>




                        <div className={classes.addReview}>
                            <h3>Add a Review</h3>
                            <form onSubmit={handleSubmit}>
                                <label>Your Rating *</label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            style={{ cursor: "pointer", color: rating >= star ? "#FACC15" : "#D1D5DB" }}
                                            onClick={() => setRating(star)}
                                        >
                                            <FaStar />
                                        </span>
                                    ))}
                                </div>

                                <label>Your Review *</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                ></textarea>

                                <button type="submit">Submit Review</button>
                            </form>
                        </div>
                    </>



                )}
            </div>
        </>
    );
};

export default SingleProduct;






