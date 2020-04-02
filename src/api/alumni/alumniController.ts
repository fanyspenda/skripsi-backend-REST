import ModelAlumni from "./alumniModel";
import { Request, Response } from "express";
import paginate from "express-paginate";

const AlumniController = {
	index: async (req: Request, res: Response) => {
		try {
			const documentAlumnis = await ModelAlumni.find(
				{},
				{
					name: true,
					work_at: true,
					work_position: true,
					email: true,
					data_source: true
				}
			)
				.limit(req.query.limit * 1)
				.skip(req.skip);

			const countAlumnis = await ModelAlumni.count({});
			const pageCount = Math.ceil(countAlumnis / (req.query.limit * 1));
			res.send({
				object: "list",
				has_more: paginate.hasNextPages(req)(pageCount),
				data: documentAlumnis
			});
		} catch (error) {
			console.log(error);
		}
	},
	show: (req: Request, res: Response) => {
		ModelAlumni.findById(req.params.id).then(alumni => {
			res.send(alumni);
		});
	},
	store: (req: Request, res: Response) => {
		ModelAlumni.create({ ...req.body, data_source: "manual" }).then(
			alumni => {
				res.send(alumni);
			}
		);
	},
	update: (req: Request, res: Response) => {
		ModelAlumni.updateOne({ _id: req.params.id }, { ...req.body })
			.then(writeResult => {
				res.send(writeResult);
			})
			.catch(err => {
				res.send(err);
			});
	}
};

export default AlumniController;
