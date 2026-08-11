import React from 'react';
import Button from '@/components/ui/Button';

export default function StartHerePage() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase text-white">
          Where Do You <br /><span className="text-brand-crimson">Begin?</span>
        </h1>
        <p className="text-brand-gray-400 text-lg mb-12 leading-relaxed">
          Whether you are trying to grab the rim for the first time or add 5 inches to your max touch, it all starts with understanding your current baseline.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-brand-surface p-8 border border-brand-gray-900">
            <h2 className="text-2xl font-black text-white uppercase mb-2">Step 1: Get Tested</h2>
            <p className="text-brand-gray-400 text-sm mb-6">Find out where you stand against global athletic benchmarks.</p>
            <Button href="/vertical-jump-test" variant="outline" className="w-full">Take Jump Test</Button>
          </div>
          
          <div className="bg-brand-surface p-8 border border-brand-gray-900">
            <h2 className="text-2xl font-black text-white uppercase mb-2">Step 2: Get The Plan</h2>
            <p className="text-brand-gray-400 text-sm mb-6">Unlock our free foundation program to start building elasticity.</p>
            <Button href="/join" variant="primary" className="w-full">Create Free Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}