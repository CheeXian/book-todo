import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/task/bookSlice"
import userReducer from "./features/user/userSlice"

const store = configureStore({
    reducer: {
        book: bookReducer,
        user2: userReducer
    },
});

// store.subscribe(() => {
//     const state = store.getState();
//     localStorage.setItem('books', JSON.stringify(state.book.bookList));
// })

export { store };