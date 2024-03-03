import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { app } from '../../Firebase/firebase.config';

import { AuthContext } from '../provider/AuthProvider';


const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

const {signIn, user} = useContext(AuthContext)

const navigate = useNavigate();


const handleGoogleSignin = ()=>{
  signInWithPopup(auth, googleProvider)
  .then(result => {
    const user = result.user;

    const savedUser = {name:user?.displayName, email: user?.email, photo: user?.photoURL}

            fetch('http://localhost:5000/user',{
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(savedUser)
            })
            .then(res => res.json())
            .then(() => {
              
                Swal.fire({
                  title: `${user?.displayName} Login Successfully`,
                  showClass: {
                    popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
                  },
                  hideClass: {
                    popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
                  },
                });
                navigate('/')
              
            })

//     Swal.fire({
//       title: `${user?.displayName} Login Successfully`,
//       showClass: {
//         popup: `
//   animate__animated
//   animate__fadeInUp
//   animate__faster
// `,
//       },
//       hideClass: {
//         popup: `
//   animate__animated
//   animate__fadeOutDown
//   animate__faster
// `,
//       },
//     });
//     navigate('/')
  })
  .catch(error => {
    console.log('error', error.message);
  })
}



    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        
        const email = form.email.value;
        const password = form.password.value;
        console.log( email,password);

        signIn(email, password)
        .then(result => {
            const user = result.user;
            Swal.fire({
              title: `${user?.displayName} Login Successfully`,
              showClass: {
                popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
              },
              hideClass: {
                popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
              },
            });
            navigate('/')
            console.log(user);
        })
        .catch(error=> console.log(error))
    }


    return (
        <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content w-1/2 ">
         
          <div className="card flex-shrink-2 w-full max-w-sm shadow-2xl bg-base-100 ">
            <div className="card-body ">
            <h1 className="text-3xl text-center font-bold">Login Now!</h1>
            <form onSubmit={handleLogin}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" name='password' placeholder="password" className="input input-bordered" required/>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
               
                <input className="btn btn-error" type='submit' value= 'Login'></input><br />
                <button onClick={handleGoogleSignin} className="btn btn-error mb-6">Google Login</button>
               
              </div>
            </form>
            <p className='text-center my-4'>New to User Management? <Link className=' text-red-600 ' to='/signup'>Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;