import { useState, useEffect, useCallback } from 'react';
import MainPopup from './MainPopup';
import MainToast from './MainToast';

const NotificationManager = () => {
  const [showPopup, setShowPopup] = useState(() => {
    if (typeof window === 'undefined') return false;
    const now = new Date().getTime();
    const popupHideUntil = localStorage.getItem('hide-main-popup-until');
    return !popupHideUntil || now > parseInt(popupHideUntil);
  });

  const [showToast, setShowToast] = useState(false);

  const checkToast = useCallback((now: number) => {
    const toastHideUntil = localStorage.getItem('hide-main-toast-until');
    if (!toastHideUntil || now > parseInt(toastHideUntil)) {
      setTimeout(() => setShowToast(true), 1000);
    }
  }, []);

  useEffect(() => {
    const now = new Date().getTime();

    if (!showPopup) {
      checkToast(now);
    }
  }, [showPopup, checkToast]);

  const handlePopupClose = () => {
    setShowPopup(false);
    const now = new Date().getTime();
    checkToast(now);
  };

  return (
    <>
      {showPopup && <MainPopup onClose={handlePopupClose} />}
      {showToast && <MainToast />}
    </>
  );
};

export default NotificationManager;
