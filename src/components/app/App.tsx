import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "../Navigator/Navigator";
import Content from "../Content/Content";
import Header from "../Header/Header";
import { DataService } from "../../services/DataService";
import { theme } from "../../theme";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
                Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}


const drawerWidth = 256;

const App = () => {
  const [ mobileOpen, setMobileOpen ] = React.useState( false );
  const [ testingData, setTestingData ] = React.useState();
  const isSmUp = useMediaQuery( theme.breakpoints.up( "sm" ) );


  const getTestingData = async() => {
    const dataService = new DataService();
    const data = await dataService.getTestingComponentsList();

    if( data.status === "success" ) {
      setTestingData( data );
    }
  };

  useEffect( () => {
    getTestingData();
  }, [ ] );

  const handleDrawerToggle = () => {
    setMobileOpen( !mobileOpen );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex",
        minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth },
            flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block",
              xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1,
          display: "flex",
          flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1,
            py: 6,
            px: 4,
            bgcolor: "#eaeff1" }}>
            <Content />
          </Box>
          <Box component="footer" sx={{ p: 2,
            bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
