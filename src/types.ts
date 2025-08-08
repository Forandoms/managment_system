export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isOnline: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  members: User[];
  taskCount: number;
  completedTasks: number;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_completed' | 'task_assigned' | 'comment_added';
  user: User;
  task: Task;
  timestamp: Date;
  description: string;
}