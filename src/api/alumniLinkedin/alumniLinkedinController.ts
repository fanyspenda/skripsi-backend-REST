import modelAlumniLinkedin from "./alumniLinkedinModel";
import { Request, Response } from "express";
import paginate from "express-paginate";

const AlumniController = {
	showAll: async (req: Request, res: Response) => {
		try {
			const searchedname = req.query.name || "";
			const documentAlumnis = await modelAlumniLinkedin
				.find(
					{
						name: {
							$regex: searchedname,
							$options: "i",
						},
					},
					{
						name: true,
						work_at: true,
						work_position: true,
						email: true,
						data_source: true,
					}
				)
				.limit(req.query.limit * 1)
				.skip(req.skip);
			const countAlumnis = await modelAlumniLinkedin.countDocuments({
				name: {
					$regex: searchedname,
					$options: "i",
				},
			});
			let pageCount = Math.ceil(countAlumnis / (req.query.limit * 1));
			if (pageCount <= 0) pageCount = 1;

			res.send({
				object: "list",
				has_more: paginate.hasNextPages(req)(pageCount),
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
			res.status(401).send({ error });
			console.log(error);
		}
	},
	showOne: async (req: Request, res: Response) => {
		try {
			const result = await modelAlumniLinkedin
				.findById(req.params.id)
				.then((alumni) => {
					res.send(alumni);
				});
			res.status(200).send(result);
		} catch (error) {
			res.status(401).send(error);
			console.log(error);
		}
	},
};

export default AlumniController;
