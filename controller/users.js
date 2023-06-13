const User = require("../models/user");

const deletePlayer = async (req, res) => {
  const { userId } = req.params;
  try {
    if (req.userId == userId)
      return res.status(400).json({ msg: "you can't delete yourself" });
    await User.findByIdAndDelete(userId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const gift = async (req, res) => {
  console.log(req.userId);
  try {
    await User.findByIdAndUpdate(
      req.userId,
      {
        $inc: {
          coins: req.body.coins,
        },
      },

      { new: true }
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
module.exports = {
  deletePlayer,
  gift,
};
