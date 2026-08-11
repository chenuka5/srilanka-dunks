import React from 'react';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center py-32 px-6">
      <div className="max-w-3xl w-full text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase">
          Get in Touch
        </h1>
        <p className="text-brand-gray-400 text-lg">
          Whether you are an athlete, parent, or potential sponsor, we want to hear from you.
        </p>
      </div>

      <div className="w-full max-w-xl bg-brand-surface p-8 border border-brand-gray-900 shadow-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                First Name
              </label>
              <input 
                type="text" 
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
              Message
            </label>
            <textarea 
              rows={5}
              className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson transition-colors resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <div className="pt-4">
             <Button type="button" className="w-full" variant="primary">Send Message →</Button>
          </div>
        </form>
      </div>
    </div>
  );
}