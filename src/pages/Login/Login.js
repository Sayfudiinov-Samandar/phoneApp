import {
  InputAdornment,
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

export const Login = () => {

  const navigate= useNavigate()
  const {setUser}=useContext(UserContext)
  const {setToken}=useContext(TokenContext)


  const [inpTyp, setInpTyp] = useState(false);

  const schema = Yup.object({
    email: Yup.string().email("Invalid format email").required("Requred"),
    password: Yup.string()
      .min(3, "Min 3 length")
      .max(8, "Max 8 length")
      .required("Requred"),
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
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data) => {
    axios
      .post('http://localhost:8080/login', data)
      .then((res) => {
        if (res.status===200) {
          setUser(res.data.user)
          setToken(res.data.accessToken)
          navigate("/")
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper
      sx={{ width: "50%", marginX: "auto", marginTop: 15, padding: "32px" }}>
      <Typography variant="h4" component="h2" textAlign="center">
        Login
      </Typography>
      <Typography variant="body2" textAlign={"center"} mb="20px" mt={"10px"}>
          Sizda account yo'qmi?
          <Link component={RoutLink} to="/register">
              Register
          </Link>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} marginBottom="20px">
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
        </Stack>
        <Button type="submit" disabled={!isValid} variant="contained">
          Send
        </Button>
      </form>
    </Paper>
  );
};
