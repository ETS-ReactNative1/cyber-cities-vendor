import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

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

export default function Users() {


  const classes = useStyles();
  const [users,setUsers] = useState([])
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
    url: `https://cybercitiesapi.developer-um.xyz/api/admin/user`,
    headers,headers
}).then((response) => {
    // console.log("response", response)
    
    const Data = response.data
    
    if (Data.user) {
      let user = []
      Data.user.map((pro,index)=>{
        let singleProduct = [pro?.id,pro?.name,pro?.email,pro.state,pro.phone,index]
        
        user.push(singleProduct)
        
      })
      // const reverse = user.reverse() 
      setUsers(user)
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
        
      const filtered = users.filter((pro,index)=>{
        return pro[5] == e.data[0].index
      })
    // let formData = new FormData();
    // formData.append('id',filtered[0][0])
    
    axios({
      method: 'GET',
      url: `https://cybercitiesapi.developer-um.xyz/api/admin/user/delete/${filtered[0][0]}`,
      headers: headers,
  }).then((response) => {
      // console.log("response", response)
      
      setUsers()
      const Data = response.data
      if (Data.status == "successfully deleted") {
      fetchProducts()
    setLoading(false)
      }
     
    }).catch((error)=>{
      
      console.log(error)
      setLoading(false)
    })
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
      <PageTitle title="Users" />
     
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
            title="User List"
            data={users}
            columns={["Id","Name","Email", "State", "Phone"]}
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
