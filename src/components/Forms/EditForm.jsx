import "./Forms.css";

const EditForm = ({ contact, onEdit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;
    const newContact = { id: contact._id, name: newName, number: newNumber };

    onEdit(newContact);

    form.reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        defaultValue={contact.name}
        className="input"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        defaultValue={contact.number}
        className="input"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button className="button" type="submit">
        Edit
      </button>
    </form>
  );
};
export default EditForm;
