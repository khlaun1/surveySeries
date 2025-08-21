"use client";

import { Box, useMediaQuery, useTheme, Drawer} from "@mui/material";
import {useState, useId, ReactNode} from "react";



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

export default function AppShell({
    header, sidebar, children, sidebarWidth = 200, contentMaxWidth, defaultSidebarOpen = false, disableGutters = false, 
    idMain = "main-content", onSidebarStateChange
}: AppShellProps) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {defaultMatches:true})

    const [open, setOpen] = useState(defaultSidebarOpen);

    const navId = useId();

    const handleOpen = () => {
        setOpen(true);
        onSidebarStateChange?.(true);
    }
    const handleClose = () => {
        setOpen(false);
        onSidebarStateChange?.(false);
    }


    return (
        <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100dvh"}}>
            {/*Header*/}
        </Box>
    );
}