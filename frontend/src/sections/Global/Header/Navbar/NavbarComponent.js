






import classes from './NavbarComponent.module.css'
import { useNavigate } from "react-router-dom";
import logo from '../../../../assets/logo.webp'
import { SlMenu } from "react-icons/sl";
import { RiSearchLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import { RiPokerHeartsLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../redux/authSlice";
import { fetchSearchResults } from "../../../../redux/searchSlice";
import BottomNav from './BottomNav'; // adjust path based on file location




const NavbarComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const searchResults = useSelector((state) => state.search.searchResults);

    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // for main nav sidebar
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false)

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
    };

    // console.log("Search results:", searchResults);

    const goToProfile = () => {
        navigate("/profile");
        setMenuOpen(false);
    };


    const handleLogout = () => {
        localStorage.removeItem("wishlist");
        // localStorage.removeItem("cart");
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/my-account");
    };

    const [timeLeft, setTimeLeft] = useState({
        days: 70,
        hours: 13,
        minutes: 8,
        seconds: 0,
    });

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
    return (
        <>
            <div className={classes.head}>
                <div className={classes.logo} onClick={() => navigate("/")}>
                    <button onClick={() => setSidebarOpen(true)}><SlMenu /></button>

                    <img src={logo} alt="" />

                </div>

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
                <div className={classes.manageIcon}>
                    <p className={classes.hideOnMobile} onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }}><RiUserLine /></p>
                    <p className={classes.hideOnMobile} onClick={() => navigate("/wishlist")} style={{ cursor: "pointer" }}><RiPokerHeartsLine /></p>
                    <p onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}><FiShoppingCart /></p>

                    {/* Conditional Login/Logout Menu */}
                    {menuOpen && (
                        <div className={classes.dropdownMenu}>
                            <button onClick={goToProfile}>Profile</button>
                            {user ? (
                                <button onClick={handleLogout}>Logout</button>
                            ) : (
                                <button onClick={() => navigate("/my-account")}>Login</button>
                            )}
                        </div>
                    )}

                </div>
            </div>


            <div className={classes.header}>
                <div className={classes.navBar}>
                    <Navbar expand="lg">
                        <Navbar.Collapse className={classes.nav}>
                            <Nav className={classes.navMenu}>
                                <NavLink to="/">HOME</NavLink>
                                <NavLink to="/shop">SHOP</NavLink>
                                <NavLink to="/earrings">EARRINGS</NavLink>
                                <NavLink to='/necklaces'>NECKLACES</NavLink>
                                <NavLink to='/contact'>CONTACT</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>


                <div className={classes.midnightSales}>
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>MIDNIGHT SALES {" "}
                        <span style={{ margin: "5px", backgroundColor: "#F8F9FA", padding: "3px", border: "1px solid #F1F3F5", fontSize: "13px" }}> {timeLeft.days}  {" "} </span> :
                        <span style={{ margin: "5px", backgroundColor: "#F8F9FA", padding: "3px", border: "1px solid #F1F3F5", fontSize: "13px" }}> {timeLeft.hours}  {" "} </span> :
                        <span style={{ margin: "5px", backgroundColor: "#F8F9FA", padding: "3px", border: "1px solid #F1F3F5", fontSize: "13px" }}> {timeLeft.minutes}  {" "}</span>:
                        <span style={{ margin: "5px", backgroundColor: "#F8F9FA", padding: "3px", border: "1px solid #F1F3F5", fontSize: "13px" }}> {timeLeft.seconds} {" "}</span>
                        {/* <span style={{ fontSize: "18px" }}><IoIosArrowDown /></span> */}
                    </p>
                </div>
            </div>

            <BottomNav />


            {sidebarOpen && (
                <>
                    <div className={classes.backdrop} onClick={() => setSidebarOpen(false)}></div>
                    <div className={classes.offcanvas}>
                        <button className={classes.closeBtn} onClick={() => setSidebarOpen(false)}>✕</button>
                        <nav className={classes.offcanvasNav}>
                            <NavLink to="/" onClick={() => setSidebarOpen(false)}>HOME</NavLink>
                            <NavLink to="/shop" onClick={() => setSidebarOpen(false)}>SHOP</NavLink>
                            <NavLink to="/earrings" onClick={() => setSidebarOpen(false)}>EARRINGS</NavLink>
                            <NavLink to="/necklaces" onClick={() => setSidebarOpen(false)}>NECKLACES</NavLink>
                            <NavLink to="/contact" onClick={() => setSidebarOpen(false)}>CONTACT</NavLink>
                        </nav>
                    </div>
                </>
            )}


        </>


    )
}
export default NavbarComponent
