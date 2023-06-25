import express from "express";
import User from "@controllers/user";
import Auth from "@root/middleware/auth";
import schema from "../validation-schema";
import validate from "@root/middleware/validate";

const router = express.Router();
const { CREATE } = schema;

router.post("/", validate(CREATE), User.create);

router.get("/", Auth, User.getOne);

export default router;
