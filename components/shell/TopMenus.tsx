// components/shell/TopMenus.tsx
"use client";

import * as React from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListSubheader,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export type TopMenusProps = {
  onChangeDensity?: (value: "compact" | "comfortable") => void;
  onChangeThemeMode?: (value: "light" | "dark" | "system") => void;
};

export default function TopMenus({ onChangeDensity, onChangeThemeMode }: TopMenusProps) {
  const [viewAnchor, setViewAnchor] = React.useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = React.useState<null | HTMLElement>(null);
  
  const viewOpen = Boolean(viewAnchor);
  const settingsOpen = Boolean(settingsAnchor);

  return (
    <Box sx={{ display: "inline-flex", gap: 1, alignItems: "center" }}>
      {/* View Menu */}
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setViewAnchor(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={viewOpen ? "true" : undefined}
      >
        View
      </Button>
      <Menu 
        open={viewOpen} 
        anchorEl={viewAnchor} 
        onClose={() => setViewAnchor(null)}
      >
        <ListSubheader disableSticky>Density</ListSubheader>
        <MenuItem disableRipple disableGutters>
          <RadioGroup
            row
            defaultValue="comfortable"
            onChange={(_, v) => onChangeDensity?.(v as "compact" | "comfortable")}
            aria-label="Table density"
            sx={{ px: 2, pb: 1 }}
          >
            <FormControlLabel value="compact" control={<Radio />} label="Compact" />
            <FormControlLabel value="comfortable" control={<Radio />} label="Comfortable" />
          </RadioGroup>
        </MenuItem>
      </Menu>

      {/* Settings Menu */}
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setSettingsAnchor(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={settingsOpen ? "true" : undefined}
      >
        Settings
      </Button>
      <Menu 
        open={settingsOpen} 
        anchorEl={settingsAnchor} 
        onClose={() => setSettingsAnchor(null)}
      >
        <ListSubheader disableSticky>Theme</ListSubheader>
        <MenuItem disableRipple disableGutters>
          <RadioGroup
            row
            defaultValue="system"
            onChange={(_, v) => onChangeThemeMode?.(v as "light" | "dark" | "system")}
            aria-label="Theme mode"
            sx={{ px: 2, pb: 1 }}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            <FormControlLabel value="system" control={<Radio />} label="System" />
          </RadioGroup>
        </MenuItem>
        
        <MenuItem onClick={() => setSettingsAnchor(null)}>
          Export Data
        </MenuItem>
        <MenuItem onClick={() => setSettingsAnchor(null)}>
          Import Data
        </MenuItem>
      </Menu>
    </Box>
  );
}