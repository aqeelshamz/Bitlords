import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dynamoose from "dynamoose";

import voiceRouter from "./routes/voice.js";
import endpointRouter from "./routes/endpoint.js";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/users.js";
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

app.use("/voice", voiceRouter);
app.use("/endpoint", endpointRouter);
app.use("/chat", chatRouter);
app.use("/users", userRouter);
// app.use("/business", businessRouter);

app.get("/", (req, res) => {
    res.send("Space.ai");
});

app.get("/create", async (req, res) => {
    const newUser = new User({
        "id": "1",
        "name": "Space.ai",
        "email": "test@gmail.com",
        "password": "ehehe"
    });

    await newUser.save();
    res.send("created");
});

const port = process.env.PORT || 8080;

app.listen(8080, () => {
    console.log(`Server at http://localhost:${port}`);
    dynamoose.aws.ddb.set(ddb);
});