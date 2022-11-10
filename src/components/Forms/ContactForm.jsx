import "./Forms.css";
import Loader from "../Loader/Loader";
import {
  useGetContactsQuery,
  useAddContactMutation,
} from "../../Redux/reducer";

const ContactForm = () => {
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;
    const contact = { name: newName, number: newNumber };

    addContact(contact);
    form.reset();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="name"
        className="input"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        placeholder="phone number"
        className="input"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      {isLoading && <Loader></Loader>}
      <button className="button" type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
