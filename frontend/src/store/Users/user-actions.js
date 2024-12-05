import { userActions } from "./user-slice";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.userRequest());

      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401)
          dispatch(userActions.userFail("Incorrect Username/Password!"));
        else {
          dispatch(
            userActions.userFail(
              data.message ? data.message : "Failed to Login!"
            )
          );
        }
        return;
      }

      dispatch(userActions.userSuccess(data));
    } catch (err) {
      dispatch(
        userActions.userFail(
          err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        )
      );
    }
  };
};

export const register = (body) => {
  return async (dispatch) => {
    if (body.password.trim().length < 8) {
      dispatch(userActions.userFail("Password must be 8 characters"));
      return;
    }

    try {
      dispatch(userActions.userRequest());

      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(
          userActions.userFail(
            data.message ? data.message : "Failed to Register!"
          )
        );
        return;
      }

      dispatch(userActions.userSuccess(data));
    } catch (err) {
      dispatch(
        userActions.userFail(
          err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        )
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(userActions.userLogout());
  };
};
