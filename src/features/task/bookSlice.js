import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        bookList: JSON.parse(localStorage.getItem('books')) || [],
    },
    reducers: {
        addToList: (state, action) => {
            state.bookList.push(action.payload);
            localStorage.setItem('books', JSON.stringify(state.bookList));
        },
        updateBook: (state, action) => {
            const index = state.bookList.findIndex(
                (book) => book.id === action.payload.id
            );
            if (index !== -1) {
                state.bookList[index] = action.payload;
                localStorage.setItem('books', JSON.stringify(state.bookList));
            }
        },
        removeBook: (state, action) => {
            state.bookList = state.bookList.filter(
                (book) => book.id !== action.payload
            );
            localStorage.setItem('books', JSON.stringify(state.bookList));
        }
    },
});

export const { addToList, updateBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;