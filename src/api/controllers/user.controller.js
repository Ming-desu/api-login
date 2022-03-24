exports.profile = (req, res) =>
  res.status(200).json({ message: "ok", sub: req.user });
