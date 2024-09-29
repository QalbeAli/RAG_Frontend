"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Backtest() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the Hello World message from the backend using Axios
    axios.get('http://127.0.0.1:8000/')  // Replace with your FastAPI backend URL
      .then(response => {
        setMessage(response.data.message);  // Set the message from the response
      })
      .catch(error => {
        console.error("Error fetching message:", error);
      });
  }, []);

  return (
    <div>
      <h1>Message from FastAPI:</h1>
      <p className='text-7xl text-red-500'>{message}</p>
    </div>
  );
}
