import "./Filter.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../Redux/actions";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const value = evt.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div>
      <p className="text">Find contacts by name</p>
      <input className="input" type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
