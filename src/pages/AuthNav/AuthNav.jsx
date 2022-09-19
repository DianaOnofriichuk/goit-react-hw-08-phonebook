import { NavLink } from 'react-router-dom'
const AuthNav = () => {
  return (
    <div className="auth-nav">
      <NavLink
        className="header-button"
        activeclassname="active"
        to="registration"
      >
        Registration
      </NavLink>
      <NavLink className="header-button" activeclassname="active" to="logIn">
        Log in
      </NavLink>
    </div>
  )
}
export default AuthNav
