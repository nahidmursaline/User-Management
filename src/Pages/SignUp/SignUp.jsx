import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';


const SignUp = () => {


    const {createUser, profileUpdate} = useContext(AuthContext)


    const [error, setError] = useState('')

    const navigate = useNavigate();


    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        console.log(name, email,password,photo);

        createUser(email,password)
        .then(result => {
            const user = result.user
            console.log(user);

            setError('')
            event.target.reset();
            navigate('/login')
            profileUpdate({displayName: name, photoURL: photo})
        })
        .catch(error => {
          console.log(error)
        setError(error.message)
        })


    }

    return (
        <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content w-1/2 ">
         
          <div className="card flex-shrink-2 w-full max-w-sm shadow-2xl bg-base-100 ">
            <div className="card-body ">
            <h1 className="text-3xl text-center font-bold">Sign Up Now!</h1>
            <form onSubmit={handleSignUp}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="Name" className="input input-bordered" required/>
              </div>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" required/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" name='password' placeholder="password" className="input input-bordered" required/>
               
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" required/>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
               
                <input className="btn btn-error" type='submit' value= 'Sign Up'></input>
              </div>
              <p className="text-red-500 mt-4">
                {error}
              </p>
            </form>
            <p className='text-center my-4'>Already Have an Account? <Link className=' text-red-600 ' to='/login'>Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;