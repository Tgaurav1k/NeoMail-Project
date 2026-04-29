import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        user: null,
        emails: [],
        selectedEmail: null,
        searchText:"",
        sidebarOpen: false,
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
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        // update a single email and re-sort (pinned first, then newest)
        upsertEmail: (state, action) => {
            const updated = action.payload;
            const idx = state.emails.findIndex(e => e._id === updated._id);
            if (idx !== -1) state.emails[idx] = updated;
            else state.emails.unshift(updated);
            state.emails.sort((a, b) => {
                if ((b.isPinned ? 1 : 0) !== (a.isPinned ? 1 : 0)) {
                    return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
    }
});
export const { setOpen, setAuthUser, setEmails, setSelectedEmail, setSearchText, upsertEmail, toggleSidebar, setSidebarOpen } = appSlice.actions;
export default appSlice.reducer;