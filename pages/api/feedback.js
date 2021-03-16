// server side code
function handler(req, res) {
  // express-like syntax !express though

  res.status(200).json({ message: "This works" });
}

export default handler;
