import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Products from "../../pages/products/Products";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import AddProduct from "../../pages/products/AddProduct";
import EditProduct from "../../pages/products/EditProduct";
import Orders from "../../pages/Orders/Orders";
import Order from "../../pages/Orders/Order";
import Profile from "../../pages/profile/Profile";
import AdminDashboard from "../../pages/Admin/Pages/dashboard/Dashboard";
import Vendors from "../../pages/Admin/Pages/Vendors/Vendors";
import Users from "../../pages/Admin/Pages/Users/Users";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  const access = JSON.parse(localStorage.getItem('token'))
  const role = access?.role
  
  return (
    <div className={classes.root}>
    {role === "user" &&
    
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/products" component={Products} />
              <Route path="/app/product/:id" component={EditProduct} />
              <Route path="/app/addProduct" component={AddProduct} />
              <Route path="/app/profile" component={Profile} />
              <Route path="/app/orders" component={Orders} />
              <Route path="/app/order/:id" component={Order} />
              <Route path="/app/typography" component={Typography} />
              {/* <Route path="/app/tables" component={Tables} /> */}
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            {/* <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box> */}
          </div>
        </>}
        {role === "admin" &&  
        <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
              <Route path="/app/admin/dashboard" component={AdminDashboard} />
           
            <Route path="/app/admin/vendors" component={Vendors} />
            {/* <Route path="/app/admin/product/:id" component={EditProduct} />
            <Route path="/app/admin/addProduct" component={AddProduct} />
            <Route path="/app/admin/profile" component={Profile} /> */}
            <Route path="/app/admin/users" component={Users} />
            {/* <Route path="/app/admin/order/:id" component={Order} /> */}
          
          
          </Switch>
        
          
        </div>
      </>
    }
    </div>
  );
}

export default withRouter(Layout);
