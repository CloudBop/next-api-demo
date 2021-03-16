import { useState } from "react";
import { buildFeedbackFilePath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackState, setFeedbackState] = useState(null);

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then(res => res.json())
      .then(data => {
        setFeedbackState(data.feedback);
      });
  }

  return (
    <ul>
      <li>{feedbackState && feedbackState.email}</li>
      {props.feedbackItems.map(item => (
        <li key={item.id}>
          {item.text}{" "}
          <button onClick={loadFeedbackHandler.bind(null, item.id)}>
            more
          </button>
        </li>
      ))}
    </ul>
  );
}

// only run on server - not in client bundle
export async function getStaticProps() {
  const filePath = buildFeedbackFilePath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data
    }
  };
}

export default FeedbackPage;
