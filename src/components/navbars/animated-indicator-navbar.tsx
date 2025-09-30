"use client";

import { Download, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NAV_ITEMS = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Education", link: "#education" },
  { name: "Coding Profiles", link: "#coding-profiles" },
  { name: "Contact", link: "#contact" },
];

const AnimatedIndicatorNavbar = () => {
  const [activeItem, setActiveItem] = useState(NAV_ITEMS[0].name);
  const [isScrolled, setIsScrolled] = useState(false);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(
        `[data-nav-item="${activeItem}"]`
      ) as HTMLElement;

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        indicatorRef.current.style.width = `${itemRect.width}px`;
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`;
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: { name: string; link: string }) => {
    setActiveItem(item.name);
    
    // Smooth scroll to section
    const element = document.querySelector(item.link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    // Create a temporary link element to download resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Assuming resume is in public folder
    link.download = 'Arjun_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border' 
        : 'bg-transparent'
    }`}>
      <nav className="container flex items-center justify-between mx-auto">
        {/* Left WordMark */}
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-display tracking-tighter text-foreground">
            AS
          </span>
        </a>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList
            ref={menuRef}
            className="rounded-4xl flex items-center gap-6 px-8 py-3 relative"
          >
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.name}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    data-nav-item={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`relative cursor-pointer text-sm font-medium hover:bg-transparent transition-colors duration-200 ${
                      activeItem === item.name
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </React.Fragment>
            ))}
            {/* Active Indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
            >
              <div className="bg-primary h-0.5 w-full rounded-t-none transition-all duration-300" />
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Popover */}
        <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} onNavClick={handleNavClick} onResumeDownload={handleResumeDownload} />

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            onClick={handleResumeDownload}
            className="h-10 py-2.5 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </nav>
    </section>
  );
};

export { AnimatedIndicatorNavbar };

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative h-6 w-6">
      <div className="absolute inset-0">
        <Menu
          className={`text-muted-foreground group-hover:text-foreground absolute transition-all duration-300 ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <X
          className={`text-muted-foreground group-hover:text-foreground absolute transition-all duration-300 ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({
  activeItem,
  setActiveItem,
  onNavClick,
  onResumeDownload,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
  onNavClick: (item: { name: string; link: string }) => void;
  onResumeDownload: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNavClick = (item: { name: string; link: string }) => {
    onNavClick(item);
    setIsOpen(false);
  };

  return (
    <div className="block lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <AnimatedHamburger isOpen={isOpen} />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative -left-4 -top-4 block w-screen max-w-md overflow-hidden rounded-xl p-0 lg:hidden bg-background/95 backdrop-blur-md border border-border"
        >
          <ul className="w-full py-4">
            {NAV_ITEMS.map((navItem, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleMobileNavClick(navItem)}
                  className={`text-left w-full flex items-center border-l-[3px] px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeItem === navItem.name
                      ? "border-primary text-foreground bg-primary/10"
                      : "text-muted-foreground hover:text-foreground border-transparent hover:bg-muted/50"
                  }`}
                >
                  {navItem.name}
                </button>
              </li>
            ))}
            <li className="flex flex-col px-7 py-2 mt-2">
              <Button 
                onClick={() => {
                  onResumeDownload();
                  setIsOpen(false);
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};