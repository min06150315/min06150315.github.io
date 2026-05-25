import ActionModal from './ActionModal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isPending?: boolean; // 삭제 중 로딩 상태 처리용
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = '정말 삭제할까요?',
  message = '삭제된 데이터는 복구할 수 없으니 신중하게 결정해 주세요.',
  isPending = false,
}: DeleteConfirmModalProps) => {
  return (
    <ActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      type="danger"
      title={title}
      message={message}
      confirmText={isPending ? '삭제 중...' : '삭제하기'}
      cancelText="취소"
    />
  );
};

export default DeleteConfirmModal;
