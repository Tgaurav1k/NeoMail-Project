import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        user: null,
        emails: [],
        selectedEmail: null,
        searchText:"",
    },
    reducers: {
        // actions
        // open
        setOpen: (state, action) => {
            state.open = action.payload
        },
        // check uer is authur
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        // select email
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        // select specific email
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        // search text
        setSearchText:(state,action) => {
            state.searchText = action.payload;
        }
    }
});
export const { setOpen, setAuthUser, setEmails, setSelectedEmail, setSearchText } = appSlice.actions;
export default appSlice.reducer;