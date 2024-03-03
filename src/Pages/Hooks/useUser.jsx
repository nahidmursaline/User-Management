import { useEffect } from 'react';
import { useState } from 'react';

const useUser = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://user-management-server-bay.vercel.app/user')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
        setLoading(false);
      });
  }, []);
  return [users, loading, setUsers];
};

export default useUser;
