import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Briefcase, ChartLine, IndianRupee, Menu, PieChart, Target } from "lucide-react";
import { Link } from "react-router-dom";
import LogInOut from "./LogInOut";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { title: "Dashboard", href: "/", icon: ChartLine },
  { title: "Expense", href: "/expense", icon: Briefcase },
  { title: "Income", href: "/income", icon: IndianRupee },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <NavigationMenu className="hidden md:flex">
            <Link to="/" className="flex items-center space-x-2 mr-10 ml-2 ">
                <PieChart className="h-6 w-6" />
                <span className="font-bold">VisionCapital</span>
            </Link>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link to={item.href} className={navigationMenuTriggerStyle()}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link> 
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center relative left-16">
          <ModeToggle />
          <LogInOut />
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute left-4 top-4 md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
                <Link to="/" className="flex items-center space-x-2">
                    <PieChart className="h-6 w-6" />
                    <span className="font-bold">VisionCapital</span>
                </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

