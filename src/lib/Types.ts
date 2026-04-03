export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
export type AuthState = {
  user: User | null;
  error: string | null;
  loading: boolean;
};

export type SingUpdate = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SingInData = {
  email: string;
  password: string;
};
export type updateuserData = {
  username: string;
  email: string;
  role: "user" | "admin";
};
