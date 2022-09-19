import './App.css'
import { useEffect } from 'react'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { currentUser } from '../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header/Header'
import Loader from './Loader/Loader.jsx'
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'

const PhoneBook = lazy(() => import('../pages/PhoneBook/PhoneBook'))
const RegistrationForm = lazy(() => import('./Forms/RegistrationForm.jsx'))
const LogInForm = lazy(() => import('./Forms/LogInForm'))

const App = () => {
  const dispatch = useDispatch()
  const isFetchingCurrentUser = useSelector(
    (state) => state.auth.isFetchingCurrentUser,
  )

  useEffect(() => {
    dispatch(currentUser())
  }, [dispatch])

  return (
    !isFetchingCurrentUser && (
      <>
        <Header />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/registration"
              element={
                <PublicRoute>
                  <RegistrationForm />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LogInForm />
                </PublicRoute>
              }
            />

            <Route
              index
              path="/"
              element={
                <PrivateRoute>
                  <PhoneBook />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </>
    )
  )
}

export default App
