import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODOリスト
        </Typography>
        <Button color="inherit" onClick={() => navigate("/add")}>
          <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
