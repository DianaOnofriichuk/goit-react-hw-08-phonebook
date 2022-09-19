import './ContactList.css'
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux'
import {
  useGetContactsQuery,
  useDeleteContactMutation,
  useEditContactMutation,
} from '../../Redux/reducer'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import EditForm from '../Forms/EditForm'

const ContactList = () => {
  const { data, isLoading: isGetLoading } = useGetContactsQuery()
  const filter = useSelector((state) => state.filter)
  const [
    deleteContact,
    { isLoading: isMutationLoading },
  ] = useDeleteContactMutation()
  const [editContact] = useEditContactMutation()

  const [showModal, setShowModal] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  const toggleModal = (contact) => {
    setShowModal(!showModal)
    setCurrentContact(contact)
  }
  const onEdit = (newContact) => {
    editContact(newContact)
    toggleModal()
  }

  const fileredContact = () => {
    try {
      return data.filter(
        (contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.includes(filter),
      )
    } catch (error) {
      return false
    }
  }

  return (
    <>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <button type="button" onClick={toggleModal} className="close-btn">
            Close
          </button>
          <EditForm contact={currentContact} onEdit={onEdit} />
        </Modal>
      )}

      {isGetLoading && <Loader></Loader>}
      {isMutationLoading && <Loader></Loader>}
      {fileredContact() && !isMutationLoading && (
        <ul>
          {fileredContact().map((contact) => {
            return (
              <li className="contacts-item" key={contact.id}>
                {contact.name}:{' '}
                <span className="contacts-number">{contact.number}</span>
                <button
                  className="button edit-btn"
                  type="button"
                  onClick={() => toggleModal(contact)}
                >
                  Edit
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    deleteContact(contact.id)
                  }}
                >
                  Delete
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default ContactList
