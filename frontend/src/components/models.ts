import {UserData} from "stores/userStore";

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  date_created: Date;
  date_updated: Date;
  author: UserData;
}
