import { useEffect, useRef } from "react";
import {gsap} from 'gsap'

const Modal = ({ children, todos }) => {
    const modalTl = gsap.timeline()

    const modalRef = useRef()
    useEffect(() => {
        if (todos.error || todos.loading) {
            modalTl
              .to(modalRef.current, {
                xPercent: -450,
                opacity: 1,
                duration: 0.5,
              })
              .to(modalRef.current, {
                xPercent: 0,
                opacity: 0,
                duration: 0.5,
              });
        }
    }, [todos.error, todos.loading])
    return (
        <section ref={modalRef} className="modal">
            {children}
        </section>
    );
}

export default Modal;