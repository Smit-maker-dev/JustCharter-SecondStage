import React, { createContext, useContext } from "react";

const SurfaceContext = createContext("light");

export const SurfaceProvider = ({ surface = "light", children }) => (
  <SurfaceContext.Provider value={surface}>
    <div data-surface={surface} className="contents">
      {children}
    </div>
  </SurfaceContext.Provider>
);

export const useSurface = () => useContext(SurfaceContext);
export default SurfaceContext;
