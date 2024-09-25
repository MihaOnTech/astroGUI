// src/contexts/CartaAstralContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlanetSignHouse } from '../services/api';

const CartaAstralContext = createContext();

export const useCartaAstral = () => {
  return useContext(CartaAstralContext);
};

export const CartaAstralProvider = ({ children }) => {
  const [cartas, setCartas] = useState([]); // Array de cartas astrales
  const [chart, setChart] = useState();
  const [element, setElement] = useState();
  const [text, setText] = useState("");

  // Función para agregar una nueva carta
  const addCarta = (carta) => {
    console.log('Carta Nueva: ', carta)
    setCartas([...cartas, carta]);
  };

  // Función para agregar una nueva carta
  const getAiText = async (set) => {
    //const response = {texto: "NO IA"}
    const response = await PlanetSignHouse(set)
    setText(response.texto);
  };

  useEffect(() => {
    if (element) {
      getAiText(element); 
    }
  }, [element]);

  return (
    <CartaAstralContext.Provider value={{ cartas, addCarta, chart, setChart, element, setElement, text }}>
      {children}
    </CartaAstralContext.Provider>
  );
};
