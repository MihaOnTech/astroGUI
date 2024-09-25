// Convierte de coordenadas polares a cartesianas
export const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
    const x = cx + radius * Math.cos(angleInRadians);
    const y = cy + radius * Math.sin(angleInRadians);
    return { x, y };
  };
  
  // Convierte de coordenadas cartesianas a polares (opcional si es necesario)
  export const cartesianToPolar = (cx, cy, x, y) => {
    const dx = x - cx;
    const dy = y - cy;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const angleInRadians = Math.atan2(dy, dx);
    let angleInDegrees = (angleInRadians * 180) / Math.PI + 90;
    if (angleInDegrees < 0) angleInDegrees += 360;
    return { radius, angleInDegrees };
  };
  