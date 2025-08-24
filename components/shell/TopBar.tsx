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
  Button,
  ListSubheader,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
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
  const [surveyAnchor, setSurveyAnchor] = React.useState<null | HTMLElement>(null);
  const [reportsAnchor, setReportsAnchor] = React.useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = React.useState<null | HTMLElement>(null);
  const [surveySetup, setSurveySetup] = React.useState<
    'survey-projects' | 'survey-templates' | 'terms' | 'course-catalog' | 'people'
  >('survey-projects');

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1, // stays above drawer edge
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: 64, px: 3 }}>
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
            sx={{
              border: '2px solid #ffffff',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '2px solid #ffffff',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            mr: 2, 
            whiteSpace: "nowrap",
            fontWeight: 700,
            fontSize: '1.125rem',
            letterSpacing: '-0.025em',
          }}
        >
          {title}
        </Typography>

        {/* Left-aligned dropdowns */}
        {TopMenusSlot}
        {/* Reports (plain dropdown, neobrutalist styling) */}
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={(e) => setReportsAnchor(e.currentTarget)}
          sx={{ 
            ml: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            height: 40,
            px: 2.25,
            fontSize: '0.95rem',
            bgcolor: '#ffffff',
            color: 'primary.main',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' }
          }}
          aria-haspopup="menu"
          aria-expanded={Boolean(reportsAnchor) ? 'true' : undefined}
        >
          Reports
        </Button>
        <Menu
          anchorEl={reportsAnchor}
          open={Boolean(reportsAnchor)}
          onClose={() => setReportsAnchor(null)}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          PaperProps={{ sx: { borderRadius: 1 } }}
        >
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>INSTRUCTOR</ListSubheader>
          <MenuItem onClick={() => setReportsAnchor(null)}>My Courses</MenuItem>
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>ADMIN</ListSubheader>
          <MenuItem onClick={() => setReportsAnchor(null)}>ClassRanked University</MenuItem>
          <MenuItem onClick={() => setReportsAnchor(null)}>College of Natural Sciences</MenuItem>
        </Menu>

        {/* Settings (plain dropdown, neobrutalist styling) */}
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={(e) => setSettingsAnchor(e.currentTarget)}
          sx={{ 
            ml: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            height: 40,
            px: 2.25,
            fontSize: '0.95rem',
            bgcolor: '#ffffff',
            color: 'primary.main',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' }
          }}
          aria-haspopup="menu"
          aria-expanded={Boolean(settingsAnchor) ? 'true' : undefined}
        >
          Settings
        </Button>
        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={() => setSettingsAnchor(null)}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          PaperProps={{ sx: { borderRadius: 1 } }}
        >
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>INSTITUTION</ListSubheader>
          <MenuItem onClick={() => setSettingsAnchor(null)}>Reporting Hierarchy</MenuItem>
          <MenuItem onClick={() => setSettingsAnchor(null)}>Academic Units</MenuItem>
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>DATA ENHANCEMENT</ListSubheader>
          <MenuItem onClick={() => setSettingsAnchor(null)}>Attributes</MenuItem>
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>OTHER</ListSubheader>
          <MenuItem onClick={() => setSettingsAnchor(null)}>Activity Monitor</MenuItem>
        </Menu>

        {/* Survey Setup menu (grouped radios) */}
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={(e) => setSurveyAnchor(e.currentTarget)}
          sx={{ 
            ml: 1,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            height: 40,
            px: 2.25,
            fontSize: '0.95rem',
            bgcolor: '#ffffff',
            color: 'primary.main',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#f5f5f5', boxShadow: 'none' }
          }}
          aria-haspopup="menu"
          aria-expanded={Boolean(surveyAnchor) ? 'true' : undefined}
        >
          Survey Setup
        </Button>
        <Menu
          anchorEl={surveyAnchor}
          open={Boolean(surveyAnchor)}
          onClose={() => setSurveyAnchor(null)}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          PaperProps={{ sx: { borderRadius: 1 } }}
        >
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>SURVEY DISTRIBUTION</ListSubheader>
          <MenuItem disableRipple disableGutters>
            <RadioGroup
              value={surveySetup}
              onChange={(_, v) => setSurveySetup(v as any)}
              sx={{ px: 2, py: 1 }}
              aria-label="Survey setup"
            >
              <FormControlLabel value="survey-projects" control={<Radio />} label="Survey Projects" />
              <FormControlLabel value="survey-templates" control={<Radio />} label="Survey Templates" />
            </RadioGroup>
          </MenuItem>
          <ListSubheader disableSticky sx={{ fontWeight: 600, color: 'text.secondary', px: 2 }}>TERM SETUP</ListSubheader>
          <MenuItem disableRipple disableGutters>
            <RadioGroup
              value={surveySetup}
              onChange={(_, v) => setSurveySetup(v as any)}
              sx={{ px: 2, py: 1 }}
            >
              <FormControlLabel value="terms" control={<Radio />} label="Terms" />
              <FormControlLabel value="course-catalog" control={<Radio />} label="Course Catalog" />
              <FormControlLabel value="people" control={<Radio />} label="People" />
            </RadioGroup>
          </MenuItem>
        </Menu>
        {/* Removed View/Settings/Help menus; these will live under profile menu */}

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Profile menu (placeholder) */}
        <Tooltip title="Account settings">
          <IconButton 
            onClick={(e) => setAnchorEl(e.currentTarget)} 
            sx={{ 
              ml: 1,
              border: '2px solid #ffffff',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '2px solid #ffffff',
              },
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                borderRadius: 0,
                backgroundColor: '#ffffff',
                color: '#2563eb',
                fontWeight: 700,
                border: '1px solid #000000',
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem disabled>Signed in as Dohn Joe User</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
