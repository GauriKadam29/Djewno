import classes from './TopbarTime.module.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

const TopbarTime = () => {
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
            <div className={classes.freeDelivery}>
                <div className={classes.notification}>
                    <p>UP TO 40% OFF EVERYTHING</p>
                    <p>30% OFF MOST LOVELED - NEW LINES ADDED</p>
                    <p>FREE DELIVERY FOR 3 ORDERS</p>
                </div>

                <div className={classes.timer}>
                    <p>20% Off Everything With a Min. Spend, Sale Ends In: {" "} 
                        {timeLeft.days} <span style={{ color: "gray" }}>Days</span> :{" "}
                        {timeLeft.hours} <span style={{ color: "gray" }}>Hrs</span> :{" "}
                        {timeLeft.minutes} <span style={{ color: "gray" }} >Mins</span> :{" "}
                        {timeLeft.seconds} <span style={{ color: "gray" }}>Secs</span>
                    </p>
                </div>

                <div className={classes.supportExpert}>
                    <div className={classes.supportLeft}>
                        <Link to="/about-us"><p>About Us</p></Link>
                        <Link to="/my-account"><p>my account</p></Link>
                        <Link to="/wishlist"><p>wishlist</p></Link>

                    </div>
                    <div className={classes.supportRight}>
                        <div style={{fontSize:"14px", color:"#535452"}}>  
                        <FiPhoneCall />

                        </div>

                        <p>Get Support From An Expert - <span style={{ fontWeight: "700", color:"black" }}>(1-844-916-0521)</span></p>
                        <select name="" id="">
                            <option value="">ENGLISH</option>
                            <option value="">SPANISH</option>
                            <option value="">GERMAN</option>
                        </select>
                        <select name="" id="">
                            <option value="">USD</option>
                            <option value="">INR</option>
                            <option value="">GBP</option>
                        </select>

                    </div>

                </div>
            </div>
        </>
    )
}

export default TopbarTime