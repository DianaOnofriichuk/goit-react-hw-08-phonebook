import './PhoneBook.css'
import ContactForm from '../../components/Forms/ContactForm'
import Filter from '../../components/Filter/Filter'
import ContactList from '../../components/ContactList/ContactList'

const PhoneBook = () => {
  return (
    <div className="phonebook">
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <h2 className="title">Contacts</h2>
      <Filter />
      <ContactList className="contacts-list" />
    </div>
  )
}
export default PhoneBook
