import React from 'react';

const HowToUse: React.FC = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-red-600">How to Use</h2>
      <ol className="list-decimal list-inside space-y-2 text-black">
        <li>Enter your video title in the Title field.</li>
        <li>Customize the title color, font size, and style using the provided controls.</li>
        <li>Adjust letter spacing for unique text effects.</li>
        <li>Upload a background image for your thumbnail.</li>
        <li>Upload a foreground image (e.g., a product or person). The background will be automatically removed!</li>
        <li>Adjust the foreground image position by dragging it in the preview area.</li>
        <li>Use the scale and rotation controls to fine-tune the foreground image.</li>
        <li>Click Generate and Download Thumbnail to save your creation.</li>
      </ol>
      <p className="mt-4 text-white">
        Tip: Experiment with different font styles, sizes, and letter spacing to make your title stand out. The red and white color scheme is eye-catching for thumbnails!
      </p>
    </div>
  );
};

export default HowToUse;