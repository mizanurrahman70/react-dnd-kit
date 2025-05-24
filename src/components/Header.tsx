import React from 'react';
import { Box, Container, Flex, Button, IconButton, Heading, HStack } from '@chakra-ui/react';
import { LayoutGrid, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <Box as="header" bg="white" shadow="sm" py={4} px={6}>
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <LayoutGrid color="blue.500" size={24} />
            <Heading size="lg" color="gray.800">Jira Dashboard</Heading>
          </HStack>
          
      
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;