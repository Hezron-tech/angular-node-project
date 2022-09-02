export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Login{
  email: string;
  password: string;
  error:string
  message:string
  token:string
  Role:string
  
}

export interface NewProject {
  id: string
  name: string
  description: string
  date: string
  user_id: string
  issent: string
}
