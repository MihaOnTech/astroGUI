const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

export async function fetchChartData(name, date, time, location) {
  const response = await fetch(`${backendUrl}/natal_chart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      date,
      time,
      location,
    }),
  });

  const data = await response.json();
  return data;
}

export async function PlanetSignHouse(set) {
  const response = await fetch(`${backendUrl}/ia/planeta-signo-casa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userInput: set
    }),
  });
  console.log(response);
  const data = await response.json();
  return data;
}
