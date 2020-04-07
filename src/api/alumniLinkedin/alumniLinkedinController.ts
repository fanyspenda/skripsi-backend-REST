import modelAlumniLinkedin from "./alumniLinkedinModel";
import { Request, Response } from "express";
import paginate from "express-paginate";

const AlumniController = {
	index: async (req: Request, res: Response) => {
		try {
			const documentAlumnis = await modelAlumniLinkedin
				.find(
					{},
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
			const countAlumnis = await modelAlumniLinkedin.count({});
			const pageCount = Math.ceil(countAlumnis / (req.query.limit * 1));
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
			console.log(error);
		}
	},
	show: (req: Request, res: Response) => {
		modelAlumniLinkedin.findById(req.params.id).then((alumni) => {
			res.send(alumni);
		});
	},
	store: (req: Request, res: Response) => {
		//do scraping here
	},
};

export default AlumniController;
