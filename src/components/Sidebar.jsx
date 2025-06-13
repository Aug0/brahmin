import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const navItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/vendor" },
  { name: "Page Name", path: "/page1" },
  { name: "Page Name", path: "/page2" },
  { name: "Page Name", path: "/page3" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    setConfirmOpen(false);
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-[#d75a2c] text-white p-4 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:h-screen md:flex md:flex-col md:justify-between`}
      >
        <div>
          <h2 className="text-lg font-semibold mb-6">Brahman Connect</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-yellow-400 hover:text-black text-white"
                    }`
                  }
                >
                  {item.icon && item.icon} {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-yellow-300 mt-4"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Confirm Dialog */}
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

export default Sidebar;
