import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleSoldOut }) {
  return (
    <div>
      {plants.length === 0 ? (
        <p>No plants found.</p>
      ) : (
        plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onToggleSoldOut={onToggleSoldOut}
          />
        ))
      )}
    </div>
  );
}

export default PlantList;
