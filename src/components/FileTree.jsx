// src/components/FileTree.jsx
import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, List, ListItem, Text } from '@chakra-ui/react';
import { useCartaAstral } from '../contexts/CartaAstralContext';

const FileTree = () => {
  const { cartas, setElement } = useCartaAstral(); // Acceder a las cartas del contexto

  if (!cartas || cartas.length === 0) {
    return <Text>No hay cartas disponibles</Text>; // Mostrar un mensaje si no hay cartas
  }

  return (
    <Box>
      {cartas.map((carta, cartaIndex) => (
        <Accordion allowMultiple key={cartaIndex} bg={"gray.500"}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {carta.nombre}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Planetas
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={2}>
                      {carta.planetas.map((planet, planetIndex) => (
                        <ListItem
                          key={planetIndex}
                          _hover={{ cursor: 'pointer', color: 'blue.500' }}
                          onClick={() => setElement(`${planet.name}-${planet.signo}-${planet.house}`)}
                        >
                          {planet.name} en {planet.signo}
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Casas
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={2}>
                      {carta.casas.map((casa, casaIndex) => (
                        <ListItem
                          key={casaIndex}
                          _hover={{ cursor: 'pointer', color: 'blue.500' }}
                          onClick={() => setElement(`${casa.name}-${casa.signo}`)}
                        >
                          {casa.signo} en la casa {casa.name}
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export default FileTree;
