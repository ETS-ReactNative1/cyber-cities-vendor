import React, { useEffect, useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../../../components/Widget";
import PageTitle from "../../../../components/PageTitle";
import { Typography } from "../../../../components/Wrappers";
import Dot from "../../../../components/Sidebar/components/Dot";
import axios from "axios";
import Swal from "sweetalert2";

const mainChartData = getMainChartData();




const PieChartData = [
  { name: "Acer Laptop", value: 400, color: "primary" },
  { name: "SSD", value: 300, color: "secondary" },
  { name: "Apple Macbook", value: 300, color: "warning" },
  { name: "Power Cables", value: 200, color: "success" },
];

const PieChartData2 = [
  { name: "John", value: 400, color: "primary" },
  { name: "Smith", value: 300, color: "secondary" },
  { name: "Snow", value: 300, color: "warning" },
  { name: "Petter", value: 200, color: "success" },
];
export default function AdminDashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  const [totalSales, setTotalSales] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [lastWeekSales, setLastWeekySales] = useState(0);
  const [lastMonthSales, setLastMonthSales] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [topCategory, setTopCategory] = useState([]);
  const [topCustomer, setTopCustomer] = useState([]);
  const access = JSON.parse(localStorage.getItem('token'));
  const token = access?.token
    
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://cybercitiesapi.developer-um.xyz/api/admin-totalsales-count`,
      headers: headers,
  }).then((response) => {
      // console.log("response", response)
      const Data = response.data
      if (Data.status == "success") {
        let product = []
        setTotalSales(Data.totalsales_count[0].total)
        setTodaySales(Data.todaysales_count[0].total)
        setLastWeekySales(Data.lastweeksales_count[0].total)
        setLastMonthSales(Data.lastmonthsales_count[0].total)
      }
     
    }).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    })

    axios({
      method: 'GET',
      url: `https://cybercitiesapi.developer-um.xyz/api/admin-vendor-sales`,
      headers: headers,
  }).then((response) => {
      const Data = response.data
      if (Data.admin_vendor_sales.length > 0) {
        let product = []
        const color = ["primary", "secondary", "warning", "success"];
        for(let i=0;i<4;i++){
          product.push({name:Data.admin_vendor_sales[i]?.seller?.name,value:Data.admin_vendor_sales[i]?.total_amount,color:color[i]})
        }
      setTopCategory(product)
      }
   
    }).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    })

    
    axios({
      method: 'GET',
      url: `https://cybercitiesapi.developer-um.xyz/api/admin-customer-count`,
      headers: headers,
  }).then((response) => {
      const Data = response.data
      if (Data.top_customers.length > 0) {
        let product = []
        const color = ["primary", "secondary", "warning", "success"];
        for(let i=0;i<4;i++){
          product.push({name:Data.top_customers[i]?.users?.name,value:Data.top_customers[i]?.total_amount,color:color[i]})
        }
      setTopCustomer(product)
      }
   
    }).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    })
  
  //   axios({
  //     method: 'GET',
  //     url: `https://cybercitiesapi.developer-um.xyz/api/seller-top-products`,
  //     headers: headers,
  // }).then((response) => {
  //     const Data = response.data
      
  //     if (Data.status == "success") {
  //       let product = []
  //       const color = ["primary", "secondary", "warning", "success"];
  //       for(let i=0;i<4;i++){
  //         product.push({name:Data.seller_top_products[i]?.name,value:Data.seller_top_products[i]?.orders_count,color:color[i]})
  //       }
  //     setTopProduct(product)
  //     }
  //     else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: error.message,
  //       })
  //     }
  //   }).catch((error)=>{
      
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: error.message,
  //     })
  //   })
  

  
  
},[])

  
  

  return (
    <>
      <PageTitle title="Dashboard" 
    //   button={<Button
    //   variant="contained"
    //   size="medium"
    //   color="secondary"
    // >
    //     Latest Reports
    // </Button>}
     />
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="Total Sales"
            upperTitle
            disableWidgetMenu = {true}
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
                {totalSales}
              </Typography>
                </Grid>
                <Grid item xs={6}>
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: todaySales },
                  { value: lastWeekSales },
                  { value: lastMonthSales },
                  { value: totalSales }
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Today
                </Typography>
                <Typography size="md">{todaySales}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Last Week
                </Typography>
                <Typography size="md">{lastWeekSales}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Last Month
                </Typography>
                <Typography size="md">{lastMonthSales}</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Top Customers (Sales)" disableWidgetMenu = {true} upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={topCustomer}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {topCustomer.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {topCustomer.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp; $ {value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        {/* <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Server Overview"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                60% / 37°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      fill={theme.palette.secondary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                54% / 31°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                57% / 21°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.warning.main}
                      fill={theme.palette.warning.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Widget>
        </Grid> */}
      {/* {topProduct.length >0 &&
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Top Products" disableWidgetMenu = {true} upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={topProduct}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {topProduct.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {topProduct.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>} */}
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Top Vendor (Sales)" disableWidgetMenu = {true} upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={topCategory}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {topCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {topCategory.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp; $ {value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        {/* <Grid item xs={12}>
          <Widget
          disableWidgetMenu = {true}
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Sales Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      This Month
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Last Month
                    </Typography>
                  </div>
                  {/* <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Desktop
                    </Typography>
                  </div> */}
                {/* </div> */}
                {/* <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select> */}
              {/* </div> */}
            {/* }
          > */}
            {/* <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={mainChartData}
              >
                <YAxis
                  ticks={[0, 2500, 5000, 7500]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="desktop"
                  fill={theme.palette.background.light}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="mobile"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="tablet"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget> */}
        {/* </Grid>  */}
        {/* {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))} */}
        <Grid item xs={12}>
          {/* <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget> */}
        </Grid>
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);
  
  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
