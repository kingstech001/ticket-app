export default function ProgressBar({ progress } : { progress: number }) {
  return (
    <div className="w-full my-4">
      <div className="w-full bg-[#0E464F] h-[4px] rounded-lg mt-[12px]">
        <div
          className="h-[4px] bg-[#24A0B5] rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
