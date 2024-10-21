import ThumbnailCreator from "@/components/Thumbnail-creator";


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-red-600 to-red-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">POV YouTube Thumbnail Creator</h1>
      <ThumbnailCreator />
    </div>
  );
}