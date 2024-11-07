"use client";
import AddTopicForm from "@/components/AddTopicForm";
import { useTopics } from "@/hooks/useTopics";
import Link from "next/link";
import React from "react";

const TopicsPage = () => {
  const { topics, error, isLoading } = useTopics();
  if (isLoading) {
    return <div>Loading Topics..</div>;
  }
  if (error) {
    return <div>Error fetching topics: {error.message}</div>;
  }
  return (
    <section className="py-4">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Topics</h2>
        {topics?.map((topic) => (
          <div
            key={topic._id}
            className="mb-4 p-4 border border-gray-200 rounded-md flex items-center justify-between"
          >
            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
            <Link href={`topics/${topic._id}`}>
              <button className="btn btn-primary">Explore</button>
            </Link>
          </div>
        ))}
      </div>
      <AddTopicForm />
    </section>
  );
};

export default TopicsPage;
