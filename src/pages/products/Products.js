import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
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
  const history = useHistory();
  useEffect(() => {
    const res = axios({
      method: 'GET',
      url: `https://cybercitiesapi.developer-um.xyz/api/products`,
  }).then((response) => {
      // console.log("response", response)
      debugger
      const Data = response.data
      if (response.status == 200) {
        debugger
        let product = []
        // Data.Products.map((pro)=>{
        //   product.push(pro.)
        // })
        setProducts(Data.Products)
        console.log(response)
        
  
      }
      else {
        console.log("error")
      }
    }).catch((error)=>{
      debugger
      console.log(error)
    })
  }, [])
  
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
        <Grid item xs={12}>
          <MUIDataTable
            title="Product List"
            data={datatableData}
            columns={["Name", "Brand", "Made in", "Price"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="Material-UI Table"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableOverflow}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}