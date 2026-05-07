export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-[24px] font-bold text-[#1a0dab] mb-4 retro-loading">
          Loading...
        </div>
        <div className="text-[12px] text-[#666666]">
          Retrieving portfolio data
        </div>
      </div>
    </div>
  )
}
