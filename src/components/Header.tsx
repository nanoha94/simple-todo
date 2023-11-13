import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAddPage = () => {
    if (location.pathname === "/add") {
      return true;
    }
    return false;
  };

  const isHome = () => {
    if (location.pathname === "/") {
      return true;
    }
    return false;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {!isHome() && (
          <Button color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ fontSize: 32 }} />
          </Button>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODOリスト
        </Typography>
        {!isAddPage() && (
          <Button color="inherit" onClick={() => navigate("/add")}>
            <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
