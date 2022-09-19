import './Modal.css'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ toggleModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', hendlerKeyDown)
  }, [])
  useEffect(() => {
    window.removeEventListener('keydown', hendlerKeyDown)
  })
  const hendlerKeyDown = (e) => {
    if (e.code === 'Escape') {
      toggleModal()
    }
  }
  const onModalClose = (e) => {
    if (e.currentTarget === e.target) {
      toggleModal()
    }
  }
  return createPortal(
    <div onClick={onModalClose} className="overlay">
      <div className="modal">{children}</div>
    </div>,
    modalRoot,
  )
}

export default Modal
