"use client";

import { Box, useMediaQuery, useTheme, Drawer} from "@mui/material";
import {useState, useId, ReactNode} from "react";




type AppShellProps = {
    header?: React.ReactNode;
    renderHeader?: (controls: { openSidebar: () => void; closeSidebar: () => void}) => ReactNode;
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
    header,renderHeader, sidebar, children, sidebarWidth = 200, contentMaxWidth, defaultSidebarOpen = false, disableGutters = false, 
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
            {/* Skip link for keyboard users */}
            <Box
            component="a"
            href={`#${idMain}`}
            sx={{
                position: "absolute",
                left: -9999,
                "&:focus": {
                left: 8,
                top: 8,
                zIndex: theme.zIndex.tooltip,
                bgcolor: "background.paper",
                p: 1,
                boxShadow: 1,
                borderRadius: 1,
                },
            }}
            >
                Skip to content
            </Box>
            
            {/* Header*/}
            <Box component="header" role="banner" sx={{ position: "sticky", top: 0, zIndex: theme.zIndex.appBar }}>
               {header ?? (renderHeader ? renderHeader({openSidebar: handleOpen, closeSidebar: handleClose}) : null)}
            </Box>
            {/*Content Row*/}
            <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isDesktop && sidebar? `${sidebarWidth}px 1fr` : "1fr",
                minHeight: "100dvh",
            }}>
                {/*Sidebar*/}
                {sidebar && (
                    <>
                       {isDesktop?(
                        <Box
                        component="nav"
                        role="navigation"
                        aria-label="Primary"
                        sx = {{borderRight: 1, borderColor: "divider", height: "100%", overflow: "auto"}}>{sidebar}</Box>
                       ) : (
                        <Drawer
                        variant="temporary"
                        open={open}
                        onClose={handleClose}
                        ModalProps={{keepMounted: true}}
                        PaperProps={{sx: {width: sidebarWidth}}}
                        aria-labelledby={navId}>
                            <Box
                            id={navId}
                            role="navigation" aria-label="Primary" sx={{height: "100%", overflow: "auto"}}>{sidebar}</Box>
                        </Drawer>
                       )}
                    </>
                )}
                {/*Main Content*/}
                <Box
                component="main" id={idMain} role="main" sx={{minWidth: 0,
                    minHeight: 0, overflow: "auto", px: disableGutters ? 0 : 2, py: disableGutters ? 0 : 2, 
                    ...(contentMaxWidth && {mx: "auto", maxWidth: contentMaxWidth}),
                }}>{children}</Box>
            </Box>
        </Box>
    );
}