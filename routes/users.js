const { deletePlayer, gift } = require("../controller/users");
const { isAdmin } = require("../utils/ProtectRoute");

const router = require("express").Router();

router.delete("/:userId", isAdmin, deletePlayer);
router.put("/gift", gift);
module.exports = router;
