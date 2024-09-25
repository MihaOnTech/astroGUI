// src/components/Header.jsx
import React from 'react';
import {
  Box,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NewCartaModal from './NewCartaModal';  // Importamos el nuevo modal

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controla el modal

  return (
    <Box bg="gray.800" color="white" p={4}>
      <HStack spacing={8}>
        {/* Menu Archivo */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Archivo
          </MenuButton>
          <MenuList color={"black"} bgColor={"gray.400"}>
            <MenuItem bgColor={"gray.400"} onClick={onOpen}>Nuevo</MenuItem>
            <MenuItem bgColor={"gray.400"}>Abrir</MenuItem>
            <MenuItem bgColor={"gray.400"}>Descargar</MenuItem>
            <MenuItem bgColor={"gray.400"}>Eliminar</MenuItem>
          </MenuList>
        </Menu>

        <Text>Editar</Text>
        <Text>Herramientas</Text>
        <Text>Ayuda</Text>
      </HStack>

      {/* Modal para "Nuevo" */}
      <NewCartaModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
