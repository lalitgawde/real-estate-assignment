import { createContext, useState } from "react";
import { properties as mockProperties } from "../data/properties";

const PropertyContext = createContext({
  properties: [],
  addProperty: () => {},
  approveProperty: () => {},
  rejectProperty: () => {},
});

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);

  const addProperty = (property) => {
    setProperties((prev) => [
      ...prev,
      {
        ...property,
        id: Date.now().toString(),
        approved: false,
      },
    ]);
  };

  const approveProperty = (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approved: true } : p)),
    );
  };

  const rejectProperty = (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approved: false } : p)),
    );
  };

  return (
    <PropertyContext.Provider
      value={{ properties, addProperty, approveProperty, rejectProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;
