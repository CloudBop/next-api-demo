import path from "path";
import fs from "fs";
// nodejs server side code

function buildFeedbackFilePath() {
  // create absolute path to file
  return path.join(process.cwd(), "data", "feedback.json");
}

function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  // express-like syntax !express though
  if (req.method === "POST") {
    // client request
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text
    };
    const filePath = buildFeedbackFilePath();
    // synchronous read
    const data = extractFeedback(filePath);
    // add datea
    data.push(newFeedback);
    // syncronous write
    fs.writeFileSync(filePath, JSON.stringify(data));
    // send back result
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackFilePath();
    // synchronous read
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
