import path from "path";
import fs from "fs";
// server side code
function handler(req, res) {
  // express-like syntax !express though

  if ((req.method = "POST")) {
    // client request
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text
    };
    // create absolute path to file
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    // synchronous read
    const fileData = fs.readFileSync(filePath);
    //
    const data = JSON.parse(fileData);
    // add datea
    data.push(newFeedback);
    // syncronous write
    fs.writeFileSync(filePath, JSON.stringify(data));
    // send back result
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    // res.status(200).json({ message: "This works" });
  }
}

export default handler;
