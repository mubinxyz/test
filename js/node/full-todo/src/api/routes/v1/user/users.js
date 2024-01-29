const { Router } = require("express");

const router = Router();

router.get("/", getUsers);

router.get("/:username", findUser);

router.post("/", createUser);

router.delete("/:username", deleteUser);

module.exports = router;
