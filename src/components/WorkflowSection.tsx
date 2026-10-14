import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/portfolioData';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="w-full max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center justify-center gap-3">
          <span className="w-8 h-1 bg-gold rounded-full"></span>
          خطة وسير العمل (Workflow)
          <span className="w-8 h-1 bg-gold rounded-full"></span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          خطوات واضحة ومنظمة تبدأ من الفكرة وتصل إلى ملف جاهز للنشر وتحقيق أعلى أداء.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {WORKFLOW_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between relative group hover:border-[#ffd700]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gold font-mono tracking-wider">
                  {step.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#ffd700]/50 group-hover:bg-[#ffd700] transition-colors"></span>
              </div>

              <h4 className="font-bold text-white text-base mb-2 leading-snug">
                {step.title}
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#ffd700]/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>مرحلة معتمدة</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
