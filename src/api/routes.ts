import { Router } from "express";
import { controller as api} from "./controller";

const router = Router();

router.get("/sse/connect", api.connect).all("*", (req, res) => {
  res.status(405).send({ message: "Method not allowed" });
});
router.post("/sse/send", api.send);

export default router;
