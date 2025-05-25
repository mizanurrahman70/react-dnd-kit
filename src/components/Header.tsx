import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Collapse,
  useDisclosure,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react';
import { LayoutGrid, X, Plus, Check } from 'lucide-react';
import { useKanbanStore } from '../store/kanbanStore';

const Header: React.FC = () => {
  const addColumn = useKanbanStore((state) => state.addColumn);
  const [columnTitle, setColumnTitle] = useState('');
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleAddColumn = () => {
    if (!columnTitle.trim()) return;
    addColumn(columnTitle);
    setColumnTitle('');
    onClose();
  };

  const inputBg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box as="header" bg={useColorModeValue('white', 'gray.900')} shadow="sm" py={4} px={6}>
      <Container maxW="7xl">
        <Flex direction="row" justify="space-between" align="center" wrap="wrap">
          <Flex align="center" gap={3}>
            <Collapse in={isOpen} animateOpacity>
              <InputGroup size="sm" maxW="280px" transition="all 0.3s">
                <Input
                  placeholder="Enter column name"
                  value={columnTitle}
                  onChange={(e) => setColumnTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddColumn()}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="md"
                  pr="5rem"
                />
                <InputRightElement width="5rem">
                  <HStack spacing={1}>
                    <IconButton
                      icon={<Check size={16} />}
                      size="xs"
                      colorScheme="blue"
                      aria-label="Confirm"
                      onClick={handleAddColumn}
                    />
                    <IconButton
                      icon={<X size={16} />}
                      size="xs"
                      variant="ghost"
                      aria-label="Cancel"
                      onClick={() => {
                        onClose();
                        setColumnTitle('');
                      }}
                    />
                  </HStack>
                </InputRightElement>
              </InputGroup>
            </Collapse>

            {!isOpen && (
              <Button
                size="sm"
                colorScheme="blue"
                leftIcon={<Plus size={16} />}
                onClick={onToggle}
                variant="solid"
                borderRadius="md"
              >
                Add Column
              </Button>
            )}
          </Flex>

          <Heading
            size="md"
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
            display={['none', null, 'block']}
          >
            <Flex align="center" gap={2}>
              <LayoutGrid size={20} />
              Kanban Board
            </Flex>
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
