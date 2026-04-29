import express from "express";
import { createEmail, deleteEmail, getAllEmailById, togglePin } from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();


// router.route("/create").post(isAuthenticated,createEmail);
// router.route("id").delete(isAuthenticated, deleteEmail);

router.post("/create", isAuthenticated, createEmail);

// ✅ Delete Email by ID (Protected Route)
router.delete("/:id", isAuthenticated, deleteEmail);

// get all emails send by users
router.get("/getallemails", isAuthenticated, getAllEmailById);

// toggle pin/unpin
router.patch("/:id/pin", isAuthenticated, togglePin);

export default router;


