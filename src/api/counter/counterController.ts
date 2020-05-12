import { Request, Response } from "express";
import alumniModel from "api/alumni/alumniModel";
import alumniLinkedinModel from "api/alumniLinkedin/alumniLinkedinModel";

export const counterController = {
	countNotWorking: async (req: Request, res: Response) => {
		try {
			const [total, totalL] = await Promise.all([
				alumniModel.count({ work_at: { $in: ["", null] } }),
				alumniLinkedinModel.count({ work_at: { $in: ["", null] } }),
			]);
			const countTotal = total + totalL;
			res.status(200).send({ total: countTotal });
		} catch (error) {
			res.status(500).send(error);
		}
	},
	countWorking: async (req: Request, res: Response) => {
		try {
			const [total, totalL] = await Promise.all([
				alumniModel.count({ work_at: { $nin: ["", null] } }),
				alumniLinkedinModel.count({ work_at: { $nin: ["", null] } }),
			]);
			const countTotal = total + totalL;
			res.status(200).send({ total: countTotal });
		} catch (error) {
			res.status(500).send(error);
		}
	},
	countAll: async (req: Request, res: Response) => {
		try {
			const [total, totalL] = await Promise.all([
				alumniModel.count({}),
				alumniLinkedinModel.count({}),
			]);
			const countAll = total + totalL;
			res.status(200).send({ total: countAll });
		} catch (error) {
			res.status(500).send(error);
		}
	},

	countLinkedin: async (req: Request, res: Response) => {
		try {
			const total = await alumniLinkedinModel.count({});
			res.status(200).send({ total });
		} catch (error) {
			res.status(500).send(error);
		}
	},

	countAlumni: async (req: Request, res: Response) => {
		try {
			const total = await alumniModel.count({});
			res.status(200).send({ total });
		} catch (error) {
			res.status(500).send(error);
		}
	},
};
