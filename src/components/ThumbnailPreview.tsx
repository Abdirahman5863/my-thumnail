/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import React, { forwardRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ThumbnailData } from '@/types/thumbnail';

interface ThumbnailPreviewProps {
  data: ThumbnailData;
  onChange: (newData: Partial<ThumbnailData>) => void;
}

const ThumbnailPreview = forwardRef<HTMLDivElement, ThumbnailPreviewProps>(({ data, onChange }, ref) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onChange({ fgPosition: { x, y } });
    }
  }, [isDragging, onChange]);

  return (
    <div 
      ref={ref} 
      className="relative w-full pt-[56.25%] bg-black"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0">
        <Image
          src={data.bgImage}
          alt="Thumbnail background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3
            className={`text-center px-4 ${data.titleFontStyle}`}
            style={{
              color: data.titleColor,
              fontSize: `${data.titleFontSize}px`,
              WebkitTextStroke: '1px black',
              textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
              letterSpacing: `${data.titleSpacing}px`,
            }}
          >
            {data.title}
          </h3>
        </div>
        <div
          className="absolute z-20 cursor-move"
          style={{
            left: `${data.fgPosition.x}%`,
            top: `${data.fgPosition.y}%`,
            transform: `translate(-50%, -50%) scale(${data.fgScale}) rotate(${data.fgRotation}deg)`,
            width: '50%',
            height: '50%',
          }}
          onMouseDown={handleMouseDown}
        >
          <Image
            src={data.fgImage}
            alt="Thumbnail foreground"
            layout="fill"
            objectFit="contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
});

ThumbnailPreview.displayName = 'ThumbnailPreview';

export default ThumbnailPreview;