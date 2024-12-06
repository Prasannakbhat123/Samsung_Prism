import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IGlogo from '../assets/IGlogo.png';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = ["Home", "Try", "FAQ"];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    position: "relative",
    margin: "0 10px",
    fontWeight: "bold", 
    textTransform: "capitalize",
    fontSize: "16px" 
  };

  const underlineStyle = {
    position: "absolute",
    width: "100%",
    height: "2px",
    bottom: "-2px",
    left: 0,
    backgroundColor: "#00a7a3",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  };

  const handleMouseEnter = (event) => {
    const underline = event.currentTarget.querySelector(".underline");
    underline.style.transform = "scaleX(1)";
  };

  const handleMouseLeave = (event) => {
    const underline = event.currentTarget.querySelector(".underline");
    underline.style.transform = "scaleX(0)";
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>

      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
            <MenuIcon style={{ color: "#00a7a3" }} />
            </IconButton>
            <Typography
              variant="h6"
              style={{ flexGrow: 1, textAlign: "center" ,fontWeight: "bold" ,}}
            >
            <div className="flex">
            <img src={IGlogo} alt="logo" className="w-9 h-9"/>
            <h3 className="font-bold ml-1 text-2xl">
              <span className="text-[#104384]">Image</span><span className="text-black">Segmentor </span>
            </h3>
          </div>
            </Typography>
            <button className="w-[120px] bg-[#00a7a3] h-[40px] my-3 flex items-center justify-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#007a75] before:to-[#005c54] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Get Started
            </button>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List style={{ width: 250 }}>
                {menuItems.map((item) => (
                  <ListItem button key={item} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <>
          <div className="flex">
            <img src={IGlogo} alt="logo" className="w-9 h-9"/>
            <h3 className="font-bold ml-1 text-2xl">
              <span className="text-[#24B1EB]">Image</span><span className="text-black">Segmentor </span>
            </h3>
          </div>

            <div
              style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="font-bold"
                >
                  {item}
                  <div className="underline" style={underlineStyle}></div>
                </Button>
              ))}
            </div>
            <button className="w-[120px] bg-[#104384] h-[45px] my-3 flex items-center justify-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#007a75] before:to-[#005c54] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff] mr-5">
              Get Started
            </button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
