import classes from './Footer.module.css';
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import visa from './../../../assets/visa.png'
import mastercard from './../../../assets/mastercard.webp'
import paypal from './../../../assets/paypal.webp'
import skrill from './../../../assets/skrill.webp'
import klarna from './../../../assets/klarna.webp'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            {/* <div className={classes.footerContainer}> */}
            <div className={classes.footerContent}>
                <div className={classes.aboutDjewno}>
                    <h5>ABOUT DJEWNO</h5>
                    <p>Thank you to the team at <span className={classes.djew}>Djewno</span> for allowing us to feature their beautiful imagery in this demo. Head over to their <span className={classes.offStore}>official store</span> to shop their latest collection.</p>
                    <div className={classes.socialIcons}>
                        {/* <div className={classes.socialIcons}> */}
                        <FaFacebookF />
                        <FaXTwitter />
                        <FaInstagram />
                        <FaPinterest />

                        {/* </div> */}
                    </div>
                </div>

                <div className={classes.getToKnowUs}>
                    <h5>Get to Know Us</h5>
                    <ul>
                        <li>Careers for Djewno</li>
                        <li>About Djewno</li>
                        <li>Inverstor Relations</li>
                        <li>Customer reviews</li>
                        <li>Social Responsibility</li>
                        <li>Store Locations</li>
                    </ul>
                </div>

                <div className={classes.letUsHelpYou}>
                    <h5>Let Us Help You</h5>
                    <ul>
                        <li>Accessibility Statement</li>
                        <li>Your Orders</li>
                        <li>Returns & Replacements</li>
                        <li>Shipping Rates & Policies</li>
                        <li>Privacy Policy</li>
                        <li>Terms and Conditions</li>
                    </ul>
                </div>

                <div className={classes.newsletter}>
                    <h5>NEWSLETTER</h5>
                    <p className={classes.subscribe}>Subscribe to get special offers, free giveaways and once-in-a-lifetime deals.</p>
                    <div>
                        <input type="text" name="" id="" placeholder='Enter your email address' />
                        <button>SEND</button>
                    </div>
                    <p className={classes.terms}>By subscribing you agree to our <span>Terms & Conditions and Privacy & Cookies Policy.</span></p>
                </div>
            </div>
            {/* </div> */}



            <div className={classes.copyright}>
                <div className={classes.left}>
                    <p>Copyright 2025 © Djewno WooCommerce WordPress Theme. All right reserved. Powered by <span>KLBTheme</span>.</p>
                </div>
                <div className={classes.right}>
                    <img src={visa} alt="" />
                    <img src={mastercard} alt="" />
                    <img src={paypal} alt="" />
                    <img src={skrill} alt="" />
                    <img src={klarna} alt="" />
                </div>

            </div>
        </footer>
    );
};

export default Footer;