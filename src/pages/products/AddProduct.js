// import React from 'react'

// function AddProduct() {
//   return (
//     <div>AddProduct</div>
//   )
// }




import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  Box,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
// Picker
// import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import axios from 'axios';

// import CircularProgress from '@mui/material/CircularProgress';


function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}




function AddProduct() {
  const [images, setImages] = useState([])
  function onImageChange(e){
    
    setImages([...e.target.files])
  }


  const token = localStorage.getItem('id_token') 
var headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
const [loading,setLoading] = useState(false)
const [details,setDetails] = useState("")
const onSubmit = async (values) => {

  values.preventDefault();
  setLoading(true)
  var formdata = new FormData();
  formdata.append("product_name",values.target[0].value );
  formdata.append("brand", values.target[1].value);
  formdata.append("product_details", values.target[2].value);
  formdata.append("product_image[0]", images[0]);
  formdata.append("product_image[1]", images[0]);
  formdata.append("color[]", "Green");
  formdata.append("size[]", values.target[9].value);
  formdata.append("price", values.target[11].value);
  formdata.append("discount", values.target[12].value);
  // formdata.append("product_selected_qty",values.target[7].value );
  formdata.append("product_status", values.target[5].value);
  formdata.append("product_stock", values.target[7].value);
  // const res = await axios.post('https://cybercitiesapi.developer-um.xyz/api/add/product',formdata,{headers:headers})
  axios({
    method: 'POST',
    url: `https://cybercitiesapi.developer-um.xyz/api/add/product`,
    data: formdata,
    headers:headers
}).then((response) => {
    // console.log("response", response)
    const Data = response.data
    if (response.status == 200) {
      console.log(response)
      setLoading(false)
      alert("Product has been added Successfully!")
    }
    else {
      console.log("error")
    }
  }).catch((error)=>{
    console.log(error)
  })
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // await sleep(3000);
  // debugger
  // window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.productName) {
    errors.productName = 'Required';
  }
  if (!values.brand) {
    errors.brand = 'Required';
  }
  if (!values.product_details) {
    errors.product_details = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  if (!values.discountedPrice) {
    errors.discountedPrice = 'Required';
  }
  return errors;
};

  
  return (
    <div style={{display:'flex'}}>
      
    <div style={{ padding: 16, margin: 'auto', maxWidth:700, left:0}}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Add Product Details
      </Typography>
   
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={(e)=>onSubmit(e)} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="productName"
                    component={TextField}
                    type="text"
                    label="Product Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="brand"
                    component={TextField}
                    type="text"
                    label="Brand"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="product_details"
                    fullWidth
                    required
                    multiline
                    onChange={(e)=>{
                      setDetails(e)}}
                    component={TextField}
                    type="product_details"
                    label="Product Details"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <FormControlLabel
                    label="Employed"
                    control={
                      <Field
                        name="employed"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  /> */}
                </Grid>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Status</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        label="New"
                        control={
                          <Field
                            name="sizes"
                            component={Radio}
                            type="radio"
                            value="new"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Old"
                        control={
                          <Field
                            name="sizes"
                            component={Radio}
                            type="radio"
                            value="old"
                          />
                        }
                      />
                     
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sizes</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        label="Small"
                        control={
                          <Field
                            name="sizes"
                            component={Checkbox}
                            type="checkbox"
                            value="Small"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Medium"
                        control={
                          <Field
                            name="sizes"
                            component={Checkbox}
                            type="checkbox"
                            value="Medium"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Large"
                        control={
                          <Field
                            name="sizes"
                            component={Checkbox}
                            type="checkbox"
                            value="Large"
                          />
                        }
                      />
                     
                    </FormGroup>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="notes"
                    component={TextField}
                    multiline
                    label="Notes"
                  />
                </Grid> */}
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="price"
                    component={TextField}
                    type="number"
                    label="Price"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="discountedPrice"
                    component={TextField}
                    type="number"
                    label="Discounted Price"
                  />
                </Grid>
                <Grid item xs={12}>
                <input type="file" multiple accept="image/*" onChange={onImageChange} />
                </Grid>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                  {/* <Grid item xs={6}>
                    <Field
                      name="rendez-vous"
                      component={DatePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Rendez-vous"
                    />
                  </Grid> */}
                  {/* <Grid item xs={6}>
                    <Field
                      name="alarm"
                      component={TimePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Alarm"
                    />
                  </Grid>
                </MuiPickersUtilsProvider> */}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>

          
                </Grid>
             {loading &&   
             <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
              </Grid>
            </Paper>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
    {/* <div style={{ padding: 16, margin: 'auto', maxWidth:700, left:0}}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Product :{details}
      </Typography>
   
   
    <div>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <img src={images?.name} alt="img"/> 
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" align="left" component="h4" gutterBottom>
                Product Title: 
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h4" align="left" component="h4" gutterBottom>
                Product Brand: 
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h4" align="left" component="h4" gutterBottom>
                Product Details: 
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h4" align="left" component="h4" gutterBottom>
                Product Price: 
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h4" align="left" component="h4" gutterBottom>
                Discounted Price: 
                </Typography>
                </Grid>
             
              </Grid>
            </Paper>
        </div>
    </div> */}
    </div>
  );
}

// ReactDOM.render(<App />, document.querySelector('#root'));
export default AddProduct