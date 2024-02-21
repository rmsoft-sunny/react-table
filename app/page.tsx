import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4 bg-slate-50">
      <Link href={"/basic"}>기본 테이블</Link>
      <Link href={"/column-groups"}>컬럼 그룹</Link>
    </div>
  );
}
