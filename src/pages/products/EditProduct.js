// import React from 'react'

// function AddProduct() {
//   return (
//     <div>AddProduct</div>
//   )
// }

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField,Select } from "final-form-material-ui";
import {
  Cancel as CancelIcon,
} from "@material-ui/icons";
import {
  Typography,
  Paper,
  Radio,
  Checkbox,
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
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// import CircularProgress from '@mui/material/CircularProgress';

function EditProduct() {
  const history = useHistory();

  const [images, setImages] = useState([]);
  const ids = history.location.state?.data


  const [imageUrl, setImageUrl] = useState([]);
  const [id, setId] = useState(null);

  const {token} = JSON.parse(localStorage.getItem('token'));

  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
 
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  const [productFromAPI, setProductFromAPI] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [type, setType] = useState('new');
  const [featured, setFeatured] = useState('Standard');
  const getImages = () => {
    axios({
      method: "GET",
      url: `https://cybercitiesapi.developer-um.xyz/api/image/${id}`,
      headers: headers,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
      
        if (Data.Images) {
          
          setImages(Data.Images)
      let tempImg = []
      Data.Images.map((img,index)=>{
          
          tempImg.push({id:img.id,image:`https://cybercitiesapi.developer-um.xyz/storage/${img.image}`})
      })
        setImageUrl(tempImg)
          console.log(response);
          
          
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        
        console.log(error);
      });
  }


  function onImageChange(e) {
let formData = new FormData();
    formData.append("product_image[]", ...e.target.files);
    formData.append("product_id", id);


    

    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/add/image`,
      data: formData,
      headers: headers,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
      
        if (Data?.Successfull) {
          console.log(response);
          getImages()
          
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        
        console.log(error);
      });
    // const obj ={...e.target.files}
    // setImages([...images, ...e.target.files]);
    // setImageUrl([...imageUrl, {image:URL.createObjectURL(...e.target.files)}]);

  }


  useEffect(() => {
      setLoading(true);
      let formData = new FormData();
        formData.append('id',ids)
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/show/product`,
      headers: headers,
      data: formData,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data.Products[0];
        
        if (response.status == 200) {
          console.log(response);
            setId(Data.id)
            setProductFromAPI(Data)
            setImages(Data.image)
            let tempImg = []
            Data.image.map((img,index)=>{
                
                tempImg.push({id:img.id,image:`https://cybercitiesapi.developer-um.xyz/storage/${img.image}`})
            })
              setImageUrl(tempImg)

            setCategory({value:Data.category.name,label:Data.category.name})
            setSubCategory({value:Data.sub_category.name,label:Data.sub_category.name})
            
            setFeatured(Data.featured)
            setType(Data.type)
            setLoading(false)
        } else {
          console.log("error");
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
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

 
  const onSubmit = async (values) => {
    values.preventDefault();
    setLoading(true);
    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("product_name", values.target[0].value);
    formdata.append("brand", values.target[1].value);
    formdata.append("product_details", values.target[4].value);
    formdata.append("category", category.label);
    formdata.append("sub_category", subCategory.label);
    // images.map((image) => {
    //   formdata.append("product_image[]", image);
    // });
    // formdata.append("product_image[1]", images[0]);
    // formdata.append("color[]", "Green");
    formdata.append("size", values.target[9].value);
    formdata.append("price", values.target[10].value);
    formdata.append("discount", values.target[11].value);
    // formdata.append("product_selected_qty",values.target[7].value );
    formdata.append("product_status", type);
    formdata.append("featured", featured);
    // formdata.append("product_stock", values.target[7].value);
    
    // const res = await axios.post('https://cybercitiesapi.developer-um.xyz/api/add/product',formdata,{headers:headers})
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/update/product`,
      data: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("response", response)
        
        const Data = response.data;
        
        if (Data.Successfull) {
          console.log(response);
          setLoading(false);
          Swal.fire({
            title: "Success",
            text: "Product has been Updated Successfully!",
            icon: "success",
          });
          history.push("/app/products");

        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        
        setLoading(false);
        console.log(error);
      });
    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    // await sleep(3000);
    // 
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

  const handleCategory = (newValue, actionMeta) => {
    
    if (newValue?.value) {
      setSubCategories([]);
      return setCategory({value:newValue?.value,label:newValue?.value});
    }
    setCategory({value:newValue?.name,label:newValue?.name});
    let category = [];
    if (newValue !== null && newValue !== undefined) {
      newValue.sub_category.map((cat) => {
        let singleCategory = { ...cat, label: cat.name };
        category.push(singleCategory);
      });

      setSubCategories(category);
    }
  };
  const handleChangeSubCategory = (newValue, actionMeta) => {
    if (newValue?.value) {
      return setSubCategory({value:newValue?.value,label:newValue?.value});
    }
    setSubCategory({value:newValue?.name,label:newValue?.name});
  };


  // const handleChange = (newValue, actionMeta) => {
  //   setCategory({value:newValue?.name,label:newValue?.name});
  //   let category = [];
  //   newValue?.sub_category.map((cat) => {
  //     let singleCategory = { ...cat, label: cat.name };
  //     category.push(singleCategory);
  //   });
  //   setSubCategories(category);
  //   console.log(`action: ${actionMeta.action}`);
  //   // console.groupEnd();
  // };
  // const handleChangeSubCategory = (newValue, actionMeta) => {
  //   setSubCategory({value:newValue?.name,label:newValue?.name});
  // };

  const removeImage = (image) => {
    
    let formData = new FormData();
    formData.append("id", image.id);
    axios({
      method: "POST",
      url: `https://cybercitiesapi.developer-um.xyz/api/delete/image`,
      data: formData,
      headers: headers,
    })
      .then((response) => {
        // console.log("response", response)
        const Data = response.data;
        ;
        if (response.statusText == "OK") {
          console.log(response);
          getImages()
          
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        ;
        console.log(error);
      });
    // setImages(newImages);
    // setImageUrl(newImagesUrl);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: 16, margin: "auto", maxWidth: 700, left: 0 }}>
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Edit Product Details
        </Typography>

        <Form
          onSubmit={onSubmit}
          initialValues={productFromAPI}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={(e) => onSubmit(e)} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      name="product_name"
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
                            value={category}
                      isClearable
                      onChange={handleCategory}
                      placeholder="Select Category"
                      // onInputChange={handleInputChange}
                      options={categories}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CreatableSelect
                      isClearable
                      value={subCategory}
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
                  <Grid item xs={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup row>
                        <FormControlLabel
                          label="New"
                          // checked={true}
                          onChange={(event) => {
                            setType(event.target.value);
                          }}
                          control={
                            <Radio
                              name="status"
                              type="radio"
                              value="new"
                              checked= {type==="new"}
                            />
                          }
                        />
                        <FormControlLabel
                          label="Old"
                          onChange={(event) => {
                            setType(event.target.value);
                          }}
                          control={
                            <Radio
                              name="status"
                              type="radio"
                              value="old"
                              checked= {type==="old"}
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      fullWidth
                      required
                      name="size"
                      component={TextField}
                      type="text"
                      label="Size"
                    />
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
                      name="discount"
                      component={TextField}
                      type="number"
                      label="Discounted Price"
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                  <Grid item xs={8}>
                    <FormControl component="fieldset">
                      <RadioGroup row>
                        <FormControlLabel
                          label="Request this Product to featured on Main Page"
                          checked={featured === "Featured"}
                          onChange={(event) => {
                            
                            if(event.target.checked){
                              setFeatured("Featured");
                            }else{
                              setFeatured("Standard");
                            }
                            
                          }}
                          control={
                            <Checkbox
                              name="featured"
                              type="checkbox"
                              value="featured"
                            
                            />
                          }
                        />
                       
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {images.length > 0 && (
                    <Grid fullWidth item xs={12}>
                     
                        {imageUrl.map((image, index) => (
                           <Box mt={2} textAlign="center" style={{display:'flex',alignItems:'center'}}>
                          <img style ={{  border: '1px solid #ddd',borderRadius: '6px'}} src={image.image} alt={"asd"} width="200px" />
                          <CancelIcon style={{ cursor: 'pointer',marginLeft:-25,marginTop:-80 }} onClick={() =>removeImage(image)} 
              // classes={{
              //   root: classNames(
              //     classes.headerIcon,
              //     classes.headerIconCollapse,
              //   ),
              // }}
            />
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
                  <Grid item style={{ marginTop: 16 }}  xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      align="center"
                      disabled={submitting}
                    >
                      Save Changes
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
export default EditProduct;
