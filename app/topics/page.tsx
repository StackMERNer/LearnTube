"use client";
import AddTopicForm from "@/components/AddTopicForm";
import { useTopics } from "@/hooks/useTopics";
import Image from "next/image";
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
        <div className="flex text-center items-center flex-col max-w-[600px] mx-auto pb-3">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Organize & Master Your Learning
          </h2>
          <p>
            Collect and organize essential YouTube playlists in one place.
            Whether you are diving into web development, design, or any new
            skill, keep track of your progress and stay focused without
            distractions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {topics?.map((topic) => (
            <div
              key={topic._id}
              className="mb-4  border border-gray-200 rounded-md flex justify-between flex-col overflow-hidden"
            >
              <div className="w-full h-[200px] rounded-b">
                {topic.thumbnail && (
                  <Image
                    alt={topic.title}
                    src={topic.thumbnail}
                    height={60}
                    width={200}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-2 pb-4">
                <Link href={`topics/${topic._id}`}>
                  <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                </Link>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  repellendus, qui asperiores adipisci sunt necessitatibus
                  itaque voluptates eos nobis ullam
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddTopicForm />
    </section>
  );
};

export default TopicsPage;
