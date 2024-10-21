"use client"

import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { HexColorPicker } from 'react-colorful';
import { ThumbnailData } from '@/types/thumbnail';

interface ThumbnailControlsProps {
  data: ThumbnailData;
  onChange: (newData: Partial<ThumbnailData>) => void;
}

const ThumbnailControls: React.FC<ThumbnailControlsProps> = ({ data, onChange }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'bgImage' | 'fgImage') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({ [type]: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const fontStyles = [
    'font-normal', 'font-bold', 'font-extrabold', 'italic', 'uppercase', 'lowercase',
    'font-serif', 'font-mono', 'tracking-tight', 'tracking-wide', 'leading-tight', 'leading-loose'
  ];

  return (
    <div className="bg-background p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Customize Your Thumbnail</h2>
      
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Enter main title"
        />
      </div>

      <div>
        <Label htmlFor="titleColor">Title Color</Label>
        <HexColorPicker color={data.titleColor} onChange={(color) => onChange({ titleColor: color })} />
      </div>

      <div>
        <Label htmlFor="titleFontSize">Title Font Size (px)</Label>
        <Input
          id="titleFontSize"
          type="number"
          min={12}
          max={200}
          value={data.titleFontSize}
          onChange={(e) => onChange({ titleFontSize: Number(e.target.value) })}
        />
      </div>

      <div>
        <Label htmlFor="titleSpacing">Title Letter Spacing (px)</Label>
        <Input
          id="titleSpacing"
          type="number"
          min={-10}
          max={50}
          value={data.titleSpacing}
          onChange={(e) => onChange({ titleSpacing: Number(e.target.value) })}
        />
      </div>

      <div>
        <Label>Title Font Style</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {fontStyles.map((style) => (
            <Button
              key={style}
              variant={data.titleFontStyle.includes(style) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newStyles = data.titleFontStyle.includes(style)
                  ? data.titleFontStyle.split(' ').filter(s => s !== style)
                  : [...data.titleFontStyle.split(' '), style];
                onChange({ titleFontStyle: newStyles.join(' ') });
              }}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="bgImage">Upload Background Image</Label>
        <Input
          id="bgImage"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'bgImage')}
        />
      </div>

      <div>
        <Label htmlFor="fgImage">Upload Foreground Image (Background will be automatically removed)</Label>
        <Input
          id="fgImage"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'fgImage')}
        />
      </div>

      <div>
        <Label htmlFor="fgScale">Foreground Image Scale</Label>
        <Input
          id="fgScale"
          type="number"
          min={0.1}
          max={2}
          step={0.1}
          value={data.fgScale}
          onChange={(e) => onChange({ fgScale: Number(e.target.value) })}
        />
      </div>

      <div>
        <Label htmlFor="fgRotation">Foreground Image Rotation (degrees)</Label>
        <Input
          id="fgRotation"
          type="number"
          min={-180}
          max={180}
          value={data.fgRotation}
          onChange={(e) => onChange({ fgRotation: Number(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default ThumbnailControls;