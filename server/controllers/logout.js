const getLogout = async (req, res) => {
  try {
    res
      .cookie("auth-token", "", { expires: new Date(0) })
      .status(200)
      .send({ logout: false });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Signup Failed" });
  }
};

module.exports = { getLogout };
