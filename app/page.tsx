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
        <Link href={"/basic"}>Basic</Link>
        <Link href={"/column-groups"}>ColumnGroups</Link>
        <Link href={"/column-ordering"}>ColumnOrdering</Link>
        <Link href={"/column-sizing"}>ColumnSizing</Link>
        <Link href={"/editable-data"}>EditableData</Link>
      </div>
    </div>
  );
}
