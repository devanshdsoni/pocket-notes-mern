const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

const Note = require("../modals/Notes");

//Route 01 -Get all notes, using GET - /api/note/fetchallnotes --- Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({ success: true, msg: "Notes fetched SuccessFully", notes });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

//Route 02 - Add a new note, using POST - /api/note/addnote --- Login required
router.post(
  "/addnote",
  fetchuser,
  [body("title", "Minimum length for Title is 3").isLength({ min: 3 }), body("description", "Minimum length for Description is 5").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const { id } = req.user;

      const note = await Note.create({
        user: id,
        title: title,
        description: description,
        tag: tag,
      });
      res.json({ success: true, msg: "Note added successfully!", note });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
    }
  }
);

//Route 03 - Update a note, using PUT - /api/note/updatenote --- Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  [body("title", "Minimum length for Title is 3").isLength({ min: 3 }), body("description", "Minimum length for Description is 5").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });
    }
    try {
      const noteId = req.params.id;

      const note = await Note.findById(noteId);
      if (!note) {
        return res.status(401).json({ success: false, msg: "Unautharized access!" });
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, msg: "Unautharized access!" });
      }

      const newNote = {};
      if (req.body.title) {
        newNote.title = req.body.title;
      }
      if (req.body.description) {
        newNote.description = req.body.description;
      }
      if (req.body.tag) {
        newNote.tag = req.body.tag;
      } else {
        newNote.tag = "";
      }
      const updatedNote = await Note.findByIdAndUpdate(noteId, newNote, {
        new: true,
      });

      res.json({
        success: true,
        msg: "Note updated successfully!",
        updatedNote,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "Internal Server Error!!!!", error });
    }
  }
);

//Route 04 - Delete a note, using DELETE - /api/note/deletenote --- Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(401).json({ success: false, msg: "Unautharized access!" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: "Unautharized access!" });
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    res.json({
      success: true,
      msg: "Note deleted successfully!",
      deletedNote,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!!!!", error });
  }
});

module.exports = router;
