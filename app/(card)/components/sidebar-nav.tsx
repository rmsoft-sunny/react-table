"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavItem {
  title: string;
  components: React.ReactNode;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
  onItemClick: (components: React.ReactNode) => void;
}

export function SidebarNav({
  className,
  items,
  onItemClick,
  ...props
}: SidebarNavProps) {
  const titles = [{ title: "기본 정보" }, { title: "지원 정보" }];

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <button
          key={`${index}_sidebar`}
          onClick={() => onItemClick(item.components)}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            titles[index]?.title === item.title
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}
