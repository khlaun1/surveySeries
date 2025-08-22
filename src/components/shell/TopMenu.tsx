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
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  return (
    <Box sx={{ display: "inline-flex", gap: 1, alignItems: "center" }}>
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
      >
        View
      </Button>
      <Menu open={open} anchorEl={anchor} onClose={() => setAnchor(null)}>
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
      </Menu>
    </Box>
  );
}
