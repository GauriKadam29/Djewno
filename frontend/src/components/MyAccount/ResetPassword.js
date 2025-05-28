



// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//     const [newPassword, setNewPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Extract token from URL query params
//     const searchParams = new URLSearchParams(location.search);
//     const resetToken = searchParams.get("token");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         if (!resetToken) {
//             setMessage("Invalid or missing reset token.");
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:5000/api/auth/reset-password", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ resetToken, newPassword }),
//             });

//             const data = await response.json();
//             setMessage(data.message);

//             if (response.ok) {
//                 setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
//             }
//         } catch (error) {
//             setMessage("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <label style={{ display: "block", marginBottom: "10px" }}>New Password:</label>
//                 <input 
//                     type="password" 
//                     value={newPassword} 
//                     onChange={(e) => setNewPassword(e.target.value)} 
//                     required 
//                     style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
//                 />
//                 <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>Reset Password</button>
//             </form>
//             {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
//         </div>
//     );
// };

// export default ResetPassword;


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const { resetToken } = useParams(); // Extract reset token from the URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!resetToken) {
            setMessage("Invalid or missing reset token.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resetToken, newPassword }), // Send token as required by backend
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                setTimeout(() => navigate("/my-account"), 2000); // Redirect to login after success
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ margin:"40px"}}>
            {/* <h2>Reset Password</h2> */}
            <p style={{ fontSize:"20px", fontWeight:"500" }}>Reset Password</p>
            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", margin:"10px 0" }}>New Password:</label>
                <div style={{display:"flex",flexDirection:"column"}}>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    style={{ width: "50%", padding: "8px", marginBottom: "15px" }}
                />
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer", width:"10%", border:"none", fontWeight:"500" }}>Reset Password</button>
                </div>
            </form>
            {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </div>
    );
};

export default ResetPassword;
