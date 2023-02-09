import React, { createContext, useState, useEffect } from 'react';

export const UsersContext = createContext([]);

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const fetchedUsers = await res.json();
      setUsers(fetchedUsers);
      console.log('fetchUsers z App component')
    }
    fetchData();
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  );
}
