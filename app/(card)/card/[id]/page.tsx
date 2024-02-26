import React from "react";
import { SidebarNav } from "../../components/sidebar-nav";
import CardTest from "./components/card-test";
import SettingTest from "./components/setting-test";

function CardDetailPage({ params, searchParams }: any) {
  const sidebarNavItems = [
    {
      title: "기본 정보",
      components: <CardTest />,
      url: "",
    },
    {
      title: "지원 정보",
      components: <SettingTest />,
      url: "card",
    },
  ];

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            params={params}
            searchParams={searchParams}
          />
        </aside>

        <div className="flex-1 lg:max-w-2xl">
          {searchParams.value === undefined && <CardTest />}
          {searchParams.value === "card" && <SettingTest />}
        </div>
      </div>
    </div>
  );
}

export default CardDetailPage;
