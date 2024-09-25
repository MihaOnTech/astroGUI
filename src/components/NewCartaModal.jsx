import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input
} from '@chakra-ui/react';
import { useCartaAstral } from '../contexts/CartaAstralContext';
import { fetchChartData } from '../services/api'; // Importar la función de API
import { transformData } from '../utils/transformChartData'; // Importar la función de transformación

const NewCartaModal = ({ isOpen, onClose }) => {
  const { addCarta, setChart } = useCartaAstral(); // Acceder al contexto para agregar carta
  const [name, setName] = useState('Mikito');
  const [date, setDate] = useState('05/02/93');
  const [time, setTime] = useState('3:30');
  const [location, setLocation] = useState('Zaragoza, España');

  // Función para manejar la creación de una nueva carta
  const handleCreate = async () => {
    const data = {
      name, 
      date,  
      time,  
      location,  
    };

    // Hacer la petición API al servidor
    const serverResponse = await fetchChartData(name, date, time, location);

    if (serverResponse) {
      // Usar la función de transformación de los datos del servidor
      const transformedData = transformData(serverResponse);

      // Definir una nueva carta
      const carta = {
        nombre: name,
        ariesPoint: transformedData.houses[0].angle - 90,
        planetas: transformedData.planets,
        casas: transformedData.houses,
        signos: transformedData.signs
      }

      // Agregar la nueva carta al contexto
      addCarta(carta);
      setChart(carta);

      onClose(); // Cerrar el modal después de crear la carta
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Nueva Carta Astral</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="Nombre de la Carta" 
            mb={3} 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            placeholder="Fecha de Nacimiento (DD/MM/AA)" 
            mb={3} 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input 
            placeholder="Hora de Nacimiento (HH:MM)" 
            mb={3} 
            value={time}
            default={"3:30"}
            
            onChange={(e) => setTime(e.target.value)}
          />
          <Input 
            placeholder="Lugar de Nacimiento (Ciudad, País)" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Crear
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewCartaModal;
