export default function Loading() {
  const indexedPageCount = 12493

  return (
    <div className="min-h-screen bg-white px-4 py-6" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="max-w-[640px] border border-[#cccccc] bg-[#f5f5f5] px-4 py-3 text-[12px] text-[#333333]">
        <div className="font-bold text-[#0000cc]">Searching {indexedPageCount.toLocaleString()} indexed pages...</div>
        <div className="mt-1">Rendering results. No animations, no waiting spinner.</div>
      </div>
    </div>
  )
}
