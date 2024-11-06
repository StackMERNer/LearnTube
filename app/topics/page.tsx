import AddTopicForm from "@/components/AddTopicForm";
import DisplayTopics from "@/components/DisplayTopics";
import React from "react";

const TopicsPage = () => {
  return (
    <section className="py-4">
      <DisplayTopics />
      <AddTopicForm />
    </section>
  );
};

export default TopicsPage;
