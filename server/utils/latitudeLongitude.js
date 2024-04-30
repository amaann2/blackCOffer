async function getLatLongByCountry(countryName) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];

      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      throw new Error("No results found for the specified country.");
    }
  } catch (error) {
    console.error("Error fetching latitude and longitude:", error.message);
    return null;
  }
}

module.exports = getLatLongByCountry;
