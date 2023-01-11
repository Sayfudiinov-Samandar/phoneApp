import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
export const Order = () => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Box padding={"32px"}>
        {data.map((item) => (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingX: "20px",
                  alignItems: "center",
                }}>
                <Typography>ID: {item.user_id}</Typography>
                <Typography>User name: {item.user_name}</Typography>
                <Typography>User email: {item.user_email}</Typography>
                <Typography>Total price: ${item.totalPrice}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails >
              {item.items.map((prd) => (
                <Card sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {prd.product_name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div">
                        Price: ${prd.product_price}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={prd.product_img}
                    alt="Live from space album cover"
                  />
                </Card>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};
