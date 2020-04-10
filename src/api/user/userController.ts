import jwt from "jsonwebtoken";
import userModel from "./userModel";
import { Request, Response } from "express";
import paginate from "express-paginate";
import bcrypt from "bcryptjs";
interface authReq extends Request {
	usrId: string;
}

const userController = {
	register: (req: Request, res: Response) => {
		const data = {
			name: req.body.name,
			email: req.body.email,
			level: req.body.level,
			password: bcrypt.hashSync(req.body.password, 10),
		};

		userModel
			.create(data)
			.then((doc) => {
				res.status(200);
				res.send(doc);
			})
			.catch((err) => {
				res.status(401);
				res.send(err);
			});
	},
	login: (req: Request, res: Response) => {
		userModel
			.findOne({ email: req.body.email })
			.then((doc: any) => {
				if (bcrypt.compareSync(req.body.password, doc.password)) {
					let token = jwt.sign(
						{ id: doc._id, level: doc.level },
						"secret",
						{
							expiresIn: 86400,
						}
					);
					res.status(200).send({ token });
					res.end();
				} else {
					res.status(401).jsonp({ error: "password Salah" });
					res.end();
				}
			})
			.catch((err) => {
				res.status(401).json({ error: "user not found" });
				res.end();
			});
	},
};

export default userController;
