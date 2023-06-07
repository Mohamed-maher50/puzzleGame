const Puzzle = require("../models/pizzle");
const User = require("../models/user");
const { countCoins } = require("../utils/miscellaneous");

const createPizzle = async (req, res) => {
  try {
    const { level } = req.params;
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ msg: "not found this user" });
    const puzzle = await new Puzzle({
      playerId: user._id,
      startTime: new Date().getTime(),
      level,
    }).save();
    await user.updateOne({
      $addToSet: { puzzles: puzzle._id },
    });
    res.status(201).json(puzzle);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const completePuzzle = async (req, res) => {
  try {
    const { puzzleId } = req.params;
    const puzzle = await Puzzle.findById(puzzleId);
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ msg: "not found this user" });
    if (!puzzle) return res.status(400).json({ msg: "not found this game" });
    if (puzzle.isCompleted)
      return res.status(400).json({ msg: "submitted before" });
    const completeTime = new Date().getTime() - puzzle.startTime;
    const min = Math.floor(completeTime / 60000);
    await puzzle.updateOne({
      $set: {
        isCompleted: true,
        endTime: completeTime,
      },
    });
    await user.updateOne({
      $inc: { coins: countCoins(puzzle.level, min) },
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const geRank = async (req, res) => {
  try {
    const result = await User.find({})
      .sort({ coins: 1 })
      .limit(10)
      .populate("playerId", "fullName email");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
module.exports = { createPizzle, completePuzzle, geRank };
