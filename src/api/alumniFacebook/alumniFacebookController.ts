import ModelAlumniFacebook from "./alumniFacebookModel";
import { Request, Response } from "express";

const AlumniController = {
  index: (req: Request, res: Response) => {
    ModelAlumniFacebook.find(
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
    ModelAlumniFacebook.findById(req.params.id).then(alumni => {
      res.send(alumni);
    });
  },
  store: (req: Request, res: Response) => {
    //do scraping here
  }
};

export default AlumniController;
