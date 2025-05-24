import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface SortableTaskCardProps {
  task: Task;
}

const SortableTaskCard: React.FC<SortableTaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
      {...attributes}
      {...listeners}
    >
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-slate-400 bg-opacity-0 group-hover:bg-opacity-20 rounded-full cursor-grab active:cursor-grabbing hidden md:block" />
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
};

export default SortableTaskCard;