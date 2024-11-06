"use client";
import useUserStore from "@/stores/useUserStore";

import React, { useState } from "react";
import toast from "react-hot-toast";

const AddTopicForm = () => {
  const [title, setTitle] = useState("");
  //   const { user, error, isLoading } = useUser();
  const { user } = useUserStore();
  const handleSubmit = async (e: React.FormEvent) => {
    if (!user) {
      return toast.error("Sing in first");
    }
    e.preventDefault();
    const response = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, user: user._id }),
    });

    if (response.ok) {
      setTitle("");
      alert("Topic added successfully!");
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-[400px] mx-auto p-4 shadow  mb-3">
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
      <button type="submit" className="btn btn-primary w-full">
        Add Topic
      </button>
    </form>
  );
};

export default AddTopicForm;
