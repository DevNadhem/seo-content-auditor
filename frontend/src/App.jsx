import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, LayoutTemplate, Image as ImageIcon, Type, Heading1 } from 'lucide-react';
import auditData from './seo_audit.json';

export default function App() {
  const { target_url, seo_metrics } = auditData;

  const StatusCard = ({ title, metric, status, icon: Icon }) => {
    const isOptimal = status.includes("Optimal");
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isOptimal ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          {isOptimal ? <CheckCircle className="text-green-500" size={24} /> : <AlertTriangle className="text-red-500" size={24} />}
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold text-white">{metric}</p>
          <p className={`text-sm font-medium ${isOptimal ? 'text-green-400' : 'text-red-400'}`}>
            {status}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Technical SEO Audit</h1>
          <p className="text-gray-400 text-lg">Diagnostic report for: <a href={target_url} className="text-blue-400 hover:underline">{target_url}</a></p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard 
            title="Title Length" 
            metric={`${seo_metrics.title.length} chars`} 
            status={seo_metrics.title.status} 
            icon={Type} 
          />
          <StatusCard 
            title="Meta Description" 
            metric={`${seo_metrics.meta_description.length} chars`} 
            status={seo_metrics.meta_description.status} 
            icon={LayoutTemplate} 
          />
          <StatusCard 
            title="H1 Headings" 
            metric={`${seo_metrics.headings.h1_count} tags`} 
            status={seo_metrics.headings.h1_status} 
            icon={Heading1} 
          />
          <StatusCard 
            title="Image Optimization" 
            metric={`${seo_metrics.images.missing_alt_count} Missing`} 
            status={seo_metrics.images.missing_alt_count === 0 ? "Optimal" : "Warning: Missing alt text tags."} 
            icon={ImageIcon} 
          />
        </div>

        {seo_metrics.images.missing_alt_count > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <h3 className="text-red-500 font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              Critical Action Required: Missing Image Alt Text
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {seo_metrics.images.missing_alt_sources.map((src, idx) => (
                <code key={idx} className="text-xs text-red-300 bg-red-950/50 p-2 rounded truncate block">
                  {src}
                </code>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}