import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "./Modal/Modal";
import axios from "axios";
import { Stack } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const Cotegory = () => {
  const [contegoryModal, setcontegoryModal] = useState(false);
  const categoryRef = useRef();
  const [category, setCategory]=useState([])

  const handelSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post("http://localhost:8080/category", {
        categoyr_name: categoryRef.current.value,
      })
      .then((res) => (res.status === 201 ? setcontegoryModal(false) : ""))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/category")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{ padding: "32px" }}>
      <Button
        variant="contained"
        onClick={() => setcontegoryModal(true)}
        endIcon={<AddIcon />}>
        Add category
      </Button>

      <Box mt={"20px"}>
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <TableHead bgcolor="primary.dark">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category name</TableCell>
                <TableCell>Category action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                category.map(item=>{
                  return(
                    <TableRow>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.categoyr_name}</TableCell>
                      <TableCell>
                        <Stack direction={"row"} spacing="2">
                        <IconButton onClick={(()=>{console.log(item.id)})}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={(()=>{console.log(item.id)})}>
                          <DeleteIcon/>
                        </IconButton>
                        </Stack>
                      </TableCell>

                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal
        modal={contegoryModal}
        setModal={setcontegoryModal}
        title={"Add category"}>
        {" "}
        <form onSubmit={handelSubmit}>
          <DialogContent dividers>
            <TextField
              inputRef={categoryRef}
              label="Category"
              sx={{ width: "350px" }}
            />
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
