import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

const initialColumns = {
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
  'column-4': {
    id: 'column-4',
    title: 'Blocked',
    taskIds: ['task-7'],
  },
};

const initialTasks = {
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
  'task-7': {
    id: 'task-7',
    title: 'Initial project setup',
    description: 'Set up repository and development environment.',
    createdAt: new Date(),
  },
};

const initialColumnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

export const useKanbanStore = create(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: initialColumns,
      columnOrder: initialColumnOrder,

      addTask: (columnId, title, description) => {
        const newTaskId = `task-${nanoid(8)}`;

        set((state) => {
          const newTask = {
            id: newTaskId,
            title,
            description,
            createdAt: new Date(),
          };

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
          const sourceColumn = state.columns[sourceColumnId];
          const newSourceTaskIds = [...sourceColumn.taskIds];
          newSourceTaskIds.splice(newSourceTaskIds.indexOf(taskId), 1);

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

      resetBoard: () => {
        set(() => ({
          tasks: initialTasks,
          columns: initialColumns,
          columnOrder: initialColumnOrder,
        }));
      },
    }),
    {
      name: 'kanban-storage',
      version: 2,
      migrate: (persistedState, version) => {
        if (version < 2) {
          return {
            tasks: initialTasks,
            columns: initialColumns,
            columnOrder: initialColumnOrder,
          };
        }
        return persistedState;
      },
    }
  )
);
