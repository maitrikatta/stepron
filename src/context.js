import { createContext, useContext, useEffect, useState } from 'react';
import data from './database/populate';
const AppContext = createContext();

function ContextData({ children }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('userr')) {
      localStorage.setItem('userr', JSON.stringify(data));
    }
    const local = JSON.parse(localStorage.getItem('userr'));
    setUsers(local);
  }, []);
  return (
    <AppContext.Provider value={{ users, setUsers }}>
      {children}
    </AppContext.Provider>
  );
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export default ContextData;
