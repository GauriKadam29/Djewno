
import classes from "./Elegance.module.css";
import { useState, useEffect } from "react";


const Elegance = () => {
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
        <div className={classes.elegance}>
            <h6>CYBER MONDAY SALE</h6>
            <h3>Elegance Redefined: Discover</h3>
            <h4>Exquisite Jewellery Creations</h4>
            <p>Redefining Elegance with Unique Charms...</p>
            <div style={{display:"flex",alignItems:"center",padding:"20px 0"}}>
                <p style={{ fontSize: "10px", fontWeight: "600", color:"#868E96" }}>The campaign is over. {" "}
                    <span style={{ margin: "5px", backgroundColor: "white", padding: "3px", border: "1px solid #F1F3F5", fontSize: "14px",color:"black" }}> {timeLeft.days}  {" "} </span> :
                    <span style={{ margin: "5px", backgroundColor: "white", padding: "3px", border: "1px solid #F1F3F5", fontSize: "14px",color:"black" }}> {timeLeft.hours}  {" "} </span> :
                    <span style={{ margin: "5px", backgroundColor: "white", padding: "3px", border: "1px solid #F1F3F5", fontSize: "14px",color:"black" }}> {timeLeft.minutes}  {" "}</span>:
                    <span style={{ margin: "5px", backgroundColor: "white", padding: "3px", border: "1px solid #F1F3F5", fontSize: "14px",color:"black" }}> {timeLeft.seconds} {" "}</span>
                </p>
            </div>
        </div>
    )
}

export default Elegance