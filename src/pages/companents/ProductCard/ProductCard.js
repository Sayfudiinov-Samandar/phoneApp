import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  DialogActions,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Delete, Edit } from "@mui/icons-material";
import { useCart } from "react-use-cart";
import axios from "axios";
import { Modal } from "../Modal/Modal";
import { Stack } from "@mui/system";

export const UserProductCard = ({ item }) => {
  const { product_name, product_price, product_img } = item;
  const { addItem } = useCart();
  return (
    <Card sx={{ padding: "10px" }}>
      <CardMedia
        sx={{ height: 350 }}
        image={product_img}
        title={product_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product_price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => addItem({ ...item, price: product_price })}
          endIcon={<ShoppingCartIcon />}
          variant="contained">
          Add to card
        </Button>
      </CardActions>
    </Card>
  );
};

export const AdminProductCard = ({ item }) => {
  const { product_name, product_price, product_img, id } = item;
  const [productModal, setProductModal] = useState(false);
  const [trueEditDelete, setTrueEditDelete] = useState(false);

  const nameRef = useRef("");
  const priceRef = useRef("");
  const categoryRef = useRef("");
  const imgRef = useRef("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/category")
      .then((res) =>{ 
        if (res.status===200) {
          setCategory(res.data)
        }
      })
      .catch((err) => console.log(err));
  }, [trueEditDelete]);


  const handelProductDelete = () => {
    setTrueEditDelete(true)
    axios
      .delete("http://localhost:8080/products/" + id)
      .then((res) => {
        if (res.status===200) {
        }
      })
      .catch((err) => console.log(err));
  };


  const handelSubmit = (evt) => {
    evt.preventDefault();

    axios
      .put("http://localhost:8080/products/"+id, {
        product_name: nameRef.current.value,
        product_price: priceRef.current.value,
        product_category: categoryRef.current.value,
        product_img: imgRef.current.value,
      })
      .then((res) => {
        if (res.status===200) {
          console.log(res);

          setTrueEditDelete(true)
        }
      })
      .catch((err) => console.log(err));
  };
  // (res.status === 201 ? setProductModal(false) : "")
  return (
    <>
      <Card sx={{ padding: "10px" }}>
        <CardMedia
          sx={{ height: 350 }}
          image={product_img}
          title={product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product_price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button endIcon={<Edit />} onClick={()=> setProductModal(true)} variant="contained" color="warning">
            Edit
          </Button>
          <Button
            endIcon={<Delete />}
            variant="contained"
            onClick={handelProductDelete}
            color="error">
            Delete
          </Button>
        </CardActions>
      </Card>

      <Modal
        title={"Edit product"}
        modal={productModal}
        setModal={setProductModal}>
        <form onSubmit={handelSubmit}>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                inputRef={nameRef}
                label="Product name"
                sx={{ width: "350px" }}
              />
              <TextField
                inputRef={priceRef}
                label="Product prise"
                sx={{ width: "350px" }}
              />
              <TextField
                inputRef={imgRef}
                label="Product img url"
                sx={{ width: "350px" }}
              />
              <TextField
                inputRef={categoryRef}
                label="Product category"
                sx={{ width: "350px" }}
                select>
                {category.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.categoyr_name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Modal>
    </>
  );
};
