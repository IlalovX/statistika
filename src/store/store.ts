import { configureStore } from '@reduxjs/toolkit'
import ProjectsReducer from '../features/slices/Projects'
import UserMeReducer from '../features/slices/UserMeSlices'

export const store = configureStore({
	reducer: {
		user_me: UserMeReducer,
		projects: ProjectsReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
