export interface Item {
  id?: string;
  name: string;
  units?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  items?: Item[];
  friends?: string[];
}


export type Items = Item[]