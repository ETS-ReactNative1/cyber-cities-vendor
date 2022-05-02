import axios from "axios";
import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
      var formdata = new FormData();
            formdata.append("email", login);
            formdata.append("password", password);
            axios({
                method: 'POST',
                url: `https://cybercitiesapi.developer-um.xyz/api/seller/login`,
                data: formdata,
            }).then((response) => {
                // console.log("response", response)
                const Data = response.data
                if (response.status == 200) {
                  localStorage.setItem('id_token', Data.token)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
                    // Swal.fire({
                    //     title: "Success",
                    //     text: "Login Successfull",
                    //     icon: "success",
                    // });
                    // localStorage.setItem("Usertoken",Data?.token)
                    // localStorage.setItem("User",JSON.stringify(Data?.user))
                    // history.push("/dashbaord")
                }
                else {
                  dispatch({ type: "LOGIN_FAILURE" });
                  setError(true);
                  setIsLoading(false);
                }
              })
  
}
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
