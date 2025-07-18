import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import SessionProvider from "../../context/SessionProvider";
import DashboardSidebar from "./DashboardSidebar";
import MobileSidebar from "./MobileSidebar";
import DashboardTopbar from "./DashboardTopbar";

const GlobalLayout: React.FC = () => {
	/* Drawer state for tablets/phones */
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<SessionProvider>
			{/* Root flex contains sidebar + content column */}
			<div className="flex h-screen w-screen bg-background-100 text-text-100 overflow-hidden">
				{/* ─────────────────────────  Sidebar (desktop)  ───────────────────────── */}
				<DashboardSidebar className="hidden lg:block" />

				{/* ─────────────────────────  Drawer sidebar (mobile / md)  ───────────── */}
				<MobileSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

				{/* ─────────────────────────  Right column  ───────────────────────────── */}
				<div className="flex flex-col flex-1">
					{/* Top‑bar gets a hamburger for mobile, search field, icons */}
					<DashboardTopbar onHamburgerClick={() => setDrawerOpen(true)} />

					{/* Scrollable outlet (cards grid lives in each page) */}
					<main
						className={`flex-1 justify-center overflow-y-auto`}
						// className={`flex-1 justify-center lg:pt-[21px] xl:pb-[10px] overflow-y-auto md:mx-8 lg:mx-[3%]`}
					>
						<Outlet />
					</main>
				</div>

				{/* Global toast notifications */}
				<Toaster richColors position="top-right" />
			</div>
		</SessionProvider>
	);
};

export default GlobalLayout;
