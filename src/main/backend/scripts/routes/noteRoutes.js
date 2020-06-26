import express from 'express';
const router = express.Router();
import {notesController} from "../controller/notesController.js";

router.get("/getNotes", notesController.getNotes.bind(notesController));
router.get("/:_id/", notesController.getById.bind(notesController));
router.post("/", notesController.addNote.bind(notesController));
router.put("/:_id", notesController.updateNote.bind(notesController));
router.delete("/:_id/", notesController.deleteNote.bind(notesController));

export const noteRoutes = router;