import { createReducer, createSlice } from '@reduxjs/toolkit'
import { changeFilter } from '../Redux/actions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { registration, logIn, logOut, currentUser } from '../Redux/actions'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => `contacts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Contacts', id })),
              { type: 'Contacts', id: 'LIST' },
            ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContact: builder.mutation({
      query: (data) => {
        return {
          url: '/contacts',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContact: builder.mutation({
      query: (id) => {
        return {
          url: `/contacts/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
    }),
    editContact: builder.mutation({
      query: ({ id, name, number }) => {
        return {
          url: `contacts/${id}`,
          method: 'PATCH',
          body: { name, number },
        }
      },
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsApi

export const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
})

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registration.fulfilled](state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    },

    [logOut.fulfilled](state) {
      state.user = {
        name: null,
        email: null,
      }
      state.token = null
      state.isLoggedIn = false
    },
    [currentUser.pending](state) {
      state.isFetchingCurrentUser = true
    },
    [currentUser.fulfilled](state, action) {
      state.user = action.payload
      state.isLoggedIn = true
      state.isFetchingCurrentUser = false
    },
    [currentUser.rejected](state, action) {
      state.isFetchingCurrentUser = false
      state.isLoggedIn = false
    },
  },
})
