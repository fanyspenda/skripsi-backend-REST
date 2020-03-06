import ModelAlumni from "./alumniModel";
import { Request, Response } from "express";

const AlumniController = {
  index: (req: Request, res: Response) => {
    ModelAlumni.find(
      {},
      {
        name: true,
        work_at: true,
        work_position: true,
        email: true,
        data_source: true
      }
    ).then(alumnis => {
      res.send(alumnis);
    });
  },
  show: (req: Request, res: Response) => {
    ModelAlumni.findById(req.params.id).then(alumni => {
      res.send(alumni);
    });
  },
  store: (req: Request, res: Response) => {
    ModelAlumni.create({ ...req.body, data_source: "manual" }).then(alumni => {
      res.send(alumni);
    });
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
