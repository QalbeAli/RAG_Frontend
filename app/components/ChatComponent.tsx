"use client";

import { useState } from 'react';
import axios from 'axios';

export default function ChatComponent() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make the POST request to the FastAPI backend
      const response = await axios.post('http://127.0.0.1:8000/chat', {
        question: question,
      });

      // Set the answer received from the backend
      setAnswer(response.data.answer);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat with Backend</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button className='bg-red-500 mx-2 rounded-xl p-2' type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}

      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
}
