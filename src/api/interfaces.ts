export interface Topic {
  createdAt: Date;
  id: number;
  title: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  createdAt: Date;
  id: number;
  title: string;
  paraOne: string;
  paraTwo: string;
  topic?: Topic;
}
