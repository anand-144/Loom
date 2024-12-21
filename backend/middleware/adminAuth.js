import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized Login Again" 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the decoded token contains admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized Login Again" 
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ 
            success: false, 
            message: "Not Authorized Login Again" 
        });
    }
};

export default adminAuth;