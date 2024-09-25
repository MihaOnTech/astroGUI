import React from 'react';
import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { useCartaAstral } from '../contexts/CartaAstralContext';
import { PlanetSignHouse } from '../services/api'; // Importar la función de API
import planetasCompletos from '../data/planetas_completos.json';  // Importar el JSON de textos

const TextViewer = () => {
  const { element, text } = useCartaAstral();  // Obtener el elemento seleccionado del contexto
  
  if (!element) {
    return (
      <Box bg="gray.500" flex={1} p={4}>
        <Text fontSize="2xl" mb={4}>Seleccione un elemento</Text>
        <Text>Aquí se mostrará la descripción del elemento seleccionado.</Text>
      </Box>
    );
  }

  // Dividir el elemento seleccionado para obtener planeta y signo
  const [planeta, signo, casa] = element.split('-');

  // Obtener la descripción del planeta y del planeta en el signo
  const planetaData = planetasCompletos[planeta];
  const descripcionPlaneta = planetaData?.descripcion || 'Descripción no disponible';
  const descripcionEnSigno = planetaData?.signos?.[signo] || `Texto no disponible para ${planeta} en ${signo}`;

  return (
    <Box bg="gray.500" flex={1} p={4}>
      <Text fontSize="2xl" mb={4}>{element}</Text>

      {/* Acordeones */}
      <Accordion allowToggle>
        {/* Primer acordeón: Descripción del Planeta */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {planeta} - Descripción General
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {descripcionPlaneta}
          </AccordionPanel>
        </AccordionItem>

        {/* Segundo acordeón: Descripción del Planeta en el Signo */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {planeta} en {signo}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {descripcionEnSigno}
          </AccordionPanel>
        </AccordionItem>

        {/* Tercer acordeón: Texto vacío para Planeta en el Signo en la Casa */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {planeta} en {signo} en la Casa {casa}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {text}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default TextViewer;
