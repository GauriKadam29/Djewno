



import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // ❤️ Wishlist Icons
import classes from "./ProductModal.module.css";
import { LuBadgeCheck, LuLock, LuRotateCcw } from "react-icons/lu";
import { BsBox } from "react-icons/bs";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GoHeart, GoHeartFill } from "react-icons/go";


const ProductModal = ({ product, onClose, addToWishlist }) => {
    const [mainImage, setMainImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (!product) return; // Prevents errors if product is null or undefined
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setIsInCart(cart.some((item) => item?.id === product?.id));
    }, [product]);


    // const handleAddToCart = () => {
    //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //     if (!cart.some((item) => item.id === product.id)) {
    //         cart.push({ ...product, quantity });
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //         setIsInCart(true);
    //     }
    // };

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




    const { reviews, loading } = useSelector((state) => state.reviews);

    const averageRating = useSelector((state) => state.reviews.averageRating);


    useEffect(() => {
        if (product && product.images?.length > 0) {
            setMainImage(product.images[0]); // ✅ Set first image as default
            setCurrentIndex(0); // ✅ Reset index when new product is opened
        }
    }, [product]);

    useEffect(() => {
        if (!product) return;
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(wishlist.some((item) => item.id === product.id));
    }, [product]);

    if (!product) return null; // ✅ Prevent crash if product is null


    

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


    // ✅ Handle Next Image
    const handleNextImage = () => {
        if (currentIndex < product.images.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setMainImage(product.images[newIndex]);
        }
    };

    // ✅ Handle Previous Image
    const handlePrevImage = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setMainImage(product.images[newIndex]);
        }
    };

    // ✅ Handle Quantity Increment
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // ✅ Handle Quantity Decrement
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // ✅ Handle Wishlist Toggle


    return (
        <div className={classes.modalOverlay}>
            <div className={classes.modalContent}>
                {/* Close Button */}
                <button className={classes.closeBtn} onClick={onClose}>×</button>

                {/* Left Side: Lightbox Image Gallery */}
                <div className={classes.leftSide}>
                    {/* ✅ Back Arrow */}
                    <button className={classes.arrow} onClick={handlePrevImage} disabled={currentIndex === 0}>
                        <AiOutlineLeft />
                    </button>

                    {/* Main Image */}
                    {mainImage && (
                        <img src={`http://localhost:5000/${mainImage}`} alt="Main" className={classes.mainImage} />
                    )}

                    {/* ✅ Next Arrow */}
                    <button className={classes.arrow} onClick={handleNextImage} disabled={currentIndex === product.images.length - 1}>
                        <AiOutlineRight />
                    </button>

                    <div className={classes.thumbnailContainer}>
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${img}`}
                                alt={`Thumbnail ${index}`}
                                className={`${classes.thumbnail} ${mainImage === img ? classes.activeThumbnail : ""}`}
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ fontSize: "11px" }}><FaStar /> {averageRating ? averageRating.toFixed(2) : "0.00 "}</h1>
                        <p style={{ fontSize: "11px", paddingLeft: "5px" }}> ({reviews.length})</p>
                        <p style={{ fontSize: "11px", fontWeight: "600", marginLeft: "10px" }}><span style={{ color: "gray", fontSize: "13px", fontWeight: "400" }}>SKU:</span> {product.SKU}</p>
                    </div>
                    <div className={classes.priceContainer}>
                        {product.discount_price ? (
                            <>
                                <span className={classes.discountPrice}>${product.discount_price}</span>
                                <span className={classes.originalPrice}>${product.price}</span>
                            </>
                        ) : (
                            <span className={classes.normalPrice}>${product.price}</span>
                        )}
                    </div>
                    {/* <p className={classes.productStatus}>{product.product_status}</p> */}
                    <p className={classes.productStatus}>
                        {product.product_status.charAt(0).toUpperCase() + product.product_status.slice(1)}
                    </p>

                    <p className={classes.shortDesc}>{product.short_desc}</p>

                    {/* Quantity Selector */}
                    <div className={classes.quantityContainer}>
                        <div className={classes.quantitySelector}>
                            <button onClick={decreaseQuantity} className={classes.quantityBtn}>-</button>
                            <span className={classes.quantity}>{quantity}</span>
                            <button onClick={increaseQuantity} className={classes.quantityBtn}>+</button>
                        </div>
                        <div style={{ width: "70%" }}>
                            {/* <button className={classes.addToCart}>ADD TO CART</button> */}
                            <button className={classes.addToCart} onClick={handleAddToCart} disabled={isInCart}>
                                {isInCart ? "ADDED TO CART" : "ADD TO CART"}
                            </button>


                        </div>
                    </div>

                    {/* Wishlist Button */}
                    {/* <button className={classes.wishlistBtn} onClick={handleWishlist}>
                        {isWishlisted ? <GoHeartFill className={classes.heartIcon} /> : <GoHeart className={classes.heartIcon} />}
                        {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
                    </button> */}
                    {/* Wishlist Button Inside Modal */}
                    {/* <div className={classes.wishlistBtn} onClick={handleWishlistClick}>
                        {isWishlisted ? <FaHeart className={classes.redHeart} /> : <FaRegHeart className={classes.emptyHeart} />}
                    </div> */}
                    <button className={classes.wishlistBtn} onClick={handleWishlist}>
                        {isWishlisted ? <GoHeartFill className={classes.heartIcon} /> : <GoHeart className={classes.heartIcon} />}
                        {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
                    </button>

                    {/* Add to Cart Button */}
                    <div className={classes.productlistMessage}>
                        <ul>
                            <li><LuBadgeCheck /> <span> Price match promise</span>  </li>
                            <li><BsBox /> <span> Free delivery on all orders</span></li>
                            <li><LuLock /> <span>Safe & secure transaction</span></li>
                            <li> <LuRotateCcw /> <span>Extended Christmas return policy</span></li>
                        </ul>

                    </div>
                    <div style={{ display: "flex", alignItems: "center", paddingTop: "20px", alignContent: "center" }}>
                        <p style={{ fontSize: "11px", marginRight: "20px" }}>Share this product:</p>
                        <div>
                            <ul style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <li><FaFacebookF /></li>
                                <li><FaTwitter /></li>
                                <li><FaPinterest /></li>
                                <li><FaLinkedinIn /></li>
                                <li><FaWhatsapp /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;


// import { useState, useEffect } from "react";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import { FaHeart, FaRegHeart } from "react-icons/fa"; // ❤️ Wishlist Icons
// import classes from "./ProductModal.module.css";
// import { LuBadgeCheck, LuLock, LuRotateCcw } from "react-icons/lu";
// import { BsBox } from "react-icons/bs";
// import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa6";
// import { FaPinterest } from "react-icons/fa6";
// import { FaStar } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { GoHeart, GoHeartFill } from "react-icons/go";

// const ProductModal = ({ product, onClose, addToWishlist }) => {
//     const [mainImage, setMainImage] = useState("");
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [isWishlisted, setIsWishlisted] = useState(false);
//     const [isInCart, setIsInCart] = useState(false);

//     useEffect(() => {
//         if (!product) return; // Prevents errors if product is null or undefined
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
//         setIsInCart(cart.some((item) => item?.id === product?.id));
//     }, [product]);

//     useEffect(() => {
//         if (!product) return;
//         const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//         setIsWishlisted(wishlist.some((item) => item.id === product.id));
//     }, [product]);

//     const handleAddToCart = () => {
//         if (!product) return;
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         const existingItemIndex = cart.findIndex((item) => item.id === product.id);
//         if (existingItemIndex !== -1) {
//             cart[existingItemIndex].quantity += quantity;
//         } else {
//             cart.push({
//                 id: product.id,
//                 name: product.name,
//                 price: product.discount_price || product.price,
//                 quantity: quantity,
//                 img: product.images.length > 0 ? product.images[0] : "",
//             });
//         }
//         localStorage.setItem("cart", JSON.stringify(cart));
//         setIsInCart(true);
//     };

//     const { reviews, loading } = useSelector((state) => state.reviews);
//     const averageRating = useSelector((state) => state.reviews.averageRating);

//     useEffect(() => {
//         if (product && product.images?.length > 0) {
//             setMainImage(product.images[0]);
//             setCurrentIndex(0);
//         }
//     }, [product]);

//     if (!product) return null;

//     const handleNextImage = () => {
//         if (currentIndex < product.images.length - 1) {
//             const newIndex = currentIndex + 1;
//             setCurrentIndex(newIndex);
//             setMainImage(product.images[newIndex]);
//         }
//     };

//     const handlePrevImage = () => {
//         if (currentIndex > 0) {
//             const newIndex = currentIndex - 1;
//             setCurrentIndex(newIndex);
//             setMainImage(product.images[newIndex]);
//         }
//     };

//     const increaseQuantity = () => {
//         setQuantity(quantity + 1);
//     };

//     const decreaseQuantity = () => {
//         if (quantity > 1) setQuantity(quantity - 1);
//     };

//     const handleWishlist = () => {
//         let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//         if (isWishlisted) {
//             wishlist = wishlist.filter((item) => item.id !== product.id);
//         } else {
//             wishlist.push(product);
//         }
//         localStorage.setItem("wishlist", JSON.stringify(wishlist));
//         setIsWishlisted(!isWishlisted);
//         if (addToWishlist) addToWishlist(product);
//     };

//     return (
//         <div className={classes.modalOverlay}>
//             <div className={classes.modalContent}>
//                 <button className={classes.closeBtn} onClick={onClose}>×</button>
//                 <div className={classes.leftSide}>
//                     <button className={classes.arrow} onClick={handlePrevImage} disabled={currentIndex === 0}>
//                         <AiOutlineLeft />
//                     </button>
//                     {mainImage && (
//                         <img src={`http://localhost:5000/${mainImage}`} alt="Main" className={classes.mainImage} />
//                     )}
//                     <button className={classes.arrow} onClick={handleNextImage} disabled={currentIndex === product.images.length - 1}>
//                         <AiOutlineRight />
//                     </button>
//                     <div className={classes.thumbnailContainer}>
//                         {product.images?.map((img, index) => (
//                             <img
//                                 key={index}
//                                 src={`http://localhost:5000/${img}`}
//                                 alt={`Thumbnail ${index}`}
//                                 className={`${classes.thumbnail} ${mainImage === img ? classes.activeThumbnail : ""}`}
//                                 onClick={() => {
//                                     setMainImage(img);
//                                     setCurrentIndex(index);
//                                 }}
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 <div className={classes.rightSide}>
//                     <h2 className={classes.productName}>{product.name}</h2>
//                     <div className={classes.priceContainer}>
//                         {product.discount_price ? (
//                             <>
//                                 <span className={classes.discountPrice}>${product.discount_price}</span>
//                                 <span className={classes.originalPrice}>${product.price}</span>
//                             </>
//                         ) : (
//                             <span className={classes.normalPrice}>${product.price}</span>
//                         )}
//                     </div>
//                     <p className={classes.shortDesc}>{product.short_desc}</p>
//                     <div className={classes.quantityContainer}>
//                         <div className={classes.quantitySelector}>
//                             <button onClick={decreaseQuantity} className={classes.quantityBtn}>-</button>
//                             <span className={classes.quantity}>{quantity}</span>
//                             <button onClick={increaseQuantity} className={classes.quantityBtn}>+</button>
//                         </div>
//                         <button className={classes.addToCart} onClick={handleAddToCart} disabled={isInCart}>
//                             {isInCart ? "ADDED TO CART" : "ADD TO CART"}
//                         </button>
//                     </div>
//                     <button className={classes.wishlistBtn} onClick={handleWishlist}>
//                         {isWishlisted ? <GoHeartFill className={classes.heartIcon} /> : <GoHeart className={classes.heartIcon} />}
//                         {isWishlisted ? " Added to Wishlist" : " Add to Wishlist"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductModal;

