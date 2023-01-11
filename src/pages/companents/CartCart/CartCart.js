import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useCart } from "react-use-cart";

export const CartCart = ({item}) => {

    const {updateItemQuantity,removeItem, cartTotal} =useCart()
    const {product_name, product_price, id, quantity}=item
  return (
    <>
      <ListItem sx={{ display: "block" }} divider>
        <Stack mb="10px" direction={"row"} spacing="2">
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary={product_name} secondary={`$${product_price}`} />
        </Stack>

        <Box>
          <Stack spacing={2} direction="row" mb={"10px"}>
            <Button variant="contained" onClick={()=>updateItemQuantity(id, quantity+1)} size="small" color="secondary">
              +
            </Button>
            <Typography>{quantity}</Typography>
            <Button variant="contained" onClick={()=>updateItemQuantity(id, quantity-1)} size="small" color="secondary">
              -
            </Button>
            <Button variant="contained" size="small" onClick={()=>removeItem(id, quantity+1)} color="error">
              Remove all
            </Button>
            
          </Stack>
        </Box>
      </ListItem>
    </>
  );
};
