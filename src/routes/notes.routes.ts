import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/notes",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json("notes");
  }
);

export default router;
