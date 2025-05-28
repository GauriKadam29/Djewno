

// import React, { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import classes from "./MyAccount.module.css";

// const MyAccount = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false);

//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

//   const [message, setMessage] = useState(""); // Stores success/error messages

//   // Handle input change
//   const handleChange = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "login") {
//       setLoginData({ ...loginData, [name]: value });
//     } else {
//       setRegisterData({ ...registerData, [name]: value });
//     }
//   };

//   // Login Function
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("Login Successful!");
//         localStorage.setItem("token", data.token); // Store token
//       } else {
//         setMessage(data.message || "Login failed");
//       }
//     } catch (error) {
//       setMessage("Server error, please try again");
//     }
//   };

//   // Register Function
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(registerData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("Registration Successful! You can now log in.");
//         setIsLogin(true); // Switch to login tab
//       } else {
//         setMessage(data.message || "Registration failed");
//       }
//     } catch (error) {
//       setMessage("Server error, please try again");
//     }
//   };

//   return (
//     <>
//       <div className={classes.account}>
//         <div className={classes.myAccount}>
//           {/* Tab Buttons */}
//           <div className={classes.tabButtons}>
//             <button
//               className={`${classes.tab} ${isLogin ? classes.activeTab : ""}`}
//               onClick={() => setIsLogin(true)}
//             >
//               Login
//             </button>
//             <button
//               className={`${classes.tab} ${!isLogin ? classes.activeTab : ""}`}
//               onClick={() => setIsLogin(false)}
//             >
//               Register
//             </button>
//           </div>

//           {/* Message Display */}
//           {message && <p className={classes.message}>{message}</p>}

//           {/* Form Container */}
//           <div className={`${classes.formWrapper} ${isLogin ? classes.showLogin : classes.showRegister}`}>
//             {/* Login Form */}
//             <form className={classes.loginForm} onSubmit={handleLogin}>
//               <p>If you have an account, sign in with your username or email address.</p>

//               <label htmlFor="loginEmail">Username or Email Address <span>*</span></label>
//               <input
//                 type="text"
//                 id="loginEmail"
//                 name="email"
//                 value={loginData.email}
//                 onChange={(e) => handleChange(e, "login")}
//                 placeholder="Enter your username or email"
//                 className={classes.input}
//                 required
//               />

//               {/* Password Field */}
//               <label htmlFor="loginPassword">Password <span>*</span></label>
//               <div className={classes.passwordWrapper}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="loginPassword"
//                   name="password"
//                   value={loginData.password}
//                   onChange={(e) => handleChange(e, "login")}
//                   placeholder="Enter your password"
//                   className={classes.input}
//                   required
//                 />
//                 <span className={classes.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </span>
//               </div>

//               <div className={classes.options}>
//                 <div className={classes.rememberMe}>
//                   <input type="checkbox" id="remember" />
//                   <label htmlFor="remember" className={classes.rememberLabel}>Remember me</label>
//                 </div>
//                 <a href="#" className={classes.forgotPassword}>Lost your password?</a>
//               </div>
//               <button type="submit" className={classes.loginButton}>LOG IN</button>
//             </form>

//             {/* Register Form */}
//             <form className={classes.registerForm} onSubmit={handleRegister}>
//               <p>Creating an account gives you faster checkout, order tracking, and more.</p>

//               <label htmlFor="registerUsername">Username <span>*</span></label>
//               <input
//                 type="text"
//                 id="registerUsername"
//                 name="name"
//                 value={registerData.name}
//                 onChange={(e) => handleChange(e, "register")}
//                 placeholder="Enter your username"
//                 className={classes.input}
//                 required
//               />

//               <label htmlFor="registerEmail">Email Address <span>*</span></label>
//               <input
//                 type="email"
//                 id="registerEmail"
//                 name="email"
//                 value={registerData.email}
//                 onChange={(e) => handleChange(e, "register")}
//                 placeholder="Enter your email"
//                 className={classes.input}
//                 required
//               />

//               {/* Password Field */}
//               <label htmlFor="registerPassword">Password <span>*</span></label>
//               <div className={classes.passwordWrapper}>
//                 <input
//                   type={showRegisterPassword ? "text" : "password"}
//                   id="registerPassword"
//                   name="password"
//                   value={registerData.password}
//                   onChange={(e) => handleChange(e, "register")}
//                   placeholder="Create a password"
//                   className={classes.input}
//                   required
//                 />
//                 <span className={classes.passwordIcon} onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
//                   {showRegisterPassword ? <FiEyeOff /> : <FiEye />}
//                 </span>
//               </div>

//               <p className={classes.privacyText}>
//                 Your personal data will be used to manage your account as described in our <a href="#" className={classes.privacyPolicy}>privacy policy</a>.
//               </p>
//               <button type="submit" className={classes.registerButton}>REGISTER</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyAccount;







import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import classes from "./MyAccount.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice";
const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Define dispatch
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const [message, setMessage] = useState(""); // Stores success/error messages

  

  // Handle input change
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };




