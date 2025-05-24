import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { VStack, Box, Text, Button, HStack, Badge } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { Column as ColumnType, Task } from '../types';
import SortableTaskCard from './SortableTaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onAddTask }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const getColumnColor = (title: string) => {
    switch (title) {
      case 'To Do':
        return 'gray';
      case 'In Progress':
        return 'blue';
      case 'Done':
        return 'green';
      default:
        return 'gray';
    }
  };

  const color = getColumnColor(column.title);

  return (
    <Box
      ref={setNodeRef}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      <HStack
        p={4}
        bg={`${color}.50`}
        borderTopRadius="lg"
        justify="space-between"
      >
        <HStack>
          <Text fontWeight="semibold" color={`${color}.700`}>{column.title}</Text>
          <Badge colorScheme={color} variant="subtle" rounded="full" px={2}>
            {tasks.length}
          </Badge>
        </HStack>
        <Button
          size="sm"
          variant="ghost"
          colorScheme={color}
          onClick={onAddTask}
          aria-label={`Add task to ${column.title}`}
        >
          <Plus size={16} />
        </Button>
      </HStack>
      
      <Box p={2} flex="1" overflowY="auto" maxH="calc(100vh - 250px)">
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length > 0 ? (
            <VStack spacing={2} align="stretch">
              {tasks.map(task => (
                <SortableTaskCard key={task.id} task={task} />
              ))}
            </VStack>
          ) : (
            <Box
              h="24"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.400"
              fontSize="sm"
              fontStyle="italic"
              borderWidth="2px"
              borderStyle="dashed"
              borderColor="gray.200"
              borderRadius="md"
            >
              No tasks yet
            </Box>
          )}
        </SortableContext>
      </Box>
    </Box>
  );
};

export default Column;