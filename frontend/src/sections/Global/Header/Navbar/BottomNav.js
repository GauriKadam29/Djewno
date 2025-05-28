// // BottomNav.js
// import { useNavigate } from "react-router-dom";
// import { RiSearchLine, RiUserLine, RiPokerHeartsLine } from "react-icons/ri";
// import { FiShoppingCart } from "react-icons/fi";
// import { SlMenu } from "react-icons/sl";
// import { FiShoppingBag } from "react-icons/fi";
// import { AiOutlineHome } from "react-icons/ai";
// import { BiCategory } from "react-icons/bi";
// import { FiHome } from "react-icons/fi";
// import { NavLink } from 'react-router-dom';
// import { useState } from "react";
// import Categories from "../../../Home/Categories/Categories";
// import { useSelector } from "react-redux";
// import classes from './BottomNav.module.css'; // create this CSS module

// const BottomNav = () => {
//     const navigate = useNavigate();
//     const [sidebarOpen, setSidebarOpen] = useState(false); // for main nav sidebar
//     const { categories, loading, error } = useSelector((state) => state.categories);
//     const { products } = useSelector((state) => state.products);

//     if (loading === "loading") return <p>Loading categories...</p>;
//     if (loading === "failed") return <p>Error: {error}</p>;


//     return (
//         <>
//             <div className={classes.bottomNav}>
//                 <div onClick={() => navigate("/")}>
//                     <FiHome />
//                     <span>Home</span>
//                 </div>
//                 <div onClick={() => navigate("/shop")}>
//                     <FiShoppingBag />
//                     <span>Store</span>
//                 </div>
//                 <div onClick={() => navigate("/products/search")}>
//                     <RiSearchLine />
//                     <span>Search</span>
//                 </div>

//                 <div onClick={() => setSidebarOpen(true)}>
//                     <BiCategory />
//                     <span>Categories</span>
//                 </div>

//                 <div onClick={() => navigate("/wishlist")}>
//                     <RiPokerHeartsLine />
//                     <span>Wishlist</span>
//                 </div>
//                 {/* <div onClick={() => navigate("/cart")}>
//                 <FiShoppingCart />
//                 <span>Cart</span>
//             </div> */}
//                 <div onClick={() => navigate("/my-account")}>
//                     <RiUserLine />
//                     <span>Account</span>
//                 </div>
//             </div>


//             {/* {sidebarOpen && (
//                 <>
//                     <div className={classes.backdrop} onClick={() => setSidebarOpen(false)}></div>
//                     <div className={classes.offcanvas}>
//                         <button className={classes.closeBtn} onClick={() => setSidebarOpen(false)}>✕</button>
//                         <nav className={classes.offcanvasNav}>
//                             <NavLink to="/" onClick={() => setSidebarOpen(false)}>HOME</NavLink>
//                             <NavLink to="/shop" onClick={() => setSidebarOpen(false)}>SHOP</NavLink>
//                             <NavLink to="/earrings" onClick={() => setSidebarOpen(false)}>EARRINGS</NavLink>
//                             <NavLink to="/necklaces" onClick={() => setSidebarOpen(false)}>NECKLACES</NavLink>
//                             <NavLink to="/contact" onClick={() => setSidebarOpen(false)}>CONTACT</NavLink>
//                         </nav>
//                     </div>
//                 </>
//             )} */}

//             {sidebarOpen && (
//                 <>
//                     <div className={classes.backdrop} onClick={() => setSidebarOpen(false)}></div>
//                     <div className={classes.offcanvas}>
//                         <button className={classes.closeBtn} onClick={() => setSidebarOpen(false)}>✕</button>

//                         <nav className={classes.offcanvasNav}>
//                             <h3 className={classes.offcanvasTitle}>Categories</h3>
//                             {categories.map((category) => (
//                                 <p
//                                     key={category.id}
//                                     className={classes.categoryLink}
//                                     onClick={() => {
//                                         navigate(`/category/${category.id}`);
//                                         setSidebarOpen(false);
//                                     }}
//                                 >
//                                     {category.name}
//                                 </p>
//                             ))}
//                         </nav>
//                     </div>
//                 </>
//             )}

//         </>
//     );
// };

// export default BottomNav;


import { useNavigate } from "react-router-dom";
import { RiSearchLine, RiUserLine, RiPokerHeartsLine } from "react-icons/ri";
import { FiShoppingCart, FiShoppingBag, FiHome } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import classes from './BottomNav.module.css';
import { fetchSearchResults } from "../../../../redux/searchSlice";


