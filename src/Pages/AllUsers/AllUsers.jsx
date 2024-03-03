import React, { useState } from 'react';
import AllUsersCard from '../AllUsersCard/AllUsersCard';

import useUser from '../Hooks/useUser';


const AllUsers = () => {
 const [users, loading] = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="loading">
        <p>Loading Users...</p>
      </div>
    );
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold pb-10 pt-16 text-center">All The Users</h2>
      <input
        type="text"
        placeholder="Search By User Email"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7">
        {filteredUsers.map((user) => (
          <AllUsersCard key={user._id} user={user}></AllUsersCard>
        ))}
        
      </div>
    </div>
  );
};

export default AllUsers;