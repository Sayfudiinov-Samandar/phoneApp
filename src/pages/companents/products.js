import {
  Box,
  Button,
  Tab,
  Tabs,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Modal } from "./Modal/Modal";
import { Stack } from "@mui/system";
import { AdminProductCard } from "./ProductCard/ProductCard";

export const Products = () => {
  const [value, setValue] = React.useState("");
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const nameRef = useRef("");
  const priceRef = useRef("");
  const categoryRef = useRef("");
  const imgRef = useRef("");

  const handelSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post("http://localhost:8080/products", {
        product_name: nameRef.current.value,
        product_price: priceRef.current.value,
        product_category: categoryRef.current.value,
        product_img: imgRef.current.value,
      })
      .then((res) => (res.status === 201 ? setProductModal(false) : ""))
      .catch((err) => console.log(err));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/category")
      .then((res) =>{ 
        if (res.status===200) {
          setCategory(res.data)
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const getProduct = async (id) => {
    id += 1;
    axios
      .get("http://localhost:8080/products?product_category=" + id)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct(value);
  }, [value]);

  return (
    <Box padding={"32px"}>
      <Button
        endIcon={<AddIcon />}
        variant="contained"
        onClick={() => setProductModal(true)}>
        Add product
      </Button>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            {category.map((item, id) => (
              <Tab key={id} label={item.categoyr_name} simple-tab={item.id} />
            ))}
          </Tabs>
        </Box>

        {category.map((item, id) => (
          <Box
          sx={{padding: "20px"}}
            role="tabpanel"
            key={id}
            hidden={value !== id}
            value={value}
            index={id}>
            <Grid container spacing={3}>
              {products.map((item) => (
                <Grid item xs={3} key={item.id}>
                  <AdminProductCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      <Modal
        title={"Add product"}
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
    </Box>
  );
};
