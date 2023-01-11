import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link as RoutLink } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import { TokenContext } from "../../TokenContext/TokenContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge, Drawer, Grid, List } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { UserProductCard } from "../companents/ProductCard/ProductCard";
import axios from "axios";
import { useCart } from "react-use-cart";
import { Stack } from "@mui/system";
import { CartCart } from "../companents/CartCart/CartCart";
import { Modal } from "../companents/Modal/Modal";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export const Clinet = () => {
  const { user, setUser } = React.useContext(UserContext);
  const { token, setToken } = React.useContext(TokenContext);
  const [drawer, setDrawer] = React.useState(false);
  const [product, setProduct] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { totalItems, isEmpty, emptyCart, items, cartTotal,id } = useCart();
  const [clentModal, setClentModal] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handalOrder = () => {
    axios
      .post("http://localhost:8080/orders", {
        user_id: user.id,
        user_email: user.email,
        user_name: user.first_name,
        items: items,
        totalPrice: cartTotal,
      })
      .then((res) => {
        if (res.status===201) {
          setClentModal(false)
          setDrawer(false)
          emptyCart(id)
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                LOGO
              </Typography>

              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                LOGO
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "10px" }}>
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  component={RoutLink}
                  to="/login">
                  Login
                </Button>
              </Box>

              <div>
                <React.Fragment>
                  <Badge badgeContent={totalItems} color="error">
                    <IconButton
                      sx={{ bgcolor: "white" }}
                      onClick={() => setDrawer(true)}>
                      <AddShoppingCartIcon color="primary" />
                    </IconButton>
                    <Drawer
                      anchor="right"
                      open={drawer}
                      onClose={() => setDrawer(false)}>
                      <Box
                        sx={{
                          width: "400px",
                          padding: "20px",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}>
                        <Stack sx={{ flexGrow: 1 }}>
                          {isEmpty ? (
                            <Typography>Cart is empty</Typography>
                          ) : (
                            ""
                          )}

                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}>
                            {items.map((item, id) => (
                              <CartCart key={id} item={item} />
                            ))}
                          </List>
                          <Stack
                            spacing={2}
                            direction="row"
                            sx={{ mt: "auto" }}>
                            <Button
                              variant="contained"
                              onClick={() => emptyCart()}
                              color="error">
                              Clear cart
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => setClentModal(true)}
                              color="success">
                              Order
                            </Button>
                            <Typography variant="subtitle2">
                              Tottal price ${cartTotal}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Drawer>
                  </Badge>
                </React.Fragment>
              </div>

              {token ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar>
                        {user.first_name.charAt(0) +
                          " " +
                          user.last_name.charAt(0)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button
                        onClick={() => {
                          setToken("");
                          setUser("");
                        }}
                        variant="contained">
                        Log out
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                ""
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ padding: "32px" }}>
        <Container>
          <Grid container spacing={3}>
            {product.map((item, id) => (
              <Grid key={id} item xs={3}>
                <UserProductCard item={item} key={item.id} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Modal title={"Are you sure"} setModal={setClentModal} modal={clentModal}>
        <Stack direction={"row"} spacing={3} padding="20px">
          <Button
            variant="outlined"
            onClick={() => setClentModal(false)}
            color="error"
            endIcon={<CloseIcon />}>
            No
          </Button>
          <Button
            variant="outlined"
            onClick={() => handalOrder()}
            endIcon={<DoneIcon />}
            color="success">
            Yes
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

// function TabPanel(props) {

//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}>
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

{
  /* <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Apple" {...a11yProps(0)} />
            <Tab label="Samsung" {...a11yProps(1)} />
            <Tab label="Vivo" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Apple
        </TabPanel>
        <TabPanel value={value} index={1}>
          Samsung
        </TabPanel>
        <TabPanel value={value} index={2}>
          Vivo
        </TabPanel>
      </Box> */
}
