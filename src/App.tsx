import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import KanbanBoard from './components/KanbanBoard';
import Header from './components/Header';

function App() {
  return (
    <VStack minH="100vh" spacing={0} bg="gray.50">
      <Header />
      <Box flex="1" p={[4, 6, 8]} maxW="7xl" w="full" as="main">
        <KanbanBoard />
      </Box>
      <Box as="footer" p={4} textAlign="center" color="gray.500" fontSize="sm">
        <p>Built with DND Kit and React • {new Date().getFullYear()}</p>
      </Box>
    </VStack>
  );
}

export default App;