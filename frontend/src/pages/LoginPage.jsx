import React, { useState, useEffect } from "react";
import { login } from "../store/Users/user-actions";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/Users/user-slice";
import { NavLink, useNavigate } from "react-router-dom";

const is8Characters = (value) => {
  return value.trim().length > 7;
};

const isEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, userInfo } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  let formIsValid = !emailError && !passwordError;

  const formSubmit = async (event) => {
    event.preventDefault();
    dispatch(userActions.userReset());

    setEmailError(!isEmail(email));
    setPasswordError(!is8Characters(password));

    if (!formIsValid) {
      return;
    }

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
      dispatch(userActions.userReset());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className=" my-8 flex flex-col items-center">
      <h1 className="font-[Georgia] font-semibold text-2xl text-center">
        Login
      </h1>

      <form
        onSubmit={formSubmit}
        className="flex flex-col space-y-8 mt-12 w-3/5"
      >
        <div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isEmail(e.target.value)) {
                setEmailError(false);
              }
            }}
            id="email"
            className=" appearance-none outline-none px-2.5 pb-2.5 pt-2 w-full text-sm bg-white rounded-lg border-2 border-black"
            placeholder="Email *"
          />
          {emailError && (
            <p className="text-[red] mx-10 font-[Georgia]">
              Must be a Valid Email
            </p>
          )}
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (is8Characters(e.target.value)) {
                setPasswordError(false);
              }
            }}
            type="password"
            id="password"
            className="appearance-none outline-none px-2.5 pb-2.5 pt-2 w-full text-sm bg-white rounded-lg border-2 border-black"
            placeholder="Password *"
          />
          {passwordError && (
            <p className="text-[red] mx-10 font-[Georgia]">
              Please Enter at Least 8 Characters
            </p>
          )}
        </div>
        {error && (
          <p className="text-[red] mt-10 self-center font-[Georgia]">{error}</p>
        )}
        {loading && (
          <p className="self-center mt-6 font-[Georgia]">Submitting...</p>
        )}
        <p className="self-center mt-6 font-[Georgia]">
          Don't have an account?
        </p>
        <NavLink
          type="button"
          className="self-center border-2 border-black hover:bg-black hover:text-white rounded-md py-2 px-4"
          to="/signup"
        >
          Create An Account
        </NavLink>
        <footer className="ml-auto mr-8 my-4">
          <button
            disabled={!formIsValid}
            type="submit"
            className="border-2 border-black hover:bg-black hover:text-white rounded-md py-2 px-4"
          >
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default LoginPage;
