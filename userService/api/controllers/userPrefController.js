const userPrefRepository = require("../repositories/userPrefRepository");

async function updateUserPreferences(req, res) {
  try {
    const user = await userPrefRepository.updateUserPreferences(
      req.params.userID,
      req.body
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserPreferences(req, res) {
  try {
    const user = await userPrefRepository.getUserPreferences(req.params.userID);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  updateUserPreferences,
  getUserPreferences,
};
