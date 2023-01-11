import {
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { UserContext } from "../../UserContext/UserContext";
import { TokenContext } from "../../TokenContext/TokenContext";
import { Link as RoutLink, useNavigate } from "react-router-dom";

export const Registor = () => {


  const navigate=useNavigate()
  const {setUser}=useContext(UserContext)
  const {setToken}=useContext(TokenContext)


  const [inpTyp, setInpTyp] = useState(false);

  const schema = Yup.object({
    first_name: Yup.string().required("Requred"),
    last_name: Yup.string().required("Requred"),
    email: Yup.string().email("Invalid format email").required("Requred"),
    password: Yup.string()
      .min(3, "Min 3 length")
      .max(8, "Max 8 length")
      .required("Requred"),
    gender: Yup.string().required("Requred"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
    },
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data) => {
    axios
      .post('http://localhost:8080/register', data)
      .then((res) => {
        if (res.status===201) {
          setUser(res.data.user)
          setToken(res.data.accessToken)
          navigate("/")
        }
        console.log(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper
      sx={{ width: "50%", marginX: "auto", marginTop: 15, padding: "32px" }}>
      <Typography variant="h4" component="h2" textAlign="center">
        Registor
      </Typography>
      <Typography variant="body2" textAlign={"center"} mb="20px" mt={"10px"}>
          Sizda account yo'qmi?
          <Link component={RoutLink} to="/login">
              Login
          </Link>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} marginBottom="20px">
          <TextField
            label="Firs name"
            variant="outlined"
            helperText={errors.first_name?.message}
            {...register("first_name")}
          />
          <TextField
            label="Last name"
            variant="outlined"
            helperText={errors.last_name?.message}
            {...register("last_name")}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            {...register("password")}
            helperText={errors.password?.message}
            label="Password"
            type={inpTyp ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setInpTyp(!inpTyp)}>
                  <VisibilityIcon cursor="pointer" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            labelId="demo-simple-select-label"
            label="Gender"
            helperText={errors.gender?.message}
            {...register("gender")}>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </TextField>
        </Stack>
        <Button type="submit" disabled={!isValid} variant="contained">
          Send
        </Button>
      </form>
    </Paper>
  );
};
