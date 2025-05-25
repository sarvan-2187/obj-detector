import ObjectDetection from "@/components/object-detection";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center">
        <h1 className="text-3xl pt-6 font-bold px-6 bg-gradient-to-b from-gray-400 via-gray-50 to-gray-400 tracking-tight text-transparent bg-clip-text">Thief Detection Alarm</h1>
        <ObjectDetection/>
      </main>
    </div>
  );
}
