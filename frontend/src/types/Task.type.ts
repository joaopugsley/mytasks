export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'InProgress' | 'Completed';
  created_at: Date;
  updated_at: Date;
  user_id: number;
}