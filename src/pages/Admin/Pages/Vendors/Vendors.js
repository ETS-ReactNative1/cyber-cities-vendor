import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

// components
import PageTitle from "../../../../components/PageTitle/PageTitle"

// data
import mock from "../dashboard/mock";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Vendors() {


  const classes = useStyles();
  const [seller,setSeller] = useState([])
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
    url: `https://cybercitiesapi.developer-um.xyz/api/admin/seller`,
    headers: headers,
}).then((response) => {
  
    // console.log("response", response)
    const Data = response.data
    if (Data.seller) {
      let seller = []
      
      Data.seller.map((pro,index)=>{
        let singleseller = [pro?.id,pro?.name,pro.email,pro.state,pro.city,index]
        
        seller.push(singleseller)
        
      })
      // const reverse = product.reverse() 
      setSeller(seller)
  setLoading(false)
      

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

      const filtered = seller.filter((pro,index)=>{
        return pro[5] == e.data[0].index
      })
    // let formData = new FormData();
    // formData.append('id',filtered[0][0])
    
    axios({
      method: 'GET',
      url: `https://cybercitiesapi.developer-um.xyz/api/admin/seller/delete/${filtered[0][0]}`,
      headers: headers,
  }).then((response) => {
      // console.log("response", response)
      
      setSeller()
      const Data = response.data
      if (Data.status == "successfully deleted") {
      fetchProducts()
    setLoading(false)
      }
     
    }).catch((error)=>{
      
      console.log(error)
      setLoading(false)
    })
    setSeller(filtered)
  }, 
//   onRowClick: (event, rowData) => {
    
//     console.log(event[0], rowData);
//     // history.push(`/app/product/${event[0]}`)
//     history.push({
//       pathname:`/app/product/${event[0]}`,
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
      <PageTitle title="Vendors" />
     
       
      </div>
      <Grid container spacing={4}>
     {loading ? <CircularProgress size={26} className={classes.loginLoader} style ={{align:'center',justifyContent:'center',alignContent:'center'}} />
     :   <Grid item xs={12}>
          <MUIDataTable
            title="Vendor List"
            data={seller}
            columns={["Id","Name", "Email","State", "City"]}
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
