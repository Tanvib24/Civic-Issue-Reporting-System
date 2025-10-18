import React from 'react';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Ensure sidebar is open on desktop and closed initially on mobile
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <SidebarProvider isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
      <div className="min-h-screen flex">
        {/* Sidebar container with slide animation */}
        <div
          className={
            `relative z-40 h-screen ` +
            `${isMobile ? 'fixed' : 'sticky top-0'} ` +
            `overflow-visible transition-[transform,width] duration-300 will-change-transform ` +
            `${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''} ` +
            `${!isMobile ? (isSidebarOpen ? 'w-64' : 'w-0') : 'w-64'}`
          }
          aria-hidden={!isSidebarOpen && isMobile}
        >
          <Sidebar
            className="h-full"
            onNavigate={() => {
              if (isMobile) setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Overlay on mobile when sidebar open */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] animate-in fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          {(() => {
            const location = useLocation();
            return (
              <div
                key={location.pathname}
                className="flex-1 animate-in fade-in zoom-in-95 duration-500 ease-out"
              >
                {children}
              </div>
            );
          })()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;