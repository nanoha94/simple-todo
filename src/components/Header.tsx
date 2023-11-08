import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODOリスト
        </Typography>
        <Button color="inherit" onClick={() => {}}>
          <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
