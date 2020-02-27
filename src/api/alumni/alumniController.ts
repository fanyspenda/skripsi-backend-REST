import ModelAlumni from "./alumniModel";
import { ObjectID } from "bson";
import { Request, Response } from "express";

const AlumniController = {
  index: (req: Request, res: Response) => {
    ModelAlumni.find().then(alumnis => {
      res.send(alumnis);
    });
  },
  show: (req: Request, res: Response) => {
    ModelAlumni.findById(req.params.id).then(alumni => {
      res.send(alumni);
    });
  },
  store: (req: Request, res: Response) => {
    ModelAlumni.create(req.body).then(alumni => {
      res.send(alumni);
    });
  }
};

export default AlumniController;
