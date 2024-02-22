import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "beige",
      }}
    >
      <p>React Example</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Link href={"/editable-data"}>EditableData</Link>
        <Link href={"/infinite-scrolling"}>InfiniteScrolling</Link>
        <Link href={"/sorting"}>Sorting</Link>
        <Link href={"/shad-table"}>ShadcnTable</Link>
      </div>
    </div>
  );
}
