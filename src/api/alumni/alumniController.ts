import ModelAlumni from "./alumniModel";
import { Request, Response } from "express";
import paginate from "express-paginate";

const AlumniController = {
	showAll: async (req: Request, res: Response) => {
		const searchedname = req.query.name || "";
		try {
			const [documentAlumnis, countAlumnis] = await Promise.all([
				ModelAlumni.find({
					name: { $regex: searchedname, $options: "i" },
				})
					.limit(req.query.limit * 1)
					.skip(req.skip),
				ModelAlumni.countDocuments({
					name: { $regex: searchedname, $options: "i" },
				}),
			]);

			let pageCount = Math.ceil(countAlumnis / (req.query.limit * 1));
			if (pageCount <= 0) pageCount = 1;
			res.send({
				pageCount,
				countAlumnis,
				pages: paginate.getArrayPages(req)(
					4,
					pageCount,
					req.query.page * 1
				),
				data: documentAlumnis,
			});
		} catch (error) {
			console.log(error);
		}
	},
	showOne: (req: Request, res: Response) => {
		ModelAlumni.findById(req.params.id).then((alumni) => {
			res.send(alumni);
		});
	},
	addOne: (req: Request, res: Response) => {
		ModelAlumni.create({ ...req.body, data_source: "manual" })
			.then((alumni) => {
				res.send(alumni);
			})
			.catch((err) => {
				res.send(err);
			});
	},
	updateOne: (req: Request, res: Response) => {
		ModelAlumni.updateOne({ _id: req.params.id }, { ...req.body })
			.then((writeResult) => {
				res.send(writeResult);
			})
			.catch((err) => {
				res.send(err);
			});
	},
	deleteOne: (req: Request, res: Response) => {
		ModelAlumni.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).send("success");
			})
			.catch((err) => res.send(err));
	},
};

export default AlumniController;
