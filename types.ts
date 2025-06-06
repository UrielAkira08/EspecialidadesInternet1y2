
export enum SpecializationId {
  COMPUTACION1 = "computacion1",
  COMPUTACION2 = "computacion2",
}

export enum ContentItemType {
  DEFINITION_GROUP = "definition_group",
  TEXT_BLOCK = "text_block",
  LIST = "list",
  HTML_EXAMPLE = "html_example",
  TASK_GROUP = "task_group",
  MEMORIZE_VERSE = "memorize_verse",
  SUB_HEADING = "sub_heading",
  QUESTION_ANSWER = "question_answer",
  HTML_TABLE_EXAMPLE = "html_table_example",
  IMAGE = "image",
}

export interface Definition {
  term: string;
  description: string;
  example?: string;
}

export interface DefinitionGroup {
  items: Definition[];
}

export interface TextBlock {
  text: string;
  isBold?: boolean;
  isCentered?: boolean;
}

export interface ListItem {
  text: string;
  subItems?: ListItem[];
  isBold?: boolean;
}

export interface HtmlExample {
  title?: string;
  code: string;
  explanation?: string;
  renderedImageUrl?: string; // e.g., https://picsum.photos/seed/html_example/600/400
}

export interface HtmlTableExample {
  title?: string;
  code: string;
  explanation?: string;
  renderedImageUrl?: string;
}

export interface Task {
  description: string;
  details?: string[];
  resources?: { text: string; url: string }[];
}

export interface TaskGroup {
  items: Task[];
}

export interface MemorizeVerse {
  reference: string;
  text: string;
  commentary?: string;
}

export interface SubHeading {
  text: string;
}

export interface QuestionAnswerItem {
    question: string;
    answer: string;
    subItems?: QuestionAnswerItem[];
}

export interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

export type ContentData = 
  | DefinitionGroup 
  | TextBlock 
  | { items: ListItem[] } // For LIST type
  | HtmlExample
  | HtmlTableExample
  | TaskGroup
  | MemorizeVerse
  | SubHeading
  | { items: QuestionAnswerItem[] } // For QUESTION_ANSWER type
  | ImageItem;


export interface ContentItem {
  type: ContentItemType;
  id: string; // unique id for keys
  title?: string; // Optional title for the item block itself
  content: ContentData;
}

export interface Section {
  id: string; // e.g., "c1s1"
  title: string;
  introduction?: string;
  items: ContentItem[];
}

export interface Specialization {
  id: SpecializationId;
  title: string;
  description: string;
  sections: Section[];
  quiz: Quiz;
}

// For Quiz
export interface QuizQuestionOption {
  id: string; // e.g., 'a', 'b', 'c'
  text: string;
}

export interface QuizQuestion {
  id: string; // e.g., 'c1q1'
  text: string;
  options: QuizQuestionOption[];
  correctAnswerId: string;
  explanation?: string;
}

export interface Quiz {
  id: SpecializationId;
  title: string;
  questions: QuizQuestion[];
}

export interface User {
  name: string;
  email: string; // Made email mandatory for sending results
}

export interface QuizAttempt {
  specializationId: SpecializationId;
  userName: string;
  userEmail: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>; // questionId: selectedOptionId
  timestamp: Date;
}
