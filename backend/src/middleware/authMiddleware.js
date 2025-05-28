




// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const authHeader = req.header("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     const token = authHeader.split(" ")[1]; // Extract token part after "Bearer "

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token
//         req.user = decoded; // ✅ Attach user info to request
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid or expired token" });
//     }
// };


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token part after "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        res.status(401).json({ message: "Invalid token" });
    }
};