const BottomNav = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false); // for categories
    const [searchOpen, setSearchOpen] = useState(false); // for search
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const { categories, loading, error } = useSelector((state) => state.categories);
    const { products } = useSelector((state) => state.products);

    const searchResults = useSelector((state) => state.search.searchResults);


    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);
        console.log("Search term:", keyword);


        if (keyword.length > 1) {
            dispatch(fetchSearchResults(keyword));
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSeeAllProducts = () => {
        navigate(`/products/search?search=${searchTerm}`);
        setShowDropdown(false);
        setSearchOpen(false);
    };

    if (loading === "loading") return <p>Loading categories...</p>;
    if (loading === "failed") return <p>Error: {error}</p>;

    return (
        <>
            <div className={classes.bottomNav}>
                <div onClick={() => navigate("/")}>
                    <FiHome />
                    <span>Home</span>
                </div>
                <div onClick={() => navigate("/shop")}>
                    <FiShoppingBag />
                    <span>Store</span>
                </div>
                <div onClick={() => setSearchOpen(true)}>
                    <RiSearchLine />
                    <span>Search</span>
                </div>
                <div onClick={() => setSidebarOpen(true)}>
                    <BiCategory />
                    <span>Categories</span>
                </div>
                <div onClick={() => navigate("/wishlist")}>
                    <RiPokerHeartsLine />
                    <span>Wishlist</span>
                </div>
                <div onClick={() => navigate("/my-account")}>
                    <RiUserLine />
                    <span>Account</span>
                </div>
            </div>

            {/* Categories Offcanvas */}
            {sidebarOpen && (
                <>
                    <div className={classes.backdrop} onClick={() => setSidebarOpen(false)}></div>
                    <div className={classes.offcanvas}>
                        <button className={classes.closeBtn} onClick={() => setSidebarOpen(false)}>✕</button>
                        <nav className={classes.offcanvasNav}>
                            <h3 className={classes.offcanvasTitle}>Categories</h3>
                            {categories.map((category) => (
                                <p
                                    key={category.id}
                                    className={classes.categoryLink}
                                    onClick={() => {
                                        navigate(`/category/${category.id}`);
                                        setSidebarOpen(false);
                                    }}
                                >
                                    {category.name}
                                </p>
                            ))}
                        </nav>
                    </div>
                </>
            )}

            {/* Search Offcanvas */}
            {searchOpen && (
                <>
                    <div className={classes.backdrop} onClick={() => setSearchOpen(false)}></div>
                    <div className={classes.offcanvas}>
                        <button className={classes.closeBtn} onClick={() => setSearchOpen(false)}>✕</button>
                        {/* <div className={classes.searchBar}>
                            <div className={classes.searchIcon}><RiSearchLine /></div>
                            <input
                                type="text"
                                placeholder="Search for the product that suits you..."
                                value={searchTerm}
                                onChange={handleSearch}
                                onFocus={() => setShowDropdown(searchResults.length > 0)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            />
                            {showDropdown && (
                                <div className={classes.searchDropdown}>
                                    {searchResults.length > 0 ? (
                                        <>
                                            {searchResults.slice(0, 7).map((product) => (
                                                <p
                                                    key={product.id}
                                                    onClick={() => {
                                                        navigate(`/product/${product.id}`);
                                                        setSearchOpen(false);
                                                    }}
                                                >
                                                    {product.name}
                                                </p>
                                            ))}
                                            <button onClick={handleSeeAllProducts}>
                                                See All Products ({searchResults.length})
                                            </button>
                                        </>
                                    ) : (
                                        <p>No products found</p>
                                    )}
                                </div>
                            )}
                        </div> */}

                        <div className={classes.searchBar}>
                            <div className={classes.searchIcon}><RiSearchLine /></div>
                            {/* <input type="text" placeholder='Search for the product that suits you...' /> */}
                            <input
                                type="text"
                                placeholder="Search for the product that suits you..."
                                value={searchTerm}
                                onChange={handleSearch}
                                onFocus={() => setShowDropdown(searchResults.length > 0)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            />
                            {showDropdown && (
                                <div className={classes.searchDropdown}>
                                    {searchResults.length > 0 ? (
                                        <>
                                            {searchResults.slice(0, 7).map((product) => (
                                                <p
                                                    key={product.id}
                                                    onClick={() => navigate(`/product/${product.id}`)}
                                                >
                                                    {product.name}
                                                </p>
                                            ))}
                                            <button onClick={handleSeeAllProducts}>
                                                See All Products ({searchResults.length})
                                            </button>
                                        </>
                                    ) : (
                                        <p>No products found</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default BottomNav;
