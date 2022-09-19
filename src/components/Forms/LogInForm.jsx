import './Forms.css'
import { useDispatch } from 'react-redux'
import { logIn } from '../../Redux/actions'

const LogInForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    const email = form.elements.email.value
    const password = form.elements.password.value
    const user = { email, password }

    dispatch(logIn(user))
    form.reset()
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
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
  )
}
export default LogInForm
