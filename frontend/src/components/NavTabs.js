import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function LinkTab({ label, href }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (e) => { e.preventDefault(); navigate(href); };
  return <Tab label={label} onClick={handleClick} value={href} />;
}

LinkTab.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default function NavTabs() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => setValue(location.pathname), [location.pathname]);

  return (
    <Box sx={{ bgcolor: "#1976d2", color: "#fff", px: 2 }}>
      <Tabs value={value} textColor="inherit" indicatorColor="secondary">
        <LinkTab label="Dashboard" href="/dashboard" />
        <LinkTab label="Results" href="/results" />
        {!isAuthenticated && <Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>}
        {isAuthenticated && <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>}
      </Tabs>
    </Box>
  );
}
