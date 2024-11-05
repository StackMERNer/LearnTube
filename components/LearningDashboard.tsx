"use client";
import useUserStore from "@/stores/useUserStore";
import React, { useEffect } from "react";

const LearningDashboard = () => {
  const { user } = useUserStore();

  useEffect(()=>{
    
  },[user])
  if (!user) {
    return null;
  }
  return <main className="shadow rounded-lg p-5">Learnings..</main>;
};

export default LearningDashboard;
