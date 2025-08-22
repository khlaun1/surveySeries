"use client";

import AppShell from "@/components/shell/AppShell";
import TopBar from "@/components/shell/TopBar";
import SidebarSeriesList from "@/components/shell/SidebarSeriesList";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      renderHeader={({ openSidebar }) => (
        <TopBar
          title="Survey Dashboard"
          onMenuClick={openSidebar}
        />
      )}
      sidebar={<SidebarSeriesList />}
    >
      {children}
    </AppShell>
  );
}
