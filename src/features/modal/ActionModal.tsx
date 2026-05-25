import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Trash2, Edit3, X } from 'lucide-react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  type?: 'danger' | 'success' | 'info' | 'edit';
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
}

const ActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = '확인',
  cancelText = '취소',
  children,
}: ActionModalProps) => {
  const config = {
    danger: {
      icon: <Trash2 className="text-red-500" size={24} />,
      btn: 'bg-red-500',
    },
    success: {
      icon: <CheckCircle2 className="text-green-500" size={24} />,
      btn: 'bg-green-500',
    },
    info: {
      icon: <AlertCircle className="text-primary" size={24} />,
      btn: 'bg-primary',
    },
    edit: {
      icon: <Edit3 className="text-blue-500" size={24} />,
      btn: 'bg-blue-500',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          {/* 배경 클릭 시 닫기 */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm bg-surface border border-hover-black rounded-[32px] shadow-2xl p-8 text-center"
          >
            {/* 상단 아이콘 */}
            <div className="flex justify-center mb-5">
              <div className="p-4 bg-surface-variant rounded-2xl">
                {config[type].icon}
              </div>
            </div>

            <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>

            {message && (
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed px-2">
                {message}
              </p>
            )}

            {/* 수정 textarea 등이 삽입되는 영역 */}
            {children && (
              <div className="mb-6 w-full text-left">{children}</div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 py-4 text-sm font-medium text-on-surface-variant bg-hover-black/50 hover:bg-hover-black rounded-2xl transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-4 text-sm font-bold text-white rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-black/10 ${config[type].btn}`}
              >
                {confirmText}
              </button>
            </div>

            {/* 우측 상단 엑스 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1 text-on-surface-variant/50 hover:text-on-surface transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ActionModal;
