import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface authReq extends Request {
	userId: string;
}

const verifyToken = (req: authReq, res: Response, next: NextFunction) => {
	const bearerHeader = req.headers["authorization"];
	const token = bearerHeader ? bearerHeader.split(" ")[1] : undefined;
	if (!token)
		return res
			.status(403)
			.send({ auth: false, message: "No token provided." });

	jwt.verify(token, "secret", (err: any, decoded: any) => {
		if (err)
			return res.status(500).send({
				auth: false,
				message: "Failed to authenticate token.",
			});
		next();
	});
};

export default verifyToken;
