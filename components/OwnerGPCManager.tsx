"use client";
import React, { useEffect, useState } from 'react';

export default function OwnerGPCManager() {
  const [files, setFiles] = useState<{ name: string }[]>([]);
  const [downloading, setDownloading] = useState("");

  useEffect(() => {
    fetch('/api/gpc')
      .then(res => res.json())
      .then(setFiles);
  }, []);

  const handleDownload = async (file: { name: string }) => {
    setDownloading(file.name);
    const res = await fetch(`https://<YOUR_SUPABASE_PROJECT>.supabase.co/storage/v1/object/public/zen-gpc/${file.name}`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
    setDownloading("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">All Uploaded GPC Files</h2>
      <ul className="list-disc ml-6 space-y-2">
        {files.length === 0 && <li>No files found.</li>}
        {files.map(file => (
          <li key={file.name} className="flex items-center gap-4">
            <span>{file.name}</span>
            <button
              className="bg-gold text-graphite font-bold py-1 px-3 rounded hover:bg-yellow-400 transition"
              onClick={() => handleDownload(file)}
              disabled={downloading === file.name}
            >
              {downloading === file.name ? 'Downloading...' : 'Download'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
