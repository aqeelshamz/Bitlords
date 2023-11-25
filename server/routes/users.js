import express from "express";
import joi from "joi";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const schema = joi.object({
        businessName: joi.string().required(),
        businessDescription: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            id: uuidv4(),
            username: data.username,
            password: hashedPassword,
            businessName: data.businessName,
            businessDescription: data.businessDescription,
        });

        const savedUser = await newUser.save();

        return res.send(savedUser);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/login", async (req, res) => {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const user = (await User.query("username").eq(data.username).exec())[0].toJSON();

        console.log(user)

        if (!user)
            return res.status(400).send("Email or password is wrong");

        const validPassword = await bcrypt.compare(data.password, user.password);

        if (!validPassword)
            return res.status(400).send("Email or password is wrong");

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        return res.send({ user: user, token: token });
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

export default router;
