import { Request, Response } from "express";
import { sse } from "./sse";

export const controller = {
  connect: async (req: Request, res: Response) => {
    sse.connect(req, res);
  },

  send: async (req: Request, res: Response) => {
    sse.send(req.body);
    res.send({ data: "Message sent" });
  }
}