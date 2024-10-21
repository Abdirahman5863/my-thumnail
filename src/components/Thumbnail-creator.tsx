'use client'; // Client-side component

import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import HowToUse from './HowToUse';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { ThumbnailData } from '@/types/thumbnail';
import ThumbnailPreview from './ThumbnailPreview';
import ThumbnailControls from './ThumbnailControls';


const ThumbnailCreator: React.FC = () => {
  const [thumbnailData, setThumbnailData] = useState<ThumbnailData>({
    title: 'Your Video Title',
    titleColor: '#FFFFFF',
    titleFontSize: 48,
    titleFontStyle: 'font-bold',
    titleSpacing: 0,
    bgImage: '/placeholder.jpg',
    fgImage: '/placeholder-transparent.png',
    fgPosition: { x: 50, y: 50 },
    fgScale: 1,
    fgRotation: 0,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = async (newData: Partial<ThumbnailData>) => {
    setThumbnailData((prevData) => ({ ...prevData, ...newData }));
  };

  const generateThumbnail = async () => {
    if (previewRef.current) {
      const dataUrl = await toPng(previewRef.current, { quality: 1 });
      const link = document.createElement('a');
      link.download = 'youtube-thumbnail.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-gray-50">
      {/* Left Section: Instructions */}
      <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 mb-8 lg:mb-0">
        <h2 className="text-xl font-bold text-gray-700 mb-4">How to Use</h2>
        <HowToUse />
      </div>

      {/* Right Section: Preview and Controls */}
      <div className="lg:w-2/3 flex flex-col space-y-6">
        {/* Thumbnail Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Thumbnail Preview</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-hidden shadow-inner">
            <ThumbnailPreview ref={previewRef} data={thumbnailData} onChange={handleDataChange} />
          </div>
          <Button
            onClick={generateThumbnail}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            <Download className="mr-2 h-5 w-5" />
            Generate and Download Thumbnail
          </Button>
        </div>

        {/* Thumbnail Controls */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Thumbnail Controls</h2>
          <ThumbnailControls data={thumbnailData} onChange={handleDataChange} />
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCreator;
