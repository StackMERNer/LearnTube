export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}


// example use : 
// import { ApiResponse, UserResponse } from "@/types/api";

// async function getUser(id: string): Promise<ApiResponse<UserResponse>> {
//   const response = await fetch(`/api/users/${id}`);
//   return response.json();
// }