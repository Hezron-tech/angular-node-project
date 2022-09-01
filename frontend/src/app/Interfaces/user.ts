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

// export interface Root {
//   user_id: string
//   username: string
//   email: string
//   password: string
//   Role: string
//   assigned: string
// }
