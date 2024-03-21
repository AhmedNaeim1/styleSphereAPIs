const userRepository = require("../repositories/userRepository");

async function getUser(req, res) {
  try {
    console.log(req.params.userID);
    const user = await userRepository.getUser(req.params.userID);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const user = await userRepository.updateUser(req.params.userID, req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUser(req, res) {
  try {
    await userRepository.deleteUser(req.params.userID);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
