import { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
