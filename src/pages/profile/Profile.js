import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import axios from "axios";
import useStyles from "../login/styles";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "3400"],
  ["John Walsh", "Example Inc.", "Hartford", "3400"],
  ["Bob Herm", "Example Inc.", "Tampa", "3400"],
  ["James Houston", "Example Inc.", "Dallas", "3400"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "3400"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "3400"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "3400"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "3400"],
  ["Meral Elias", "Example Inc.", "Hartford", "3400"],
  ["Deep Pau", "Example Inc.", "Yonkers", "3400"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "3400"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "3400"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "3400"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "3400"],
  ["Avram Sylva", "Example Inc.", "Hartford", "3400"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "3400"],
  ["Gaston Festus", "Example Inc.", "Tampa", "3400"],
];

// const useStyles = makeStyles((theme) => ({
//   tableOverflow: {
//     overflow: "auto",
//   },
// }));

export default function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const history = useHistory();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState(user[0].name);
  var [company, setCompany] = useState(user[0].company);
  var [phone, setPhone] = useState(user[0].phone);
  var [city, setCity] = useState(user[0].city);
  var [state, setState] = useState(user[0].state);
  var [address, setAddress] = useState(user[0].address);
  var [loginValue, setLoginValue] = useState(user[0].email);
  const token = localStorage.getItem("id_token");

  debugger  
  


  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("email", loginValue);
    formData.append("name", nameValue);
    formData.append("company", company);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);

    // axios({
    //   method: "POST",
    //   url: `https://cybercitiesapi.developer-um.xyz/api/seller/register`,
    //   data: formData,
    // })
    //   .then((response) => {
    //     // console.log("response", response)
    //     const Data = response.data;
    //     if (response?.data?.Success == 200) {
    //       console.log(response);
    //       Swal.fire({
    //         title: "Success",
    //         text: "Successfully Registered",
    //         icon: "success",
    //       });
    //       
    //     } 
    //     if(Data?.errors?.email){
    //       Swal.fire({
    //         title: "Error",
    //         text: "Email already exists",
    //         icon: "error",
    //       });
    //     }
    //     else {
    //       
    //       Swal.fire({
    //         title: "Error",
    //         text: "Something went wrong",
    //         icon: "error",
    //       });
    //       console.log("error");
    //     }
    //   })
    //   .catch((error) => {
    //     
    //     Swal.fire({
    //       title: "Error",
    //       text: "Something went wrong",
    //       icon: "error",
    //     });
    //     console.log(error);
    //   });
  }

  
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  


  return (
    <>
     <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
      <PageTitle title="Profile" />
      </div>
      <Grid container spacing={4}>
     {loading ? <CircularProgress size={26} className={classes.loginLoader} style ={{align:'center',justifyContent:'center',alignContent:'center'}} />
     :  
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
           console.log('a')
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
   </Grid>}
        {/* <Grid item xs={12}>
          <Widget
            title="Material-UI Table"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableOverflow}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}
