import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Calendar, FileText, Home, LogOut, Settings, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      path: "/consultas",
      label: "Consultas",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      path: "/exames",
      label: "Exames",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      path: "/dependentes",
      label: "Dependentes",
      icon: <User className="h-5 w-5" />,
    },
    {
      path: "/settings",
      label: "Configurações",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="bg-medapp-dark text-white w-64 min-h-screen hidden md:flex flex-col">
      <div className="p-5 border-b border-medapp-teal">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-medapp-sky">Med Agenda </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-medapp-blue text-white"
                  : "text-gray-300 hover:bg-medapp-teal hover:text-white"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-medapp-teal">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-medapp-blue flex items-center justify-center">
            {user?.nome.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.nome}</p>
            <p className="text-xs text-gray-300">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-medapp-teal hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </button>
      </div>
    </aside>
  );
};
