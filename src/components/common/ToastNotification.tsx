import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const ToastNotification: React.FC = () => {
  const { toasts, dismissToast } = useStudy();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md ${
                isSuccess
                  ? 'bg-aurora-bg-elevated/95 border-emerald-500/40 text-emerald-300'
                  : isWarning
                  ? 'bg-aurora-bg-elevated/95 border-amber-500/40 text-amber-300'
                  : 'bg-aurora-bg-elevated/95 border-aurora-indigo/40 text-aurora-text-primary'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {!isSuccess && !isWarning && <Info className="w-4 h-4 text-aurora-indigo" />}
              </div>

              <div className="flex-1 text-xs font-medium leading-relaxed text-aurora-text-primary">
                {toast.message}
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                className="text-aurora-text-secondary hover:text-aurora-text-primary transition-colors p-0.5"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
