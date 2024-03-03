import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


import useUser from '../Hooks/useUser';


const AllUsers = () => {
 const [users, loading, setUsers] = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [blockedUsers, setBlockedUsers] = useState({});
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

  

const handleBlockToggle = (userId) => {
  setBlockedUsers((prevBlockedUsers) => ({
    ...prevBlockedUsers,
    [userId]: !prevBlockedUsers[userId],
  }));
};

const handleDelete = (_id) => {
  console.log(_id);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/user/${_id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
            });
            const remaining = users?.filter((u) => u._id !== _id);
            setUsers(remaining);
          }
        });
    }
  });
}

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
     

<div className="w-full">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Action</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.photo} alt="Not Available" />
                      </div>
                    </div>
                  </td>
                  <td>{user?.firstName ? user.firstName : user?.name}</td>
                  <td> <Link to={`/userDetails/${user._id}`}>
                <button className="btn bg-blue-400 ">Details</button>
              </Link></td>
              <td>
              <Link>
                <button
                  onClick={() => handleDelete(user?._id)}
                  className="btn bg-red-400 "
                >
                  Delete
                </button>
              </Link>
              </td>
              <td>
              
            <Link>
            <button
          className="btn bg-green-400"
          onClick={() => handleBlockToggle(user._id)}
        >
          {blockedUsers[user?._id] ? 'Unblock' : 'Block'}
        </button>
      </Link>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;