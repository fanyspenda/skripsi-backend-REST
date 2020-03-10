import Express from "express";
import cors from "cors";
import router from "config/router";
import morgan from "morgan";
import "config/db";
const app = Express();

app.use(Express.json());
app.use(cors());
app.use(router);
app.use(morgan(`dev`));

app.get("/", (req, res) => {
  res.send("Hello Word");
});
const port = 4000;
app.listen(port, () => {
  console.log("server berjalan");
});
