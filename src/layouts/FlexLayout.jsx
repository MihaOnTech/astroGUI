// src/layouts/FlexLayout.jsx
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const FlexLayout = ({ Header, FileTree, DibujoSVG, TextViewer }) => {
  return (
    <Flex direction="column" h="100vh">
      {/* Top Menu */}
      {Header && <Header />}

      {/* Cuerpo principal de la FlexLayout */}
      <Flex flex={1}>
        {/* Menú lateral con el árbol de archivos */}
        <Box bg="gray.800" w="20%" p={4} borderRight="1px solid gray">
          {FileTree && <FileTree />}
        </Box>

        {/* Paneles redimensionables */}
        <Flex flex={1} direction="row">
          {/* Panel de la carta astral */}
          <ResizableBox
            className="react-resizable"
            width={800}
            height={Infinity}
            minConstraints={[400, Infinity]}
            maxConstraints={[1000, Infinity]}
            resizeHandles={["e"]}
          >
            <Box bg="gray.400" h="100%" p={4}>
              <Text fontSize="2xl" mb={4}>Visor de Carta Astral</Text>
              {DibujoSVG && <DibujoSVG />}
            </Box>
          </ResizableBox>

          {/* Panel de texto */}
          {TextViewer && <TextViewer />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FlexLayout;
