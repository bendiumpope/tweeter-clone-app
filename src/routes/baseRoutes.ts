import express, {Request, Response, NextFunction} from "express";

const router = express.Router();

router.route("/").get((req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message:"WELCOME TO TWEETER CLONE APP......"})
});


export default router;