const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }), // Send login data
      });

      const data = await response.json();
      if (response.ok) {
          setMessage("Login Successful!");
          localStorage.setItem("token", data.token); // ✅ Store token
          dispatch(fetchUserProfile()); // ✅ Fetch user profile
          navigate("/"); // ✅ Redirect after login
      } else {
          setMessage(data.message || "Login failed");
      }
  } catch (error) {
      setMessage("Server error, please try again");
  }
};



  // Login Function
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setMessage("");

  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(loginData),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setMessage("Login Successful!");
  //       localStorage.setItem("token", data.token); // Store token
  //     } else {
  //       setMessage(data.message || "Login failed");
  //     }
  //   } catch (error) {
  //     setMessage("Server error, please try again");
  //   }
  // };

  // Register Function
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration Successful! You can now log in.");
        setIsLogin(true); // Switch to login tab
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server error, please try again");
    }
  };

  return (
    <>
      <div className={classes.account}>
        <div className={classes.myAccount}>
          {/* Tab Buttons */}
          <div className={classes.tabButtons}>
            <button
              className={`${classes.tab} ${isLogin ? classes.activeTab : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`${classes.tab} ${!isLogin ? classes.activeTab : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Message Display */}
          {message && <p className={classes.message}>{message}</p>}

          {/* Form Container */}
          <div className={`${classes.formWrapper} ${isLogin ? classes.showLogin : classes.showRegister}`}>
            {/* Login Form */}
            <form className={classes.loginForm} onSubmit={handleLogin}>
              <p>If you have an account, sign in with your username or email address.</p>

              <label htmlFor="loginEmail">Username or Email Address <span>*</span></label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                value={email}
                // onChange={(e) => handleChange(e, "login")}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username or email"
                className={classes.input}
                required
              />

              {/* Password Field */}
              <label htmlFor="loginPassword">Password <span>*</span></label>
              <div className={classes.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="loginPassword"
                  name="password"
                  value={password}
                  // onChange={(e) => handleChange(e, "login")}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={classes.input}
                  required
                />
                <span className={classes.passwordIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <div className={classes.options}>
                <div className={classes.rememberMe}>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className={classes.rememberLabel}>Remember me</label>
                </div>
                {/* <a href="#" className={classes.forgotPassword}>Lost your password?</a> */}
                <div className={classes.forgotPassword} onClick={() => navigate("/forgot-password")}>Lost your password?</div>
              </div>
              <button type="submit" className={classes.loginButton}>LOG IN</button>
            </form>

            {/* Register Form */}
            <form className={classes.registerForm} onSubmit={handleRegister}>
              <p>Creating an account gives you faster checkout, order tracking, and more.</p>

              <label htmlFor="registerUsername">Username <span>*</span></label>
              <input
                type="text"
                id="registerUsername"
                name="name"
                value={registerData.name}
                onChange={(e) => handleChange(e, "register")}
                placeholder="Enter your username"
                className={classes.input}
                required
              />

              <label htmlFor="registerEmail">Email Address <span>*</span></label>
              <input
                type="email"
                id="registerEmail"
                name="email"
                value={registerData.email}
                onChange={(e) => handleChange(e, "register")}
                placeholder="Enter your email"
                className={classes.input}
                required
              />

              {/* Password Field */}
              <label htmlFor="registerPassword">Password <span>*</span></label>
              <div className={classes.passwordWrapper}>
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  id="registerPassword"
                  name="password"
                  value={registerData.password}
                  onChange={(e) => handleChange(e, "register")}
                  placeholder="Create a password"
                  className={classes.input}
                  required
                />
                <span className={classes.passwordIcon} onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                  {showRegisterPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <p className={classes.privacyText}>
                Your personal data will be used to manage your account as described in our <a href="#" className={classes.privacyPolicy}>privacy policy</a>.
              </p>
              <button type="submit" className={classes.registerButton}>REGISTER</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;




