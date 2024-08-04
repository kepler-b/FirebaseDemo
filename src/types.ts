export interface Item {
  id?: string;
  name: string;
  units?: number;
}

export interface User {
  email: string,
  displayName: string,
  emailVerified: boolean,
  uid: string,
  photoURL: string | null,
  isAnonymous: boolean,
  items?: Item[];
  friends?: string[];
}


export type Items = Item[]