import classes from "./Collection.module.css"
import { useNavigate } from "react-router-dom"
import brand1 from "../../../assets/brand-1.webp"
import brand2 from "../../../assets/brand-2.webp"
import brand3 from "../../../assets/brand-3.webp"
import brand4 from "../../../assets/brand-4.webp"
import brand5 from "../../../assets/brand-5.webp"
import brand6 from "../../../assets/brand-6.webp"
import brand7 from "../../../assets/brand-7.webp"
import brand8 from "../../../assets/brand-8.webp"




const Collection = () => {
    const navigate = useNavigate(); 
    return (
        <div className={classes.collection}>
            <div className={classes.facility}>
                <div>
                    <h5>EASY ECHANGES & RETURNS</h5>
                    <p>Exchange and refund only within 3 days</p>
                </div>
                <div className={classes.hideOnMobile}>
                    <h5>FREE SHIPPING EVERY DAY</h5>
                    <p>Next day until 9 PM, 7 days a weeks</p>
                </div>
                <div className={classes.hideOnMobile}>
                    <h5>FREE CLICK & COLLECT SERVICE</h5>
                    <p>From over 100 showrooms nationwide</p>
                </div>
                <div className={classes.hideOnMobile}>
                    <h5>8.7/10 FEEDBACK RATING</h5>
                    <p>Most preffered store with high score</p>
                </div>
            </div>








            <div className={classes.shopping}>
                <div onClick={() => navigate("/shop")} className={classes.shopLeft}>
                    <h1>One stop jewellery shopping</h1>
                    <p>Thoughtfully designed jewellery to wear everyday</p>
                    <h6>SHOP COLLECTION</h6>

                </div>
                <div onClick={() => navigate("/shop")} className={classes.shopRight}>
                    <h1>We have the jewellery for you</h1>
                    <p>The diamonds are real, but the magic in your eyes...</p>
                    <h6>SHOP COLLECTION</h6>

                </div>

            </div>



            <div className={classes.brands}>
                <img src={brand1} alt="" />
                <img src={brand2} alt="" />
                <img src={brand3} alt="" />
                <img src={brand4} alt="" /> 
                <img src={brand5} alt="" />
                <img src={brand6} alt="" />
                <img src={brand7} alt="" />
                <img src={brand8} alt="" />
            </div>
        </div>
    )
}

export default Collection