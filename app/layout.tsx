import type { Metadata } from "next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import { UIProvider } from "@/contexts/UIContext";
import { DataProvider } from "@/contexts/DataContext";
import GlobalSpinner from "@/components/feedback/GlobalSpinner";

export const metadata: Metadata = { 
  title: "Survey Dashboard",
  description: "Survey Project Management Dashboard"
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UIProvider>
            <ToastProvider>
              <DataProvider>
                {children}
                <GlobalSpinner />
              </DataProvider>
            </ToastProvider>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
