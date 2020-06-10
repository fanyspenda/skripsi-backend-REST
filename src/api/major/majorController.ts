import { Request, Response } from "express";
import paginate from "express-paginate";
import majorModel from "./majorModel";

export const majorController = {
	showAll: async (req: Request, res: Response) => {
		const limit = req.query.limit < 0 ? 0 : req.query.limit;
		const page = req.query.page <= 0 ? 1 : req.query.page;
		try {
			let [documentMajor, totalMajor] = await Promise.all([
				majorModel
					.find({}, { name: true })
					.limit(limit * 1)
					.skip(req.skip),
				majorModel.countDocuments({}),
			]);
			if (totalMajor < 0) totalMajor = 0;
			const pageCount = Math.ceil(totalMajor / (limit * 1));
			res.status(200).send({
				object: "list",
				pageCount,
				totalMajor,
				pages: paginate.getArrayPages(req)(4, pageCount, page * 1),
				data: documentMajor,
			});
		} catch (error) {
			res.status(404).send(error);
			console.log(error);
		}
	},
	showOne: async (req: Request, res: Response) => {
		try {
			const id = req.params.id || "";
			const result = await majorModel.findById(id);
			res.status(200).send(result);
		} catch (error) {
			res.status(404).send(error);
			console.log(error);
		}
	},
	addOne: async (req: Request, res: Response) => {
		try {
			const result = await majorModel.create({ ...req.body });
			res.status(200).send(result);
		} catch (error) {
			res.send(error);
		}
	},
	updateOne: async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const result = await majorModel.findByIdAndUpdate(
				id,
				{ ...req.body },
				{ new: true }
			);
			res.status(200).send(result);
		} catch (error) {
			res.status(500).send(error);
		}
	},
	deleteOne: async (req: Request, res: Response) => {
		const id = req.params.id;
		try {
			const result = await majorModel.findByIdAndDelete(id);
			res.status(200).send(result);
		} catch (error) {
			res.status(500).send(error);
		}
	},
};
