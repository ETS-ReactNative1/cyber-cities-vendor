import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  Person  as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";



function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
  const access = JSON.parse(localStorage.getItem('token'))
  
  let structure = []
  
  if(access?.role === 'admin'){ structure = [
    { id: 0, label: "Dashboard", link: "/app/admin/dashboard", icon: <HomeIcon /> },
  
    { id: 1, label: "Vendors", link: "/app/admin/vendors", icon: <FAQIcon /> },
    { id: 2, label: "Users", link: "/app/admin/users", icon: <FAQIcon /> },
    { id: 3, label: "Featured Products", link: "/app/admin/featuredProducts", icon: <FAQIcon /> },
    { id: 5, type: "divider" },
   
  ]}
  if(access?.role === 'user'){
    structure = [
      { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
     
      { id: 1, label: "Products", link: "/app/products", icon: <TableIcon /> },
      { id: 2, label: "Orders", link: "/app/orders", icon: <LibraryIcon /> },
      { id: 3, label: "Profile", link: "/app/profile", icon: <FAQIcon /> },
      
      { id: 5, type: "divider" },
    
    ]
  }
  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <div style={{backgroundColor:'red'}}>
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
    </div>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
