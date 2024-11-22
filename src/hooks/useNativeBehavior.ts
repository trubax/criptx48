import { useEffect } from 'react';

export const useNativeBehavior = () => {
  useEffect(() => {
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const element = e.target as HTMLElement;
      const scrollable = element.closest('.scroll-container, .chat-list-container, .contacts-list-container, .users-list-container, .settings-container');
      
      if (scrollable) {
        const isAtTop = scrollable.scrollTop <= 0;
        if (isAtTop && currentY > startY) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    // Previeni zoom con due dita
    const handleGesture = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchstart', handleGesture, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleGesture);
    };
  }, []);
}; 