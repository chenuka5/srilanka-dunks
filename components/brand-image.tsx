interface BrandImageProps {
  alt: string;
  className?: string;
}

export default function BrandImage({ alt, className = '' }: BrandImageProps) {
  return (
    <div 
      className={`bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden relative ${className}`}
    >
      {/* Subtle grid pattern to look like a premium placeholder */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest text-center px-4 z-10">
        [ Image: {alt} ]
      </span>
    </div>
  );
}