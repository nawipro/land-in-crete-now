import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import {
  FileText,
  DollarSign,
  CalendarDays,
  Receipt,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/content', label: 'Content', icon: FileText },
  { to: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { to: '/admin/calendar', label: 'Calendar Sync', icon: CalendarDays },
  { to: '/admin/tax-seasons', label: 'Tax Seasons', icon: Receipt },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const sidebar = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#e9e4df]">
        <h1 className="text-[20px] font-cormorant font-medium text-[#1A1714]">Now We Land</h1>
        <p className="text-[12px] font-inter text-[#8a8580] mt-0.5">Admin Panel</p>
      </div>

      {/* Nav links */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-inter transition-colors ${
                isActive
                  ? 'bg-[#c5a059]/10 text-[#c5a059] font-medium'
                  : 'text-[#6B6560] hover:bg-[#f0ebe5] hover:text-[#1A1714]'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#e9e4df] space-y-2">
        <button
          onClick={() => { navigate('/'); setSidebarOpen(false); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-inter text-[#6B6560] hover:bg-[#f0ebe5] w-full transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Site
        </button>
        <div className="px-4 py-2">
          <p className="text-[11px] font-inter text-[#B8B2AC] truncate">{user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-inter text-red-500/70 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#e9e4df]">
        <h1 className="text-[18px] font-cormorant font-medium text-[#1A1714]">Now We Land</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[#6B6560]">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-[280px] bg-white border-r border-[#e9e4df] shadow-xl">
            {sidebar}
          </div>
          <div className="flex-1 bg-black/20" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[260px] bg-white border-r border-[#e9e4df] min-h-screen sticky top-0">
          {sidebar}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
