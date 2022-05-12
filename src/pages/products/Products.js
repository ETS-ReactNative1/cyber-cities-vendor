import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import axios from "axios";

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

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Tables() {


  const classes = useStyles();
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const history = useHistory();
  const token = localStorage.getItem("id_token");

  
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  

const fetchProducts = async () => {
  axios({
    method: 'GET',
    url: `https://cybercitiesapi.developer-um.xyz/api/vendor/products`,
    headers: headers,
}).then((response) => {
    // console.log("response", response)
    const Data = response.data
    if (response.status == 200) {
      let product = []
      
      Data.Products.map((pro,index)=>{
        let singleProduct = [pro?.id,pro?.product_name,pro.brand,pro.category.name,pro.discount,pro?.price,index]
        
        product.push(singleProduct)
        
      })
      // const reverse = product.reverse() 
      setProducts(product)
  setLoading(false)
      

    }
    else {
      setLoading(false)
      
      console.log("error")
    }
  }).catch((error)=>{
    
    console.log(error)
    setLoading(false)

  })
}

  useEffect(() => {
    setLoading(true)
    fetchProducts()
  }, [])


  const options = {
    onRowsDelete:(e)=>{
      setLoading(true)
      console.log(e.data)

      const filtered = products.filter((pro,index)=>{
        return pro[6] == e.data[0].index
      })
    let formData = new FormData();
    formData.append('id',filtered[0][0])
    axios({
      method: 'POST',
      url: `https://cybercitiesapi.developer-um.xyz/api/delete/product`,
      headers: headers,
      data: formData
  }).then((response) => {
      // console.log("response", response)
      setProducts()
      const Data = response.data
      if (response.status == 200) {
      fetchProducts()
    setLoading(false)
        
  
      }
      else {
        setLoading(false)

        console.log("error")
      }
    }).catch((error)=>{
      console.log(error)
      setLoading(false)
    })
    setProducts(filtered)
  }, 
  onRowClick: (event, rowData) => {
    
    console.log(event[0], rowData);
    // history.push(`/app/product/${event[0]}`)
    history.push({
      pathname:`/app/product/${event[0]}`,
      state: {
        data: event[0],
      },
    })
    
 },
    filterType: "multiselect",
  }
  
  return (


    <>
     <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
      <PageTitle title="Products" />
     
        <Button
          onClick={() => {
            history.push('/app/addProduct')
          }}
          style={{height:"50px",backgroundColor:'#536DFE',color:'#fff'}}
          color="success"
          variant="outlined"
        >
          Add New Product
        </Button>
      </div>
      <Grid container spacing={4}>
     {loading ? <CircularProgress size={26} className={classes.loginLoader} style ={{align:'center',justifyContent:'center',alignContent:'center'}} />
     :   <Grid item xs={12}>
          <MUIDataTable
            title="Product List"
            data={products}
            columns={["Id","Name", "Brand","Category", "Discount", "Price"]}
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
