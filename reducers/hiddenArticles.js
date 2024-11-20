import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
}

const hiddenArticlesSlice = createSlice({
    name: "hiddenArticles",
    initialState,
    reducers: {
		addHiddenArticle: (state, action) => {
			state.value.push(action.payload);
		},
		removeAllHiddenArticles: (state) => {
			state.value = [];
		},
	},
})

export const { addHiddenArticle, removeAllHiddenArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;