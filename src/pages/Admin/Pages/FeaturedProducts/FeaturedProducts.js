import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid,Select,MenuItem,Box, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import {ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
// components
import PageTitle from "../../../../components/PageTitle/PageTitle";

// data
import mock from "../dashboard/mock";
import axios from "axios";
import Swal from "sweetalert2";


const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function FeaturedProducts() {


  const classes = useStyles();
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(false)
  const history = useHistory();
  const {token} = JSON.parse(localStorage.getItem('token'));

 const columns=  [
    {
      name: 'Id',
      label: 'Id',
      options: {},
    },
    {
      name: 'VendorName',
      label: 'Vendor Name',
      options: {},
    },
    {
      name: 'Email',
      label: 'Email',
      options: {},
    },
    {
      name: 'ProductName',
      label: 'Product Name',
      options: {},
    },
    {
      name: 'Price',
      label: 'Price',
      options: {},
    },
    {
      name: 'Status',
      label: 'Status',
      options: {},
    }
  ]

  
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

const fetchProducts = async () => {
  axios({
    method: 'GET',
    url: `https://cybercitiesapi.developer-um.xyz/api/admin/seller/prod/featured`,
    headers,headers
}).then((response) => {
    // console.log("response", response)
    debugger
    const Data = response.data
    
    if (Data.feature_products) {
      let user = []
      Data.feature_products.map((pro,index)=>{
        let singleProduct = [pro?.id,pro?.user?.name,pro?.user?.email,pro?.name,pro.price,pro.status,index]
        
        user.push(singleProduct)
        
      })
      // const reverse = user.reverse() 
      setUsers(user)
  setLoading(false)
      

    }
  }).catch((error)=>{
    debugger
    Swal.fire({
      title: "Error!",
      text: error?.message,
      icon: "error",
    });
    setLoading(false)

  })
}

  useEffect(() => {
    setLoading(true)
    fetchProducts()
  }, [])


  const options = {
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      const filtered = users?.filter((pro,index)=>{
        return pro[6] ==selectedRows.data[0].index
      })
      debugger
    return(  <div>
        <Tooltip title={"Delete"} cursor='pointer' className="mr-6">
        <Button 
         onClick={() => {
           setLoading(true)
          axios({
            method: 'GET',
            url: `https://cybercitiesapi.developer-um.xyz/api/admin/seller/prod/featured/${filtered[0][0]}`,
            headers: headers,
        }).then((response) => {
            // console.log("response", response)
            debugger
            setUsers([])
            const Data = response.data
            if (Data.status == "success") {
            fetchProducts()
            }
           
          }).catch((error)=>{
            Swal.fire({
              title: "Error!",
              text: error?.message,
              icon: "error",
            });
            setLoading(false)
          })


        }}
        style={{height:"30px",backgroundColor:'#536DFE',color:'#fff',marginRight:'10px'}}
        color="success"
        variant="outlined"
        // color="error"
        >Change Status of This Product</Button>
        </Tooltip>
        
        
      </div>)
      
    },
    filterType: "multiselect",
  }
  
  return (


    <>
     <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
      <PageTitle title="Featured Products" />
     
        {/* <Button
          onClick={() => {
            history.push('/app/addProduct')
          }}
          style={{height:"50px",backgroundColor:'#536DFE',color:'#fff'}}
          color="success"
          variant="outlined"
        >
          Add New Product
        </Button> */}
      </div>
      <Grid container spacing={4}>
     {loading ? <CircularProgress size={26} className={classes.loginLoader} style ={{align:'center',justifyContent:'center',alignContent:'center'}} />
     :   <Grid item xs={12}>
          <MUIDataTable
            title="Featured Product List"
            data={users}
            columns={columns}
            options={options}
          />
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
