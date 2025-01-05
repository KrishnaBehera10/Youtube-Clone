import { createContext, useState } from "react";
export const Auth = createContext();

function AuthContext({ children }) {
  const [Sidebar, setSidebar] = useState(false);
  const [category, setCategory] = useState(0);
  return (
    <Auth.Provider value={{ Sidebar, setSidebar, category, setCategory }}>
      {children}
    </Auth.Provider>
  );
}

export default AuthContext;
