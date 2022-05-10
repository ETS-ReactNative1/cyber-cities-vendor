// import React from 'react'

// function AddProduct() {
//   return (
//     <div>AddProduct</div>
//   )
// }

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
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
} from "@material-ui/core";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

// Picker
// import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import axios from "axios";

// import CircularProgress from '@mui/material/CircularProgress';

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const token = localStorage.getItem("id_token");

  
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  function onImageChange(e) {
    debugger;
    setImages([...images, ...e.target.files]);
    setImageUrl([...imageUrl, URL.createObjectURL(...e.target.files)]);
  }
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://cybercitiesapi.developer-um.xyz/api/category`,
      headers: headers,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
        if (response.status == 200) {
          console.log(response);
          if (Data.Category.length > 0) {
            let category = [];
            Data.Category.map((cat) => {
              let singleCategory = { ...cat, label: cat.name };
              category.push(singleCategory);
            });
            setCategories(category);
          }
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  const onSubmit = async (values) => {
    values.preventDefault();
    setLoading(true);
    var formdata = new FormData();
    formdata.append("product_name", values.target[0].value);
    formdata.append("brand", values.target[1].value);
    formdata.append("product_details", values.target[4].value);
    formdata.append("category", category);
    formdata.append("sub_category", subCategory);
    images.map((image) => {
      formdata.append("product_image[]", image);
    });
    // formdata.append("product_image[1]", images[0]);
    formdata.append("color[]", "Green");
    formdata.append("size[]", values.target[11].value);
    formdata.append("price", values.target[13].value);
    formdata.append("discount", values.target[14].value);
    // formdata.append("product_selected_qty",values.target[7].value );
    formdata.append("product_status", values.target[7].value);
    formdata.append("product_stock", values.target[7].value);
    debugger;
    // const res = await axios.post('https://cybercitiesapi.developer-um.xyz/api/add/product',formdata,{headers:headers})
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/add/product`,
      data: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
        debugger;
        if (response.status == 200) {
          console.log(response);
          setLoading(false);
          alert("Product has been added Successfully!");
          window.location.href = "/app/products";
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        debugger;
        console.log(error);
      });
    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    // await sleep(3000);
    // debugger
    // window.alert(JSON.stringify(values, 0, 2));
  };
  const validate = (values) => {
    const errors = {};
    if (!values.productName) {
      errors.productName = "Required";
    }
    if (!values.brand) {
      errors.brand = "Required";
    }
    if (!values.product_details) {
      errors.product_details = "Required";
    }
    if (!values.price) {
      errors.price = "Required";
    }
    if (!values.discountedPrice) {
      errors.discountedPrice = "Required";
    }
    return errors;
  };

  const handleChange = (newValue, actionMeta) => {
    setCategory(newValue.name);
    let category = [];
    newValue.sub_category.map((cat) => {
      let singleCategory = { ...cat, label: cat.name };
      category.push(singleCategory);
    });
    setSubCategories(category);
    console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
  const handleChangeSubCategory = (newValue, actionMeta) => {
    setSubCategory(newValue.name);
  };

  //  const  handleInputChange = (inputValue,actionMeta) => {
  //     // console.group('Input Changed');
  //     console.log(inputValue);
  //     console.log(`action: ${actionMeta.action}`);
  //     // console.groupEnd();
  //   };

  const colourOptions = [
    {
      value: "Green",
      label: "Green",
      name: "colour",
    },
    {
      value: "Grseen",
      label: "Gresaen",
      name: "colour",
    },
    {
      value: "Greewn",
      label: "Greedn",
      name: "colour",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: 16, margin: "auto", maxWidth: 700, left: 0 }}>
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Add Product Details
        </Typography>

        <Form
          onSubmit={onSubmit}
          initialValues={{ employed: true, stooge: "larry" }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={(e) => onSubmit(e)} noValidate>
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
                  <Grid item xs={6}>
                    <CreatableSelect
                      isClearable
                      onChange={handleChange}
                      placeholder="Select Category"
                      // onInputChange={handleInputChange}
                      options={categories}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CreatableSelect
                      isClearable
                      onChange={handleChangeSubCategory}
                      placeholder="Select Sub Category"
                      // onInputChange={handleInputChange}
                      options={subCategories}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="product_details"
                      fullWidth
                      required
                      multiline
                      onChange={(e) => {
                        setDetails(e);
                      }}
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
                              name="status"
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
                              name="status"
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
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="select-image"
                      // multiple
                      accept="image/*"
                      onChange={onImageChange}
                    />
                    <label htmlFor="select-image">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Image
                      </Button>
                    </label>
                  </Grid>

                  {images.length > 0 && (
                    <Grid fullWidth item xs={12}>
                     
                        {imageUrl.map((image, index) => (
                           <Box mt={2} textAlign="center" style={{display:'flex',alignItems:'center'}}>
                          <img style ={{  border: '1px solid #ddd',borderRadius: '6px'}} src={image} alt={"asd"} width="200px" />
                          {index === 0 && <Typography variant="h6">Display Image</Typography>}
                      </Box>

                        ))}
                    </Grid>
                  )}
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
                  {loading && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
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
export default AddProduct;
