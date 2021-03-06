import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

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
    isAuthenticated: !!localStorage.getItem("token"),
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

export { UserProvider, useUserState, useUserDispatch, loginUser,loginAdmin, signOut };

// ###########################################################

function loginAdmin(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    var formdata = new FormData();
    formdata.append("email", login);
    formdata.append("password", password);
    
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/admin/login`,
      data: formdata,
    })
      .then((response) => {
        ;
        // console.log("response", response)
        const Data = response.data;
        if (Data.admin) {
          ;
          const obj ={"role":"admin","token":Data.token}
          // localStorage.setItem("role", "admin");
          localStorage.setItem("token", JSON.stringify(obj));
          localStorage.setItem("user", JSON.stringify(Data.admin));
          setError(null);
          setIsLoading(false);
          dispatch({ type: "LOGIN_SUCCESS" });
          Swal.fire({
            title: "Success",
            text: "Login Successfull",
            icon: "success",
          });
          return history.push("/app/admin/dashboard");
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          setIsLoading(false);
          Swal.fire({
            title: "Opps",
            text: "Wrong Credentials!",
            icon: "error",
          });
          setError(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        
        Swal.fire({
          title: "Error",
          text: "User Not Exist  ",
          icon: "error",
        });
      });
  }
}

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    var formdata = new FormData();
    formdata.append("email", login);
    formdata.append("password", password);
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/seller/login`,
      data: formdata,
    })
      .then((response) => {
        ;
        // console.log("response", response)
        const Data = response.data;
        if (Data.seller) {
          ;
          const obj ={"role":"user","token":Data.token}
          localStorage.setItem("token", JSON.stringify(obj));
          localStorage.setItem("user", JSON.stringify(Data.seller));
          setError(null);
          setIsLoading(false);
          dispatch({ type: "LOGIN_SUCCESS" });
          Swal.fire({
            title: "Success",
            text: "Login Successfull",
            icon: "success",
          });
          history.push("/app/dashboard");
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          setIsLoading(false);
          Swal.fire({
            title: "Opps",
            text: "Wrong Credentials!",
            icon: "error",
          });
          setError(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "User Not Exist  ",
          icon: "error",
        });
      });
  }
}
function signOut(dispatch, history) {
  localStorage.removeItem("user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  const access =  JSON.parse(localStorage.getItem("token"))
  const role = access?.role
  
  if(role=="admin"){
    history.push("/admin/login");
  }else{
    history.push("/login");
  }
  localStorage.removeItem("token");

}
