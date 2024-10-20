'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Upload, Download } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import html2canvas from 'html2canvas'

const fontStyles = [
  'font-sans', 'font-serif', 'font-mono',
  'font-bold', 'font-extrabold', 'font-black',
  'italic', 'uppercase', 'lowercase', 'capitalize'
]

export default function Home() {
  const [title, setTitle] = useState('POV')
  const [titleColor, setTitleColor] = useState('#FFFFFF')
  const [titleFontSize, setTitleFontSize] = useState(4)
  const [titleFontStyle, setTitleFontStyle] = useState('font-sans font-bold uppercase')
  const [titleSpacing, setTitleSpacing] = useState(0)
  const [bgImage, setBgImage] = useState('/placeholder.svg?height=720&width=1280')
  const [fgImage, setFgImage] = useState('/placeholder.svg?height=720&width=1280')
  const [fgPosition, setFgPosition] = useState({ x: 50, y: 50 })
  const [fgScale, setFgScale] = useState(100)
  const bgFileInputRef = useRef<HTMLInputElement>(null)
  const fgFileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFontStyleChange = (style: string) => {
    setTitleFontStyle(prev => {
      const styles = prev.split(' ')
      if (styles.includes(style)) {
        return styles.filter(s => s !== style).join(' ')
      } else {
        return [...styles, style].join(' ')
      }
    })
  }

  const generateThumbnail = async () => {
    if (thumbnailRef.current) {
      const canvas = await html2canvas(thumbnailRef.current, {
        inlineSize: thumbnailRef.current.offsetWidth,
        Lock-size: thumbnailRef.current.offsetHeight,
        scale: 2,
        backgroundColor: null,
      })
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'youtube-thumbnail.png'
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          YouTube Thumbnail Creator
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Thumbnail Preview */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div ref={thumbnailRef} className="relative w-full aspect-video overflow-hidden">
              {/* Background Image */}
              <Image
                src={bgImage}
                alt="Thumbnail background"
                layout="fill"
                objectFit="cover"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 text-center">
                <h3 className={`text-[${titleFontSize}rem] ${titleFontStyle} leading-none tracking-tighter text-center px-4`}
                    style={{
                      color: titleColor,
                      WebkitTextStroke: '1px black',
                      textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
                      letterSpacing: `${titleSpacing}px`,
                    }}>
                  {title}
                </h3>
              </div>
              {/* Foreground Image */}
              <div 
                className="absolute z-20"
                style={{
                  left: `${fgPosition.x}%`,
                  top: `${fgPosition.y}%`,
                  transform: `translate(-50%, -50%) scale(${fgScale / 100})`,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  src={fgImage}
                  alt="Thumbnail foreground"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          {/* Customization Controls */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Customize Your Thumbnail</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter main title"
                />
              </div>
              <div>
                <Label htmlFor="titleColor">Title Color</Label>
                <Input
                  id="titleColor"
                  type="color"
                  value={titleColor}
                  onChange={(e) => setTitleColor(e.target.value)}
                  className="h-10 p-1"
                />
              </div>
              <div>
                <Label htmlFor="titleFontSize">Title Font Size</Label>
                <Slider
                  id="titleFontSize"
                  min={1}
                  max={10}
                  step={0.1}
                  value={[titleFontSize]}
                  onValueChange={(value) => setTitleFontSize(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="titleSpacing">Title Letter Spacing</Label>
                <Slider
                  id="titleSpacing"
                  min={-5}
                  max={20}
                  step={1}
                  value={[titleSpacing]}
                  onValueChange={(value) => setTitleSpacing(value[0])}
                />
              </div>
              <div>
                <Label>Title Font Style</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {fontStyles.map((style) => (
                    <Button
                      key={style}
                      variant={titleFontStyle.includes(style) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFontStyleChange(style)}
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
                  onChange={(e) => handleImageUpload(e, setBgImage)}
                  className="hidden"
                  ref={bgFileInputRef}
                />
                <Button 
                  onClick={() => bgFileInputRef.current?.click()} 
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Background Image
                </Button>
              </div>
              <div>
                <Label htmlFor="fgImage">Upload Foreground Image (No Background)</Label>
                <Input
                  id="fgImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setFgImage)}
                  className="hidden"
                  ref={fgFileInputRef}
                />
                <Button 
                  onClick={() => fgFileInputRef.current?.click()} 
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Foreground Image
                </Button>
              </div>
              <div>
                <Label>Foreground Image Position</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fgPositionX">X Position</Label>
                    <Slider
                      id="fgPositionX"
                      min={0}
                      max={100}
                      step={1}
                      value={[fgPosition.x]}
                      onValueChange={(value) => setFgPosition(prev => ({ ...prev, x: value[0] }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fgPositionY">Y Position</Label>
                    <Slider
                      id="fgPositionY"
                      min={0}
                      max={100}
                      step={1}
                      value={[fgPosition.y]}
                      onValueChange={(value) => setFgPosition(prev => ({ ...prev, y: value[0] }))}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="fgScale">Foreground Image Scale</Label>
                <Slider
                  id="fgScale"
                  min={10}
                  max={200}
                  step={1}
                  value={[fgScale]}
                  onValueChange={(value) => setFgScale(value[0])}
                />
              </div>
              <Button className="w-full" onClick={generateThumbnail}>
                <Download className="mr-2 h-4 w-4" /> Generate and Save Thumbnail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}