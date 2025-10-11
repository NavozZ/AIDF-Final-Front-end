const getAllHotels = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/hotels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch hotels");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllLocations = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllHotels, getAllLocations };
