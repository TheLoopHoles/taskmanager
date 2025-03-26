import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending', progress: 0 });

  const addTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ title: '', description: '', status: 'Pending', progress: 0 });
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const updateProgress = (id, progress) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, progress } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
        <div className="flex gap-4 mb-6">
          <Input 
            placeholder="Task Title" 
            value={newTask.title} 
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
          />
          <Textarea 
            placeholder="Task Description" 
            value={newTask.description} 
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
          />
          <Button onClick={addTask}>Add Task</Button>
        </div>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <motion.div 
              key={task.id}
              className="p-4 bg-white shadow-lg rounded-lg"
              whileHover={{ scale: 1.05 }}>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <Button 
                    onClick={() => updateTaskStatus(task.id, 'In Progress')} 
                    variant="outline"
                  >In Progress</Button>
                  <Button 
                    onClick={() => updateTaskStatus(task.id, 'Completed')} 
                    variant="outline" 
                    className="ml-2"
                  >Completed</Button>
                </div>
                <Button onClick={() => deleteTask(task.id)} variant="destructive">Delete</Button>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Progress: {task.progress}%</label>
                <Slider 
                  value={[task.progress]} 
                  onValueChange={(value) => updateProgress(task.id, value[0])}
                  max={100} 
                />
                <div className="w-full bg-gray-200 rounded h-4 mt-2">
                  <div 
                    className="h-full bg-blue-500 rounded" 
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
              <p className="mt-2 text-sm">Status: <span className="font-bold">{task.status}</span></p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
