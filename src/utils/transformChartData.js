import planetTranslate from './planetTranslation'

export const transformData = (serverData) => {
    const ariesPoint = serverData.houses[0][0].Posicion - 90; // Calculamos el ariesPoint
  
    // Los signos se calculan en base al ariesPoint, cada uno cubre un ángulo de 30 grados
    const signs = [
      { name: "Aries", angle: ariesPoint - 0, planets: [] },
      { name: "Tauro", angle: ariesPoint - 30, planets: [] },
      { name: "Geminis", angle: ariesPoint - 60, planets: [] },
      { name: "Cancer", angle: ariesPoint - 90, planets: [] },
      { name: "Leo", angle: ariesPoint - 120, planets: [] },
      { name: "Virgo", angle: ariesPoint - 150, planets: [] },
      { name: "Libra", angle: ariesPoint - 180, planets: [] },
      { name: "Escorpio", angle: ariesPoint - 210, planets: [] },
      { name: "Sagitario", angle: ariesPoint - 240, planets: [] },
      { name: "Capricornio", angle: ariesPoint - 270, planets: [] },
      { name: "Acuario", angle: ariesPoint - 300, planets: [] },
      { name: "Piscis", angle: ariesPoint - 330, planets: [] },
    ];
  
    // Transformar los datos de los planetas desde el servidor
    const planets = serverData.planets.map((planet) => ({
      name: planetTranslate[planet.Planeta] || planet.Planeta,
      angle: planet.Posicion,
      signo: planet.Signo,
      mode: planet.Retrogrado,
      house: ""
    }));
  
    // Transformar los datos de las casas desde el servidor
    const houses = serverData.houses[0].map((house, index) => {
      const casaName = [
        "AC", "II", "III", "IC", "V", "VI", "DC", "VIII", "IX", "MC", "XI", "XII"
      ][index];
      
      return {
        name: casaName,
        angle: house.Posicion,
        signo: house.Signo,
        planets: []
      };
    });
  
    // Asignar planetas a casas
    planets.forEach((planet) => {
      houses.forEach((house, index) => {
        const nextHouse = houses[(index + 1) % houses.length]; 
        const houseStart = house.angle;
        const houseEnd = nextHouse.angle > houseStart
          ? nextHouse.angle
          : nextHouse.angle + 360;
  
        const planetAngle = planet.angle >= houseStart && planet.angle < houseEnd
          ? planet.angle
          : (planet.angle + 360);
  
        if (planetAngle >= houseStart && planetAngle < houseEnd) {
          house.planets.push(planet); 
          planet.house = house.name;
        }
      });
    });
  
    // Asignar los planetas a los signos correspondientes
    planets.forEach((planet) => {
      const signo = signs.find((sign) => sign.name === planet.signo);
      if (signo) {
        signo.planets.push(planet);
      }
    });

    return {
      signs,
      planets,
      houses,
    };
  };
  