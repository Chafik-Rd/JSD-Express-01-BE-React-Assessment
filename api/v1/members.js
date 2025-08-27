import express from "express";
import { createMember, deleteMember, editMember, getMembers } from "./controller/membersController.js";

const router = express.Router()

// Router 2 to handle POST requrests to create a new member
router.post("/members", createMember);

// Router 3 to handle GET requests to read member
router.get("/members", getMembers);

// Router 4 to handle DELETE requests to delete member
router.delete("/members/:id", deleteMember);

// Router 5 to handle PUT requests to delete member
router.put("/members/:id", editMember);

export default router;