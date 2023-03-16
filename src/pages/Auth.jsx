import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
import {
  login, logout, selectUser
} from '../app/stores/auth';
import { auth } from '../api/auth';

const Auth = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleLoginFormChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterFormChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    // perform login API call using loginForm values

    auth.login(loginForm)
      .then((response) => {
        dispatch(login({ user: response.data.user, token: response.data.token }));
        navigate("/feed");
      })
      .catch((error) => {
        return setError(
          "Invalid email or password."
        );
      });
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    // perform registration API call using registerForm values

    auth.register(registerForm)
      .then((response) => {
        dispatch(login({ user: response.data.user, token: response.data.token }));
        return navigate("/feed");
      })
      .catch((error) => {
        return setError(
          error.response.data.message
        );
      });
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError(null);
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      {
        (user == null) ? (
          <>

            <div className="bg-white p-8 rounded shadow-lg w-full">
              <h1 className="text-center text-2xl font-bold mb-8">
                {isLoginForm ? 'Login' : 'Register'}
              </h1>
              {error && (
                <div className="mb-4">
                  <div className="text-red-500">
                    {error}
                  </div>
                </div>
              )}
              {isLoginForm ? (
                <form onSubmit={handleLoginFormSubmit}>
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="block w-full border border-gray-400 p-2 rounded"
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginFormChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="block w-full border border-gray-400 p-2 rounded"
                      type="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginFormChange}
                      required
                    />
                  </div>
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    type="submit"
                  >
                    Login
                  </button>
                  <div className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="#" onClick={toggleForm} className="underline">
                      Register here
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterFormSubmit}>
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="block w-full border border-gray-400 p-2 rounded"
                      type="text"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterFormChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="block w-full border border-gray-400 p-2 rounded"
                      type="email"
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterFormChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="block w-full border border-gray-400 p-2 rounded"
                      type="password"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterFormChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="password_confirmation">
                      Confirm Password
                    </label>
                    <input
                      className="block w-full border border-gray-400 p-2 rounded"
                      type="password"
                      name="password_confirmation"
                      value={registerForm.password_confirmation}
                      onChange={handleRegisterFormChange}
                      required
                    />
                  </div>
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    type="submit"
                  >
                    Register
                  </button>
                  <div className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="#" onClick={toggleForm} className="underline">
                      Login here
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </>
        )
          : (
            <div className="bg-white p-8 rounded shadow-lg w-full">
              <h1 className="text-center text-2xl font-bold mb-8">
                {user.name}
              </h1>
              <button
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>

            </div>
          )
      }
    </div>
  );
};


export default Auth;