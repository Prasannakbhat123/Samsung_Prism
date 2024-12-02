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

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = ["Home", "Blog", "Pricing", "Contact", "FAQ"];

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
    <AppBar position="static" color="transparent" elevation={0}>
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
              <span className="text-[#00a7a3]">d</span><span className="text-orange-400">b </span>Bigspring
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
            <h3 className="font-bold ml-10 text-2xl">
                <span className="text-[#00a7a3]">d</span><span className="text-orange-400">b </span>
  Bigspring
</h3>

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
