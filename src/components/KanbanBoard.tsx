import React from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onCreateTask: () => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskUpdate, onCreateTask }) => {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'review', title: 'Review', color: 'bg-purple-50' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex space-x-6 p-6 min-w-max">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <span className="bg-gray-200 text-gray-700 text-sm rounded-full px-2 py-0.5">
                    {columnTasks.length}
                  </span>
                </div>
                {column.id === 'todo' && (
                  <button
                    onClick={onCreateTask}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className={`${column.color} rounded-lg p-4 min-h-[600px]`}>
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onTaskUpdate={onTaskUpdate}
                    />
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>No tasks in {column.title.toLowerCase()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};