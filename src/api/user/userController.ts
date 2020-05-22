import paginate from "express-paginate";
import jwt from "jsonwebtoken";
import userModel from "./userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
interface authReq extends Request {
	usrId: string;
}

const userController = {
	register: async (req: Request, res: Response) => {
		try {
			const data = {
				name: req.body.name,
				email: req.body.email,
				level: req.body.level,
				password: bcrypt.hashSync(req.body.password, 10),
			};

			const result = await userModel.findOne({ email: data.email });
			if (result) {
				return res.status(401).send("Email sudah terdaftar!");
			}

			const createResult = await userModel.create(data);
			res.status(200);
			res.send(createResult);
		} catch (err) {
			res.send(err);
		}
	},
	login: (req: Request, res: Response) => {
		userModel
			.findOne({ email: req.body.email })
			.then((doc: any) => {
				if (bcrypt.compareSync(req.body.password, doc.password)) {
					let token = jwt.sign(
						{ name: doc.name, level: doc.level },
						"secret",
						{
							expiresIn: 86400,
						}
					);
					res.status(200).send({ token });
					res.end();
				} else {
					res.status(401).send({ error: "password Salah" });
					res.end();
				}
			})
			.catch((err) => {
				res.status(401).send({ error: "user not found" });
				res.end();
			});
	},
	showAll: async (req: Request, res: Response) => {
		const searchedname = req.query.name || "";
		try {
			const documentUser = await userModel
				.find(
					{
						name: {
							$regex: searchedname,
							$options: "i",
						},
					},
					{
						name: true,
						email: true,
						level: true,
					}
				)
				.limit(req.query.limit * 1)
				.skip(req.skip);

			const countUsers = await userModel.countDocuments({
				name: {
					$regex: searchedname,
					$options: "i",
				},
			});
			let pageCount = Math.ceil(countUsers / (req.query.limit * 1));
			if (pageCount <= 0) pageCount = 1;
			res.send({
				has_more: paginate.hasNextPages(req)(pageCount),
				pageCount,
				countUsers,
				pages: paginate.getArrayPages(req)(
					4,
					pageCount,
					req.query.page * 1
				),
				data: documentUser,
			});
		} catch (error) {
			return res.send(`error happened: ${error}`);
		}
	},
	updateOne: async (req: Request, res: Response) => {
		try {
			const { name, email, level } = req.body;
			if (!name || !email || !level)
				return res.send("data not fullfiled");
			const result = await userModel.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
					email: req.body.email,
					level: req.body.level,
				},
				{ new: true, fields: { name: true, email: true } }
			);
			return res.send(result);
		} catch (error) {
			return res.send(`error: ${error}`);
		}
	},
	resetPass: async (req: Request, res: Response) => {
		if (!req.body.password)
			return res.send("data to reset password is not valid");
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		try {
			await userModel.findByIdAndUpdate(req.params.id, {
				password: hashedPassword,
			});
			res.send(200);
		} catch (error) {
			res.send(`error: ${error}`);
		}
	},
	deleteUser: async (req: Request, res: Response) => {
		try {
			await userModel.findByIdAndDelete(req.params.id);
			res.send(200);
		} catch (error) {
			res.send(`error: ${error}`);
		}
	},
};

export default userController;
