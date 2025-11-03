
export interface Example {
  title: string;
  description: string;
  code: string;
  visual: string;
}

export interface Lesson {
  title:string;
  concepts: string[];
  example: Example;
  tools?: string[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}
   