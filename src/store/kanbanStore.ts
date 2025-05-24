import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { KanbanState, Task, Column } from '../types';

// Initial data for the kanban board
const initialColumns: Record<string, Column> = {
  'column-1': {
    id: 'column-1',
    title: 'To Do',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-4', 'task-5'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Done',
    taskIds: ['task-6'],
  },
};

const initialTasks: Record<string, Task> = {
  'task-1': {
    id: 'task-1',
    title: 'Research user needs',
    description: 'Conduct interviews and surveys to understand user pain points.',
    createdAt: new Date(),
  },
  'task-2': {
    id: 'task-2',
    title: 'Create wireframes',
    description: 'Design low-fidelity wireframes for key app screens.',
    createdAt: new Date(),
  },
  'task-3': {
    id: 'task-3',
    title: 'Define MVP features',
    description: 'Identify core features for the minimum viable product.',
    createdAt: new Date(),
  },
  'task-4': {
    id: 'task-4',
    title: 'Frontend development',
    description: 'Build UI components and implement business logic.',
    createdAt: new Date(),
  },
  'task-5': {
    id: 'task-5',
    title: 'API integration',
    description: 'Connect frontend with backend services.',
    createdAt: new Date(),
  },
  'task-6': {
    id: 'task-6',
    title: 'Initial project setup',
    description: 'Set up repository and development environment.',
    createdAt: new Date(),
  },
};

const initialColumnOrder = ['column-1', 'column-2', 'column-3'];

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: initialColumns,
      columnOrder: initialColumnOrder,

      addTask: (columnId, title, description) => {
        const newTaskId = `task-${nanoid(8)}`;
        
        set((state) => {
          // Create new task
          const newTask: Task = {
            id: newTaskId,
            title,
            description,
            createdAt: new Date(),
          };

          // Add task to the specified column
          const updatedColumn = {
            ...state.columns[columnId],
            taskIds: [newTaskId, ...state.columns[columnId].taskIds],
          };

          return {
            tasks: {
              ...state.tasks,
              [newTaskId]: newTask,
            },
            columns: {
              ...state.columns,
              [columnId]: updatedColumn,
            },
          };
        });
      },

      moveTask: (taskId, sourceColumnId, destinationColumnId, newIndex) => {
        set((state) => {
          // Remove from source column
          const sourceColumn = state.columns[sourceColumnId];
          const newSourceTaskIds = [...sourceColumn.taskIds];
          newSourceTaskIds.splice(newSourceTaskIds.indexOf(taskId), 1);

          // Add to destination column
          const destinationColumn = state.columns[destinationColumnId];
          const newDestinationTaskIds = [...destinationColumn.taskIds];
          newDestinationTaskIds.splice(newIndex, 0, taskId);

          return {
            columns: {
              ...state.columns,
              [sourceColumnId]: {
                ...sourceColumn,
                taskIds: newSourceTaskIds,
              },
              [destinationColumnId]: {
                ...destinationColumn,
                taskIds: newDestinationTaskIds,
              },
            },
          };
        });
      },

      reorderTasks: (columnId, startIndex, endIndex) => {
        set((state) => {
          const column = state.columns[columnId];
          const newTaskIds = [...column.taskIds];
          const [removed] = newTaskIds.splice(startIndex, 1);
          newTaskIds.splice(endIndex, 0, removed);

          return {
            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: newTaskIds,
              },
            },
          };
        });
      },
    }),
    {
      name: 'kanban-storage',
    }
  )
);