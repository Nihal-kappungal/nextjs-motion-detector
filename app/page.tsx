import { ShakeDetector } from "@/components/shake/ShakeDetector";

export default function Home() {
  return (
    <div className="flex flex-1 bg-black">
      <ShakeDetector />
    </div>
  );
}
