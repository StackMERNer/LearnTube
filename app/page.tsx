import AddTopicForm from "@/components/AddTopicForm";
import DisplayTopics from "@/components/DisplayTopics";
import LearningDashboard from "@/components/LearningDashboard";

export default async function Home() {
  return (
    <div className="container mx-auto px-8 py-3">
      <LearningDashboard />
      <DisplayTopics />
      <AddTopicForm />
    </div>
  );
}
