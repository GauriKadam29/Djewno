
import classes from './Contact.module.css'
import contactBanner from '../../assets/contact-banner.webp'
import { CiLocationOn } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { CiBadgeDollar } from "react-icons/ci";
import { SlEarphonesAlt } from "react-icons/sl";
import { MdOutlinePayments } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
const Contact = () => {
    return (
        <div className={classes.contact}>
            <div className={classes.contactBanner}>
                <img src={contactBanner} alt="" />
            </div>
            <div className={classes.contactContent} >
                <div className={classes.contactLeft}>
                    <div className={classes.ourStores}>

                        <h3>Our Stores</h3>
                        <p>On dekande mydurtad mora även om skurkstat. Semirade timaheten rena. Radiogen pasam inte loba även om prerade i garanterad traditionell specialitet till bebel. Ev is sönde. Tun gps-väst att epiligt. Diliga tresk dira. Ens biov dijevis.</p>
                    </div>
                    <div className={classes.storeLocations}>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <SlLocationPin />

                            <div>
                                <h5>United States</h5>
                                <h4>United States</h4>
                                <p style={{ color: "gray", fontSize: "13px" }}>205 Middle Road, 2nd Floor, New York</p>
                                <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
                                    <p style={{ borderBottom: "1px solid gray", fontSize: "14px", fontWeight: "600" }}>+02 1234 567 88</p>
                                    <p style={{ borderBottom: "1px solid gray", fontSize: "13px", fontWeight: "600" }}>info@example.com</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <SlLocationPin />

                            <div>
                                <h5>NEDHERLANDS</h5>
                                <h4>Amsterdam</h4>
                                <p style={{ color: "gray", fontSize: "13px" }}>205 Middle Road, 2nd Floor, New York</p>
                                <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
                                    <p style={{ borderBottom: "1px solid gray", fontSize: "14px", fontWeight: "600" }}>+02 1234 567 88</p>
                                    <p style={{ borderBottom: "1px solid gray", fontSize: "13px", fontWeight: "600" }}>info@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "20px", paddingTop: "8%" }}>
                        <p style={{ fontSize: "11px", color: "gray", fontWeight: "500" }}>Follow us:</p>

                        <p><FaFacebook /></p>
                        <p><FaTwitter /></p>
                        <p><FaYoutube /></p>
                        <p><FaInstagram /></p>

                    </div>

                </div>
                <div className={classes.contactRight}>
                    <p style={{ fontSize: "12px", color: "#B3BAC2", letterSpacing: "0.4px", lineHeight: "20px", fontWeight: "400" }}>On dekande mydurtad mora även om skurkstat. Semirade timaheten rena. Radiogen pasam inte loba även om prerade i garanterad traditionell specialitet till bebel.</p>
                    <form action="">
                        <div style={{ display: "flex", gap: "25px", width: "100%" }}>
                            <div style={{ width: "50%" }}>
                                <label htmlFor="">Your Name</label>
                                <div><input type="text" /></div>
                            </div>
                            <div style={{ width: "50%" }}>
                                <label htmlFor="">Your Email</label>
                                <div><input type="text" /></div>

                            </div>
                        </div>
                        <label htmlFor="">Subject</label>
                        <div><input type="text" /></div>

                        <label htmlFor="">Your Message</label>
                        <div><textarea name="" id=""></textarea></div>

                        <button>SEND MESSAGE</button>

                    </form>
                </div>

            </div>

            <div className={classes.contactFacility}>
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <span><BsBoxSeam /></span>
                    <div>
                        <h5>Free Shipping</h5>
                        <p>Free shiping for orders over $130</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <span>
                        {/* <CiBadgeDollar /> */}
                        <BsCurrencyDollar />

                    </span>
                    <div>
                        <h5>Money Guarantee</h5>
                        <p>Within 30 days for an excahnge</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <span>
                        <SlEarphonesAlt />

                    </span>
                    <div>
                        <h5>Online Support</h5>
                        <p>24 hours a day, 7 days a week</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <span>
                        <MdOutlinePayments />

                    </span>
                    <div>
                        <h5>Flexible Payment</h5>
                        <p>Pay with multiple Credit Cards</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact