import Link from "next/link";

export default function GameTypes({ games }) {
  return (
    <div className="flex items-center pl-6 pr-6 m-4 bg-slate-800 border-2 max-w-52 border-slate-800 hover:bg-green-600 rounded-3xl hover-grow">
      <Link href={games}>
        <p className="text-center text-lg capitalize">{games}</p>
      </Link>
    </div>
  );
}
