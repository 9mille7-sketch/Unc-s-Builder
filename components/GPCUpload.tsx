"use client";
import React, { useRef, useState } from 'react';

export default function GPCUpload({ userId }: { userId: string }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInput.current?.files?.[0]) return;
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append('file', fileInput.current.files[0]);
    formData.append('userId', userId);
    const res = await fetch('/api/gpc', { method: 'POST', body: formData });
    if (res.ok) {
      setStatus("Upload successful!");
    } else {
      setStatus("Upload failed");
    }
  };

  return (
    <form className="flex flex-col gap-2 mt-6" onSubmit={handleUpload}>
      <input type="file" accept=".gpc" ref={fileInput} required />
      <button type="submit" className="bg-gold text-graphite font-bold py-1 px-3 rounded hover:bg-yellow-400 transition">Upload GPC File</button>
      {status && <div className="text-sm opacity-70">{status}</div>}
    </form>
  );
}
