import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { useKanbanStore } from '../store/kanbanStore';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const KanbanBoard: React.FC = () => {
  const { tasks, columns, columnOrder, moveTask, reorderTasks } = useKanbanStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const activeTask = activeId ? tasks[activeId as string] : null;

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: { active: { id: string }; over: { id: string } | null }) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const draggedTaskId = active.id;
    const overId = over.id;

    let sourceColumnId = '';
    for (const columnId of columnOrder) {
      if (columns[columnId].taskIds.includes(draggedTaskId)) {
        sourceColumnId = columnId;
        break;
      }
    }

    if (columnOrder.includes(overId)) {
      const destinationColumnId = overId;
      const destinationColumn = columns[destinationColumnId];
      
      if (sourceColumnId !== destinationColumnId) {
        moveTask(draggedTaskId, sourceColumnId, destinationColumnId, destinationColumn.taskIds.length);
      }
    } else {
      let destinationColumnId = '';
      let destinationTaskIndex = -1;
      
      for (const columnId of columnOrder) {
        const taskIds = columns[columnId].taskIds;
        const index = taskIds.indexOf(overId);
        
        if (index >= 0) {
          destinationColumnId = columnId;
          destinationTaskIndex = index;
          break;
        }
      }

      if (sourceColumnId === destinationColumnId) {
        const sourceTaskIds = columns[sourceColumnId].taskIds;
        const sourceTaskIndex = sourceTaskIds.indexOf(draggedTaskId);
        
        if (sourceTaskIndex !== destinationTaskIndex) {
          reorderTasks(
            sourceColumnId,
            sourceTaskIndex,
            destinationTaskIndex
          );
        }
      } else {
        moveTask(draggedTaskId, sourceColumnId, destinationColumnId, destinationTaskIndex);
      }
    }

    setActiveId(null);
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedColumnId(null);
  };

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" color="gray.800">Product Development</Heading>
        <Text color="gray.500">Manage your project tasks and workflow</Text>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
                onAddTask={() => handleAddTask(column.id)}
              />
            );
          })}
        </SimpleGrid>

        <DragOverlay>
          {activeTask ? (
            <Box transform="rotate(3deg)" opacity={0.8}>
              <TaskCard task={activeTask} isDragging />
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showForm && selectedColumnId && (
        <TaskForm
          columnId={selectedColumnId}
          onClose={handleCloseForm}
        />
      )}
    </Box>
  );
};

export default KanbanBoard;