


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Added loading state

    const handleClick = async () => {
        if (isProcessing) return; // Prevent multiple clicks while processing

        if (!isEmailSent) {
            setMessage("");
            setIsProcessing(true); // Show loading state

            try {
                const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                setMessage(data.message || "Check your email for reset instructions.");
                
                if (response.ok) {
                    setIsEmailSent(true);
                }
            } catch (error) {
                setMessage("Something went wrong. Please try again.");
            } finally {
                setIsProcessing(false); // Stop loading state
            }
        } else {
            navigate("/reset-password/:resetToken");
        }
    };

    return (
        <div style={{ margin: "40px" }} className={classes.mobileView}>
            <p style={{ paddingBottom: "20px" }}>
                Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
            </p>
            <label style={{ display: "block", marginBottom: "10px", fontSize: "14px" }}>Email *</label>
            <div style={{display:"flex",flexDirection:"column"}}>
            <input
            className={classes.inp}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // style={{ width: "50%", padding: "8px", marginBottom: "15px"  }}
            />
            <button  
            className={classes.btn}
                onClick={handleClick} 
                disabled={isProcessing} // Disable button while processing
                // style={{ padding: "10px 20px", cursor: "pointer", width:"10%", border:"none", fontWeight:"500", cursor: isProcessing ? "not-allowed" : "pointer" }}
            >
                {isProcessing ? "Processing..." : isEmailSent ? "Proceed to Reset Password" : "Send Reset Link"}
            </button>
            </div>
            {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
