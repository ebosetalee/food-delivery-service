import express from "express";
import Auth from "@controllers/auth";
import schema from "../validation-schema";
import validate from "@root/middleware/validate";

const router = express.Router();
const { LOGIN } = schema;

router.post("/login", validate(LOGIN), Auth.login);

export default router;
