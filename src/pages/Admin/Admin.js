import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Cotegory } from "../companents/Cotegory";
import { Order } from "../companents/Order";
import { Products } from "../companents/products";
export const Admin = () => {
  const menu = [
    {
      path: "order",
      title: "Order",
    },
    {
      path: "product",
      title: "Product",
    },
    {
      path: "cotegory",
      title: "cotegory",
    },
  ];

  return (
    <div>
      <Box display={"flex"}>
        <Box sx={{ width: "300px", bgcolor: "darkcyan", height: "100vh" }}>
          <Typography variant="h4" component="h2" textAlign="center">
            Registor
          </Typography>

          <List>
            {menu.map((item, id) => (
              <ListItem key={id}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Box sx={{ width: "85vw", bgcolor: "green" }}>
            <Typography variant="h4" component="h2" textAlign="center">
              Admin header
            </Typography>
          </Box>

          <Box>
              <Routes>
                <Route  path="/" element={<h1>Adminka</h1>}/>
                <Route  path="/order" element={<Order/>}/>
                <Route  path="/product" element={<Products/>}/>
                <Route  path="/cotegory" element={<Cotegory/>}/>
              </Routes>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
