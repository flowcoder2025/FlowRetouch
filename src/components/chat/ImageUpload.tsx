"use client";

import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  currentImage?: string;
  onClear?: () => void;
}

export default function ImageUpload({ onImageSelect, currentImage, onClear }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (currentImage) {
    return (
      <div className="relative group">
        <div className="relative rounded-2xl overflow-hidden border-2 border-rose-200 shadow-lg">
          <img
            src={currentImage}
            alt="업로드된 이미지"
            className="w-full h-auto max-h-96 object-contain bg-white"
          />
          {onClear && (
            <button
              onClick={onClear}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="w-5 h-5 text-rose-500" />
            </button>
          )}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          이미지를 변경하려면 새 이미지를 드래그하거나 클릭하세요
        </p>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${isDragging
          ? "border-rose-400 bg-rose-50 scale-[1.02]"
          : "border-rose-200 hover:border-rose-300 hover:bg-rose-50/50"
        }
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-4">
        <div className={`
          p-4 rounded-full transition-all duration-300
          ${isDragging ? "bg-rose-200" : "bg-rose-100"}
        `}>
          {isDragging ? (
            <ImageIcon className="w-10 h-10 text-rose-500" />
          ) : (
            <Upload className="w-10 h-10 text-rose-400" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            {isDragging ? "여기에 놓으세요!" : "웨딩 사진을 업로드하세요"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            드래그 앤 드롭 또는 클릭하여 선택
          </p>
          <p className="text-xs text-gray-400 mt-2">
            JPG, PNG, WEBP (최대 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}
