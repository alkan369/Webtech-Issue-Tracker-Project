
import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

export const validateToken = async (req: Request , res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log("HEADER: ", authHeader);
    const token = authHeader && authHeader.split(' ').pop();

    if (!token) {
		return res.status(401).send('Invalid token format');
	}

	try {
		const username = verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        console.log(username);
        // req.username = username;
        
	} catch (err) {
        res.status(403).json({
                                message: 'Unable to verify token',
                                err
                            });
        return;
	}
    
	next();
}