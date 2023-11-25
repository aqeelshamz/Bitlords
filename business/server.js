import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dynamoose from "dynamoose";

import bankRouter from "./routes/bank.js";
import dentistRouter from "./routes/dentist.js";
import studentRouter from "./routes/student.js";
// import businessRouter from "./routes/business.js";

dotenv.config();

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
    },
    "region": "ap-south-1"
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bank", bankRouter);
app.use("/dentist", dentistRouter);
app.use("/student", studentRouter);
// app.use("/business", businessRouter);

app.get("/", (req, res) => {
    res.send("Business");
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
    dynamoose.aws.ddb.set(ddb);
});