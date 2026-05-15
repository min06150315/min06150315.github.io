import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MainPopupProps {
  onClose: () => void;
}

const MainPopup = ({ onClose }: MainPopupProps) => {
  const calculateDDay = () => {
    const targetDate = new Date('2026-11-25');
    const today = new Date();

    const diff = targetDate.getTime() - today.getTime();
    const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : '🎉';
  };

  const handleCloseToday = () => {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    localStorage.setItem(
      'hide-main-popup-until',
      tomorrow.getTime().toString(),
    );
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-90 bg-surface border border-hover-black rounded-4xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-secondary" />

          <div className="p-5 pt-12 text-center">
            <p className="text-sm font-medium text-on-surface-variant mb-2 tracking-tight">
              안녕하세요, 민경빈입니다.
            </p>

            <h2 className="text-5xl font-black text-on-surface mb-4 tracking-tighter">
              전역 <span className="text-primary">{calculateDDay()}</span>
            </h2>

            <button
              onClick={handleCloseToday}
              className="w-full py-2 text-[11px] text-on-surface-variant hover:text-on-surface transition-colors"
            >
              오늘 하루 보지 않기
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-on-surface-variant hover:bg-hover-black rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MainPopup;
