
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, FileText, Home, Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const tabs = [
    { path: '/dashboard', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/consultas', label: 'Consultas', icon: <Calendar className="h-5 w-5" /> },
    { path: '/exames', label: 'Exames', icon: <FileText className="h-5 w-5" /> },
    { path: '/pacientes', label: 'Pacientes', icon: <User className="h-5 w-5" /> },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center justify-center ${
              isActive(tab.path)
                ? 'text-medapp-blue'
                : 'text-gray-500'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </Link>
        ))}
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center text-gray-500">
              <Menu className="h-5 w-5" />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-full sm:w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
