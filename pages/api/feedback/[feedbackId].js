import { buildFeedbackFilePath, extractFeedback } from "./index";

function handler(req, res) {
  //

  // if(req.method === "DELETE"){
  // }

  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackFilePath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(fb => fb.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
