import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

import authReducer from "../features/authSlice";

export default configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducerPath,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
