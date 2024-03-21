const followRepository = require("../repositories/followRepository");

async function followUserOrBusiness(req, res) {
  try {
    const user = await followRepository.followUserOrBusiness(
      req.params.userID,
      req.params.followID
    );
    res.status(201).json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function unfollowUserOrBusiness(req, res) {
  try {
    const user = await followRepository.unfollowUserOrBusiness(
      req.params.userID,
      req.params.followID
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  followUserOrBusiness,
  unfollowUserOrBusiness,
};
