const jwt = require("jsonwebtoken");

const createJwtToken = (payload) => {
  try {
    const days = 2;

    const token = jwt.sign(payload, process.env.secretJwtKey);
    // {
    //   expiresIn: days * 24 * 60 * 60,
    // }
    return token;
  } catch (error) {}
};
const verificationToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.secretJwtKey);
    return data;
  } catch (error) {
    return null;
  }
};

const bcrypt = require("bcryptjs");
const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

const comparePassword = async (pass, hashed) => {
  return await bcrypt.compare(pass, hashed);
};
const generatedRandomId = async (idLength = 10) => {
  const chars =
    "ABCD0EF349Gd3HI45748JK4L458MN485O444PQRS78TU8VW2384XYZ4a4b3c4de34fghijk6lm4no5p4qr4st2vwxyz0123456789";
  let result = "";
  for (let i = 0; i < idLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
const countCoins = (level, min) => {
  const Matrix_3_Rewards = {
    0: 50,
    1: 40,
    2: 30,
    3: 20,
    4: 10,
  };
  const Matrix_4_Rewards = {
    0: 100,
    1: 90,
    2: 80,
    3: 70,
    4: 60,
  };
  const Matrix_5_Rewards = {
    0: 150,
    1: 140,
    2: 130,
    3: 120,
    4: 110,
  };
  switch (level) {
    case 5:
      return Matrix_5_Rewards[min] || Matrix_5_Rewards[4];
    case 4:
      return Matrix_4_Rewards[min] || Matrix_4_Rewards[4];
    default:
      return Matrix_3_Rewards[min] || Matrix_3_Rewards[4];
  }
};
module.exports = {
  createJwtToken,
  verificationToken,
  hashPassword,
  generatedRandomId,
  comparePassword,
  countCoins,
};
