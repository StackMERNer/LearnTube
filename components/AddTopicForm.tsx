"use client";
import React, { useState } from "react";

const AddTopicForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
  
    if (response.ok) {
      setTitle('');
      alert('Topic added successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text">Topic Title</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Enter topic title"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Topic
      </button>
    </form>
  );
};

export default AddTopicForm;
