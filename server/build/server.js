import express from "express";
import cors from "cors";
import "dotenv/config";
import postRoute from "./routes/postRoutes.js";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/posts", postRoute);
app.get("/", (req, res) => {
    res.status(200).send("won");
    console.log("Good");
});
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
