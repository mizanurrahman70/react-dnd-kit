import React from 'react';
import { Box, Text, HStack, Tag } from '@chakra-ui/react';
import { Calendar } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging = false }) => {
  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box
      bg="white"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor={isDragging ? 'blue.300' : 'gray.200'}
      _hover={{ borderColor: 'gray.300' }}
      transition="all 0.2s"
      userSelect="none"
      shadow={isDragging ? 'md' : 'none'}
    >
      <Text fontWeight="medium" color="gray.800" fontSize="sm" mb={2}>
        {task.title}
      </Text>
      <Text color="gray.600" fontSize="xs" mb={3} noOfLines={2}>
        {task.description}
      </Text>
      <HStack justify="space-between" fontSize="xs" color="gray.500">
        <HStack>
          <Calendar size={12} />
          <Text>{formatDate(task.createdAt)}</Text>
        </HStack>
        <Tag size="sm" colorScheme="blue" variant="subtle">
          Task
        </Tag>
      </HStack>
    </Box>
  );
};

export default TaskCard;