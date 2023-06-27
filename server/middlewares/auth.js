import jwt from 'jsonwebtoken';

export const auth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        let decodeData= jwt.verify(token, process.env.JWT_SECRET);
        req.userId= decodeData?.indexOf;

        next();
    } catch (error) {
        console.log(error);
    }
}