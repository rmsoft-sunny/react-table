import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex gap-4 bg-slate-50"
      style={{
        backgroundColor: "beige",
        height: "100vh",
      }}
    >
      <p>React Example</p>
      <Link href={"/basic"}>Basic</Link>
      <Link href={"/column-groups"}>Column Groups</Link>
      <Link href={"/column-ordering"}>Column Ordering</Link>
    </div>
  );
}
