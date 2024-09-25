// src/components/DibujoSVG.jsx
import React from "react";
import { polarToCartesian } from "../utils/coordinates";
import { useCartaAstral } from "../contexts/CartaAstralContext"; // Importamos el contexto para actualizar el elemento seleccionado
import planetas from "../utils/planetas";  // Asegúrate de ajustar la ruta si es necesario



const DibujoSVG = () => {
  const { setElement, chart, getAiText } = useCartaAstral(); // Usamos la función selectElement del contexto

  const cx = 250; // Centro del gráfico en X
  const cy = 250; // Centro del gráfico en Y
  const radiusOuter = 250;
  const radiusInner = 50;
  const radiSignOuter = 220;
  const radiSignInner = 170;

  // Función para dibujar las líneas radiales
  const renderRadialLines = () => {
    return chart.signos.map((sign, index) => {
      const lineStart = polarToCartesian(cx, cy, radiSignInner, sign.angle); // Punto inicial de la línea
      const lineEnd = polarToCartesian(cx, cy, radiSignOuter, sign.angle); // Punto final de la línea

      return (
        <line
          key={`line-${index}`}
          x1={lineStart.x}
          y1={lineStart.y}
          x2={lineEnd.x}
          y2={lineEnd.y}
          stroke="black"
        />
      );
    });
  };

  // Función para renderizar los nombres de los signos
  const renderSignNames = () => {
    return chart.signos.map((sign, index) => {
      const textPos = polarToCartesian(cx, cy, 190, sign.angle - 15); // Posición del texto

      return (
        <text
          key={`sign-${index}`}
          x={textPos.x}
          y={textPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          style={{ cursor: "pointer" }}
          onClick={() => setElement(`${sign.name}`)}        >
          {sign.name}
        </text>
      );
    });
  };

  // Función para renderizar los planetas
  const renderPlanets = () => {
    return chart.planetas.map((planet, index) => {
      const pos = polarToCartesian(cx, cy, 130, chart.ariesPoint - planet.angle); // Posición del planeta
      const symbol = planetas[planet.name]; // Obtiene el símbolo del planeta

      return (
        <g key={`planet-${index}`} 
        onClick={() => { 
          setElement(`${planet.name}-${planet.signo}-${planet.house}`)
        }} 
        style={{ cursor: 'pointer' }}
        >
        {/* Caja transparente para aumentar el área clickeable del texto */}
        <rect
          x={pos.x - 12}
          y={pos.y - 12}
          width="24"
          height="24"
          fill="transparent"
        />
        <text
          x={pos.x}
          y={pos.y}
          fontSize="24"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {symbol}
        </text>
      </g>
      
      );
    });
  };

  const renderHouses = () => {
    return chart.casas.map((house, index) => {
      const lineStart = polarToCartesian(
        cx,
        cy,
        radiSignOuter,
        chart.ariesPoint - house.angle
      ); // Punto inicial de la línea
      const lineEnd = polarToCartesian(
        cx,
        cy,
        radiusOuter,
        chart.ariesPoint - house.angle
      ); // Punto final de la línea

      // Verificar si la casa es angular (AC, DC, IC, MC)
      const isAngular = ["AC", "DC", "IC", "MC"].includes(house.name);
      const stroke = isAngular ? "red" : "black"; // Si es angular, color rojo, de lo contrario, negro

      // Posicionar el nombre de la casa a 5º de la línea, usando un radio intermedio
      const angleForText = chart.ariesPoint - house.angle + 3; // 5º de desplazamiento
      const textPos = polarToCartesian(
        cx,
        cy,
        (radiSignOuter + radiusOuter) / 2,
        angleForText
      ); // Radio intermedio

      return (
        <g key={`house-${index}`} onClick={() => setElement(`${house.name}-${house.signo}`)}>
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke={stroke}
          /> 
          <text
            x={textPos.x}
            y={textPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill={stroke}
            style={{ cursor: "pointer" }}
           >
            {house.name}
          </text>
        </g>
      );
    });
  };

  return (
    <>
      {chart ? (
        <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dibujar los círculos concéntricos */}
          <circle cx={cx} cy={cy} r={radiSignOuter} stroke="black" fill="none" />
          <circle cx={cx} cy={cy} r={radiusInner} stroke="black" fill="none" />
          <circle cx={cx} cy={cy} r={radiSignInner} stroke="black" fill="none" />
  
          {/* Renderizar las líneas radiales */}
          {renderRadialLines()}
  
          {/* Renderizar los nombres de los signos */}
          {renderSignNames()}
  
          {/* Renderizar los planetas */}
          {renderPlanets()}
  
          {/* Renderizar las casas */}
          {renderHouses()}
        </svg>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Crea una Nueva Carta</p>
        </div>
      )}
    </>
  );
  
};

export default DibujoSVG;
