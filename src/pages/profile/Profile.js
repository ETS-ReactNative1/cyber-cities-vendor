import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from "../login/styles";



export default function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  debugger;
  const classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [nameValue, setNameValue] = useState(user[0]?.name);
  var [company, setCompany] = useState(user[0]?.company);
  var [phone, setPhone] = useState(user[0]?.phone);
  var [city, setCity] = useState(user[0]?.city);
  var [state, setState] = useState(user[0]?.state);
  var [address, setAddress] = useState(user[0]?.address);
  var [loginValue, setLoginValue] = useState(user[0]?.email);
  const token = localStorage.getItem("id_token");

  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };


  const handleSubmit = async () => {
    setIsLoading(true);
    let formData = new FormData();
    // formData.append("email", loginValue);
    formData.append("name", nameValue);
    formData.append("company", company);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);

     


    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/update/seller`,
      headers: headers,
      data: formData,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
        debugger
        if (Data.Success) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify([Data.seller]));
           setIsLoading(false);
          return( Swal.fire({
            title: "Success",
            text: Data.Success,
            icon: "success",
          }))
          
        } 
    
        else {
         setIsLoading(false);
          
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
          });
          console.log("error");
        }
      })
      .catch((error) => {
        setIsLoading(false);

        debugger
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
        console.log(error);
      });
  }

 
  


  return (
    <div style={{alignSelf:'center',alignItems:'center',margin: 'auto',width: '60%'}}>
     <div style={{ display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
      <PageTitle title="Profile" />
      </div>
      <Grid container spacing={4}>
    
      <Grid>
     {/* <Typography variant="h1" className={classes.greeting}>
       Welcome!
     </Typography> */}
   
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
       disabled={true}
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

     {/* <TextField
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
     /> */}
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
           Save Changes
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
   </Grid>

      </Grid>
    </div>
  );
}
