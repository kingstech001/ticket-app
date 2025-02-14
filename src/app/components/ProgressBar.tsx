interface ProgressBarProps {
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="w-full my-4 absolute top-0">
      <p className="text-end font-semibold text-white">Step {step} / 3</p>
      <div className="w-full bg-[#0E464F] h-[4px] rounded-lg mt-[12px]">
        <div
          className={`h-[4px] bg-[#24A0B5] rounded-lg`}
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
