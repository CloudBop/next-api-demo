import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedback, setFeedback] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        // tell the server what we're sending
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  function loadFeeback(event) {
    event.preventDefault();
    fetch("/api/feedback")
      .then(response => response.json())
      .then(data => {
        console.log(`data`, data);
        setFeedback(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
        <button onClick={loadFeeback}>Load Feedback</button>
      </form>

      <ul>
        {feedback &&
          feedback.map(comment => {
            return (
              <li key={comment.email + Math.random()}>
                {comment.email} -- {comment.text}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default HomePage;
