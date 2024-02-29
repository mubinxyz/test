const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");

const router = express.Router();

router.use(validateToken);

router.get("/", getContacts).post("/", createContact);

router
  .get("/:id", getContact)
  .put("/:id", updateContact)
  .delete("/:id", deleteContact);

module.exports = router;
