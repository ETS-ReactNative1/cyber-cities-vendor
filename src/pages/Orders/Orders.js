import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
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
import Swal from "sweetalert2";

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

export default function Orders() {


  const classes = useStyles();
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(false)
  const history = useHistory();
  const {token} = JSON.parse(localStorage.getItem('token'));

  
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

const fetchProducts = async () => {
  axios({
    method: 'GET',
    url: `https://cybercitiesapi.developer-um.xyz/api/seller-orders`,
    headers,headers
}).then((response) => {
    // console.log("response", response)
    const Data = response.data
    
    if (Data.orders) {
      let product = []
      Data.orders.map((pro,index)=>{
        let singleProduct = [pro?.id,pro?.customer_name,pro?.order_date,pro.gross_amount,pro.net_amount]
        
        product.push(singleProduct)
        
      })
      const reverse = product.reverse() 
      setOrders(reverse)
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
      Swal.fire({
        title: "Error!",
        text: "Order can't be deleted",
        icon: "error",
      });
      
      setOrders(orders)
  }, 
//   onRowClick: (event, rowData) => {
    
//     console.log(event[0], rowData);
//     // history.push(`/app/product/${event[0]}`)
//     history.push({
//       pathname:`/app/order/${event[0]}`,
//       state: {
//         data: event[0],
//       },
//     })
    
//  },
    filterType: "multiselect",
  }
  
  return (


    <>
     <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
      <PageTitle title="Orders" />
     
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
            title="Order List"
            data={orders}
            columns={["Order Id","Customer Name","Order Date",  "Gross Amount", "Net Amount"]}
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
