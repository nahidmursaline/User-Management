import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const UpdateUser = () => {
  const singleUser = useLoaderData();
  const { name, firstName, lastName, email, phone, photo, _id } = singleUser;

  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const photo = form.photo.value;

    const updatedUser = {
      firstName,
      lastName,
      photo,
      email,
      phone,
    };
    console.log(updatedUser);

    fetch(`https://user-management-server-bay.vercel.app/user/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          event.target.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Information Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Update User's Information: {firstName ? firstName : name}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    defaultValue={firstName ? firstName : name}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    defaultValue={lastName ? lastName : name}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="w-full md:w-1/2">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    readOnly
                    type="text"
                    name="email"
                    defaultValue={email}
                    placeholder="Email"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Phone Number</span>
                  </div>
                  <input
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    defaultValue={phone}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="w-full">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    required
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    defaultValue={photo}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            <input
              type="submit"
              value="Update User"
              className="btn  btn-error w-full  mt-8"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
