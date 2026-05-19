'use client';

import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { BuilderSidebar } from '@/components/builder/BuilderSidebar';
import { BuilderToolbar } from '@/components/builder/BuilderToolbar';

export default function BuilderPage() {
  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
      <BuilderToolbar />
      <div className="flex flex-1 overflow-hidden">
        <BuilderCanvas />
        <BuilderSidebar />
      </div>
    </div>
  );
}
