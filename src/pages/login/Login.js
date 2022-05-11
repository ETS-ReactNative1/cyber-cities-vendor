import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import Swal from "sweetalert2";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import axios from "axios";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [company, setCompany] = useState("");
  var [phone, setPhone] = useState("");
  var [city, setCity] = useState("");
  var [state, setState] = useState("");
  var [address, setAddress] = useState("");
  var [loginValue, setLoginValue] = useState("seller@gmail.com");
  var [passwordValue, setPasswordValue] = useState("12345678");

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("email", loginValue);
    formData.append("password", passwordValue);
    formData.append("name", nameValue);
    formData.append("company", company);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/seller/register`,
      data: formData,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
        if (response?.data?.Success == 200) {
          console.log(response);
          Swal.fire({
            title: "Success",
            text: "Successfully Registered",
            icon: "success",
          });
          
        } 
        if(Data?.errors?.email){
          Swal.fire({
            title: "Error",
            text: "Email already exists",
            icon: "error",
          });
        }
        else {
          
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
          });
          console.log("error");
        }
      })
      .catch((error) => {
        
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
        console.log(error);
      });
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Cyber Cities</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              {/* <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
              <div className={classes.formDividerContainer}>
                {/* <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} /> */}
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                {/* <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button> */}
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>

              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />

              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />

              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <TextField
                id="company"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                margin="normal"
                placeholder="Company"
                type="text"
                fullWidth
              />
              <TextField
                id="phone"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
                placeholder="Phone No."
                type="text"
                fullWidth
              />
              <Grid container alignItems="flex-start" spacing={6}>
                <Grid item xs={6}>
                  <TextField
                    id="state"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    margin="normal"
                    placeholder="State"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="city"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    margin="normal"
                    placeholder="City"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextField
                id="address"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                placeholder="Address"
                type="text"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                    handleSubmit()
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0 ||
                      company.length === 0 ||
                      phone.length === 0 ||
                      state.length === 0 ||
                      city.length === 0 || 
                      address.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              {/* <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
              {/* <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
            </React.Fragment>
          )}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://cyeber-cities.web.app/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Cyber Cities
          </a>
          ,All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
}

export default withRouter(Login);
