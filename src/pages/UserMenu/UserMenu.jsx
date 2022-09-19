import './UserMenu.css'
import '../AuthNav/AuthNav.css'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../Redux/actions'

const UserMenu = () => {
  const user = useSelector((state) => state.auth.user.name)
  const dispatch = useDispatch()
  return (
    <>
      <h1 className="header-title">Welcome {user}!</h1>
      <button
        className="header-button"
        type="button"
        onClick={() => {
          dispatch(logOut())
        }}
      >
        log out
      </button>
    </>
  )
}
export default UserMenu
