import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardPage } from "@/features/dashboard/dashboard-page";
import { HomePage } from "@/features/tasks/pages/home-page";

const rootRoute = createRootRoute({ component: () => <SiteShell><Outlet /></SiteShell> });
const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: "dashboard", component: () => <AppShell><DashboardPage /></AppShell> });
export const routeTree = rootRoute.addChildren([homeRoute, dashboardRoute]);
