import React, { useState, useEffect } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Fetch all plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new plant
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price),
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((newPlant) => {
        setPlants((prev) => [...prev, newPlant]);
        setFormData({ name: "", image: "", price: "" }); // reset form
      });
  };

  // Toggle Sold Out state for a plant (locally only)
  const toggleSoldOut = (id) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id
          ? { ...plant, soldOut: !plant.soldOut }
          : plant
      )
    );
  };

  // Filter plants by search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App" style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Plantsy Admin</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search plants by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 20 }}
      />

      {/* Add Plant Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        <h3>Add a New Plant</h3>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Plant
        </button>
      </form>

      {/* Plant List */}
      <div>
        {filteredPlants.length === 0 ? (
          <p>No plants found.</p>
        ) : (
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 5,
                backgroundColor: plant.soldOut ? "#f8d7da" : "white",
              }}
            >
              <img
                src={plant.image}
                alt={plant.name}
                style={{ width: 80, height: 80, objectFit: "cover", marginRight: 20 }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{plant.name}</h4>
                <p style={{ margin: "4px 0" }}>${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => toggleSoldOut(plant.id)}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: plant.soldOut ? "#dc3545" : "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  {plant.soldOut ? "Sold Out" : "Mark as Sold Out"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
