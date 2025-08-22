// components/shell/TopBar.tsx
"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type TopBarProps = {
  title?: string;
  onMenuClick?: () => void;         // open mobile drawer
  TopMenusSlot?: React.ReactNode;   
  hideMenuButtonOnDesktop?: boolean;
};

export default function TopBar({
  title = "Dashboard",
  onMenuClick,
  TopMenusSlot,
  hideMenuButtonOnDesktop = true,
}: TopBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1, // stays above drawer edge
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: 56 }}>
        {/* Mobile/Tablet*/}
        <Box
          sx={{
            display: { xs: "inline-flex", lg: hideMenuButtonOnDesktop ? "none" : "inline-flex" },
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Open navigation"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" sx={{ mr: 2, whiteSpace: "nowrap" }}>
          {title}
        </Typography>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Optional menus area */}
        {TopMenusSlot}

        {/* Profile menu (placeholder) */}
        <Tooltip title="Account settings">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 30, height: 30 }}>U</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem disabled>Signed in as user@example.com</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
