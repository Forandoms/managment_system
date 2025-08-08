import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { CreateTaskModal } from './components/CreateTaskModal';
import { mockUsers, mockProjects, mockTasks, mockActivities } from './data/mockData';
import { Task } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [tasks, setTasks] = useState(mockTasks);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  
  const currentUser = mockUsers[0]; // Simulate current user

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleCreateTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'tasks':
        return (
          <KanbanBoard
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onCreateTask={() => setIsCreateTaskModalOpen(true)}
          />
        );
      case 'dashboard':
      default:
        return (
          <Dashboard
            projects={mockProjects}
            tasks={tasks}
            activities={mockActivities}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        projects={mockProjects}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentUser={currentUser}
          onCreateTask={() => setIsCreateTaskModalOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        users={mockUsers}
      />
    </div>
  );
}

export default App;