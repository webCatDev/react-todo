import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Modal = ({ children, todos }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (todos.error || todos.loading) {
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    }
  }, [todos.error, todos.loading]);
  return (
    <section ref={modalRef} className="modal">
      {children}
    </section>
  );
};

export default Modal;
