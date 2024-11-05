import AddTopicForm from "@/components/AddTopicForm";
import DisplayTopics from "@/components/DisplayTopics";

export default async function Home() {
  return (
    <div className="container mx-auto px-8 py-3">
      <DisplayTopics />
      <AddTopicForm />
    </div>
  );
}
