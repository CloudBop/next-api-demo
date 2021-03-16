import { buildFeedbackFilePath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// only run on server - not in client bundle
export async function getStaticProps() {
  const filePath = buildFeedbackFilePath();
  const data = extractFeedback(filePath);
  console.log(`data`, data);
  return {
    props: {
      feedbackItems: data
    }
  };
}

export default FeedbackPage;
