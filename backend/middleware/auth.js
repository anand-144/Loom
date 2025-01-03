import jwt from 'jsonwebtoken';

const authUser =async (req, res, next) => {
    
    const {token} = req.headers;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized Login Again"
        });    
    }

    try {

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id
        next()
        
    } catch (error) {
        console.error(error);
        res.json({success : false, message : error.message})
    }

} 

export default authUser;