import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface SidebarNavItem {
  title: string;
  components: React.ReactNode;
  url?: string;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
  params: {
    id: string;
  };
  searchParams: {
    value: string;
  };
}

export function SidebarNav({
  className,
  items,
  params,
  searchParams,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Link
          href={`/card/${params.id}?${item.url && `value=${item.url}`}`}
          key={`${index}_sidebar`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            `${searchParams.value == item.url ? "bg-red-300" : "bg-blue-300"} 
            `,
            "hover:bg-muted justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
