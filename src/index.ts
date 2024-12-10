import express, { Application, Request, Response } from 'express';
import sseRoutes from "./api/routes";
import cors from "cors";

// Boot express
const app: Application = express();
const port = 8080;

app.use(cors());
app.use(express.json({ limit: "20MB" }));

app.use(sseRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send({ data: 'Not found' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
