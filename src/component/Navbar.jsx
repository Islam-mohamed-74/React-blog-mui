import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";

const pages = ["Home", "Blog", "Contact"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, handelLogout } = props;
  const [activePage, setActivePage] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/post") setActivePage("Blog");
    else if (path === "/")
      setActivePage(
        pages.includes("Categories") || pages.includes("Contact")
          ? "Categories"
          : null
      );
  }, [location]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log(e.target.innerText);
    switch (e.target.innerText.toUpperCase()) {
      case "BLOG":
        navigate("/post");
        break;
      case "HOME":
        navigate("/");
        break;
      case "CONTACT":
        navigate("/");
        break;
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    switch (e.target.innerText.toLowerCase()) {
      case "logout":
        handelLogout();
        navigate("/login");
        break;
    }
    setAnchorElUser(null);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
      text: {
        primary: "#000000",
        secondary: "#666666",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {/* Newsletter Bar */}

      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 1,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">
              Get weekly updates with our
              <Box
                component="a"
                href="#"
                sx={{
                  color: "inherit",
                  textDecoration: "underline",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                Newsletter
              </Box>
            </Typography>
            <IconButton
              size="small"
              sx={{ color: "white", position: "absolute", right: 16 }}
            ></IconButton>
          </Box>
        </Container>
      </Box>

      <AppBar
        position="static"
        sx={{ bgcolor: "white", color: "primary.main" }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                logo
              </Typography>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: page === activePage ? "bold" : "normal",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {!user && (
              <Box>
                <Button
                  sx={{ size: { xs: "small", sm: "medium" } }}
                  variant="text"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  sx={{
                    size: { xs: "small", sm: "medium" },
                    textTransform: "none",
                  }}
                  variant="contained"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Box>
            )}
            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name || "User"}
                      src="/static/images/avatar/2.jpg"
                      sx={{ backgroundColor: "black" }}
                    />
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
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

// "use client";
// import {
//   Box,
//   Container,
//   createTheme,
//   IconButton,
//   ThemeProvider,
//   Typography,
// } from "@mui/material";

// import { useState } from "react";

// export default function Navbar(props) {
//   // const { user, handelLogout } = props;
//   // const location = useLocation();

//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#000000",
//       },
//       secondary: {
//         main: "#ffffff",
//       },
//       text: {
//         primary: "#000000",
//         secondary: "#666666",
//       },
//     },
//   });
//   return (
//     <ThemeProvider theme={theme}>
//       {/* Newsletter Bar */}

//       <Box
//         sx={{
//           bgcolor: "primary.main",
//           color: "white",
//           py: 1,
//           position: "relative",
//         }}
//       >
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Typography variant="body2">
//               Get weekly updates with our
//               <Box
//                 component="a"
//                 href="#"
//                 sx={{
//                   color: "inherit",
//                   textDecoration: "underline",
//                   "&:hover": { textDecoration: "none" },
//                 }}
//               >
//                 Newsletter
//               </Box>
//             </Typography>
//             <IconButton
//               size="small"
//               sx={{ color: "white", position: "absolute", right: 16 }}
//             ></IconButton>
//           </Box>
//         </Container>
//       </Box>

//       {/* Header */}
//     </ThemeProvider>
//   );
// }

//
//

//     {/* Header */}
//     <header className="border-b border-gray-100 bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-black">
//           Wordcraft
//         </Link>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center space-x-8">
//           <Link
//             to="/"
//             className={`transition-colors ${
//               location.pathname === "/"
//                 ? "text-black font-semibold"
//                 : "text-gray-700 hover:text-black"
//             }`}
//           >
//             Home
//           </Link>
//           <Link
//             to="/post"
//             className={`transition-colors ${
//               location.pathname === "/post"
//                 ? "text-black font-semibold"
//                 : "text-gray-700 hover:text-black"
//             }`}
//           >
//             Posts
//           </Link>
//           <a
//             href="#categories"
//             className="text-gray-700 hover:text-black transition-colors"
//           >
//             Categories
//           </a>
//           <a
//             href="#about"
//             className="text-gray-700 hover:text-black transition-colors"
//           >
//             About
//           </a>
//           <div className="flex items-center space-x-1">
//             <a
//               href="#pages"
//               className="text-gray-700 hover:text-black transition-colors"
//             >
//               Pages
//             </a>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="text-gray-700"
//             >
//               <polyline points="6 9 12 15 18 9"></polyline>
//             </svg>
//           </div>
//         </nav>

//         {/* Auth Section */}
//         <div className="flex items-center space-x-4">
//           {!user && (
//             <>
//               <Link
//                 to="/login"
//                 className="text-gray-700 hover:text-black transition-colors"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2 transition-colors"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//           {user && (
//             <div className="relative group">
//               <button className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors">
//                 <span>{user.name}</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <polyline points="6 9 12 15 18 9"></polyline>
//                 </svg>
//               </button>
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 <div className="py-2">
//                   <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
//                     Profile
//                   </button>
//                   <button
//                     onClick={handelLogout}
//                     className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="3" y1="6" x2="21" y2="6"></line>
//             <line x1="3" y1="12" x2="21" y2="12"></line>
//             <line x1="3" y1="18" x2="21" y2="18"></line>
//           </svg>
//         </button>
//       </div>
//     </header>
//   </>
