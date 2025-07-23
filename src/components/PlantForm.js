import React, { useState } from "react";

function PlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      .then((plant) => {
        onAddPlant(plant);
        setFormData({ name: "", image: "", price: "" });
      });
  };

  return (
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
  );
}

export default PlantForm;
