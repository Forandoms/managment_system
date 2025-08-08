import React from 'react';
import { Calendar, MessageCircle, Paperclip, MoreHorizontal } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdate }) => {
  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-gray-50 border-gray-200',
    'in-progress': 'bg-blue-50 border-blue-200',
    review: 'bg-purple-50 border-purple-200',
    completed: 'bg-green-50 border-green-200',
  };

  const handleStatusChange = () => {
    const statusFlow = {
      'todo': 'in-progress',
      'in-progress': 'review',
      'review': 'completed',
      'completed': 'todo'
    };
    onTaskUpdate(task.id, { 
      status: statusFlow[task.status] as Task['status'],
      updatedAt: new Date()
    });
  };

  const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== 'completed';

  return (
    <div className={`bg-white rounded-lg border-2 p-4 cursor-pointer hover:shadow-md transition-all ${statusColors[task.status]} group`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1 pr-2">
          {task.title}
        </h3>
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all">
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 text-xs rounded-md font-medium ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        {task.dueDate && (
          <div className={`flex items-center space-x-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
            <Calendar className="h-3 w-3" />
            <span>
              {task.dueDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-gray-500">
            <MessageCircle className="h-3 w-3" />
            <span className="text-xs">2</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Paperclip className="h-3 w-3" />
            <span className="text-xs">1</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {task.assignee && (
            <div className="relative">
              <img
                src={task.assignee.avatar}
                alt={task.assignee.name}
                className="h-6 w-6 rounded-full object-cover"
                title={task.assignee.name}
              />
              {task.assignee.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-green-500 border border-white rounded-full"></div>
              )}
            </div>
          )}
          
          <button
            onClick={handleStatusChange}
            className="text-xs px-2 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {task.status === 'completed' ? 'Reopen' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};