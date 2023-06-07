const { deletePlayer } = require("../controller/users");
const { isAdmin } = require("../utils/ProtectRoute");

const router = require("express").Router();

router.delete("/:userId", isAdmin, deletePlayer);
module.exports = router;
