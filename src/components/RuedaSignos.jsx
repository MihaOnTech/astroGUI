const signos = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];

const RuedaSignos = ({ offset }) => {
  return (
    <>
      {[...Array(12)].map((_, i) => {
        const angle = ((i * 30) - offset) * (Math.PI / 180); // Rotar según el offset
        const x = 250 + 230 * Math.cos(angle);
        const y = 250 + 230 * Math.sin(angle);
        return (
          <text key={i} x={x - 10} y={y + 5} fontSize="12" fill="black">
            {signos[i]}
          </text>
        );
      })}
    </>
  );
};

export default RuedaSignos;