import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UsersMeSuccessType } from '../../types/userMe.interface'

type UserState = {
	user: UsersMeSuccessType | null
}

const initialState: UserState = {
	user: JSON.parse(localStorage.getItem('user-stat') as string),
}

export const userMeSlice = createSlice({
	name: 'userMe',
	initialState,
	reducers: {
		updateUserMe: (state, action: PayloadAction<UsersMeSuccessType>) => {
			state.user = { ...action.payload }
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logout: state => {
			state.user = null
			localStorage.removeItem('user')
		},
	},
})

export const { updateUserMe, logout } = userMeSlice.actions

export default userMeSlice.reducer
