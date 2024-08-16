import express from "express";
import { getAllPost, NewBlog } from "../controller/blogController.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/firstblog", upload.single("image"), NewBlog);
router.get("/getAllBlog", getAllPost);

export default router;
