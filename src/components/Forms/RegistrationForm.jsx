import "./Forms.css";
import { useDispatch } from "react-redux";
import { registration } from "../../Redux/actions";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    if (password.length < 6) {
      alert("password must be longer than 6 symbols");
    }
    const user = { name, email, password };

    dispatch(registration(user));

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
      ></input>
      <input
        placeholder="email"
        className="input"
        type="email"
        name="email"
      ></input>
      <input
        placeholder="password"
        className="input"
        type="password"
        name="password"
      ></input>
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};
export default RegistrationForm;
