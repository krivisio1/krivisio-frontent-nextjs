import Link from 'next/link'

export const DashboardHeader = () => (
  <header className="bg-white flex justify-between items-start w-full px-8 pt-10 pb-4">
    <div>
      <div className="text-lg text-[#161C28]">Welcome</div>
      <div className="text-[42px] text-[#FB5711] font-bold mt-1">Shantanu</div>
    </div>
    <Link href="/management/dashboard/project-create">
      <button className="bg-[#FB5711] hover:bg-orange-400 text-white px-6 py-2 rounded font-semibold shadow mt-1 transition">
        + Create
      </button>
    </Link>
  </header>
)