//Single place to own layout
//header placement, sidebar behavior, z-index stack, scroll containers
//height math and skip to content.
//aria-controls, focus management for drawers/menus, landmark roles. 

//responsibilities of appshell: 
   //structural grid => header row + content row; sidebar column + main column
   //responsive drawer orchestration: 
   //open/close state, breakpoint switching, focus trap when open.
   //skip link and landmark roles; 
   //scrollable main => make the right thing scroll and not the entire page. 
   //header above drawer above content; no overlaps. 
   //optional gutters and max width handling for content.
   //portal anchors for toasts/modals if needed. or leave to layout.

//No data fetching, no business logic, no page specific tool-bars, no gloabl-theme

"use client";
//I need a box from MUI for layout primitives. 
//Sidebar drawer, mediaQuery hoook and useTheme from MUI for breakpoints. 
//React state hook.
//accessibility ids which is useId.
import { Box, useMediaQuery, useTheme, Drawer} from "@mui/material";
import {useState, useId, ReactNode} from "react";


//what props should this thing take? So that this thing is reusable.
//It's a shell so, it needs slots: 
//header, sidebar, children.
//may need some layout knobs sidebar width, content max-width etc.

type AppShellProps = {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    children?: React.ReactNode;
    sidebarWidth?: number;
    contentMaxWidth?: number;
    defaultSidebarOpen?: boolean;
    disableGutters?: boolean;
    idMain?: string;
    onSidebarStateChange?: (open: boolean) => void;
}