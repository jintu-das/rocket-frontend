import API from "./index";
import { Subtopic, Topic } from "./interfaces";

export async function getTopics(): Promise<Topic[]> {
  const response = await API.get("topics");
  return response.data;
}

export async function getSubtopics(id: number): Promise<Subtopic[]> {
  const response = await API.get(`topics/${id}/subtopics`);
  return response.data;
}

export async function searchSubtopics(searchTerm: string): Promise<Subtopic[]> {
  const response = await API.get(`subtopics/search/?title=${searchTerm}`);
  return response.data;
}
