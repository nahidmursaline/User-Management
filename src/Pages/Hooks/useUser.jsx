import { useEffect } from 'react';
import { useState } from 'react';

const useUser = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
        setLoading(false);
      });
  }, []);
  return [users, loading];
};

export default useUser;
