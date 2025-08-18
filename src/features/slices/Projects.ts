import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ProjectsState = {
	count: number
}

const initialState: ProjectsState = {
	count: 0,
}

export const userMeSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		updateProjectCount: (state, action: PayloadAction<number>) => {
			state.count = action.payload
		},
	},
})

export const { updateProjectCount } = userMeSlice.actions

export default userMeSlice.reducer
