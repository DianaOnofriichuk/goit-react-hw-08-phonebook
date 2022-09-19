import './Header.css'
import { useSelector } from 'react-redux'
import UserMenu from '../../pages/UserMenu/UserMenu'
import AuthNav from '../../pages/AuthNav/AuthNav'

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return <div className="header">{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
}
export default Header
