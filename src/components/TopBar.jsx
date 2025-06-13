import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  IconButton,
  Badge,
  Typography,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { FaBars } from "react-icons/fa";

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileSettings = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    setConfirmOpen(false);
    console.log("Logged out");
    navigate("/login"); // or your logout logic
  };

  return (
    <>
      <div className="w-full bg-white h-16 px-4 md:px-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-30">
        {/* Left: Menu toggle for mobile */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-black" onClick={onMenuClick}>
            <FaBars size={20} />
          </button>
          <div>
            <Typography variant="subtitle1" className="!text-black font-semibold">
              Hello, Kusha
            </Typography>
            <Typography variant="body2" className="!text-gray-400 text-sm">
              Have a nice day
            </Typography>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <IconButton>
            <Badge
              color="warning"
              variant="dot"
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <NotificationsIcon className="text-black" />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem className="!border-gray-300 h-6 hidden sm:block" />

          <Box
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Avatar src="src/assets/Image.png" alt="User" sx={{ width: 32, height: 32 }} />
            <Box className="hidden sm:block">
              <Typography variant="body2" className="!text-black font-medium leading-tight">
                Kusha Reddy
              </Typography>
              <Typography variant="caption" className="!text-gray-500">
                Agent
              </Typography>
            </Box>
            <ExpandMoreIcon className="text-black text-sm" />
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfileSettings}>Profile Settings</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 2, p: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: "#d25b2d" }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent className="text-sm text-gray-700">
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            sx={{
              borderColor: "#d25b2d",
              color: "#d25b2d",
              textTransform: "none",
              ":hover": {
                background: "#fbeae3",
                borderColor: "#d25b2d",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            sx={{
              background: "#d25b2d",
              textTransform: "none",
              ":hover": { background: "#c24f24" },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Topbar;
