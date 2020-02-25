import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.JWTSECRET, {
    expiresIn: 86400
  });
}

export default {
  async signup(req: Request, res: Response): Promise<Response> {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ msg: "Please. Send email and password" });
    }
    const user = await User.findOne({
      email: req.body.email
    });
    if (user)
      return res.status(400).json({ msg: "This email is already in use" });

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  },
  async signin(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ msg: "Please. Send email and password" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ msg: "This user does not exists" });

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json({ msg: "Email/Password is invalid" });
  }
};
