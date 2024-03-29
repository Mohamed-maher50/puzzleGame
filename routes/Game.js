const {
  createPizzle,
  completePuzzle,
  geRank,
  gift,
} = require("../controller/game");

const router = require("express").Router();
router.post("/:level", createPizzle);
router.put("/complete/:puzzleId", completePuzzle);
router.get("/rank", geRank);

module.exports = router;
