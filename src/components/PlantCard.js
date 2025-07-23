import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <div
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
          onClick={() => onToggleSoldOut(plant.id)}
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
  );
}

export default PlantCard;
