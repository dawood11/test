import { useEffect } from 'react';
import './CustomCursor.css';

export const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;

    const updateCursor = () => {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      rafId = requestAnimationFrame(updateCursor);
    };

    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
      } else {
        cursor.style.display = 'block';
        document.body.style.cursor = 'none';
      }
    };

    const onMouseEnter = () => {
      cursor.style.display = 'block';
      document.body.style.cursor = 'none';
    };

    const onMouseLeave = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCursor();
      cursor.style.display = 'none';
      document.body.style.cursor = 'auto';
    };

    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      document.documentElement.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      cursor.remove();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return null;
};

