
# Rick & Morty Character App

This is a React + TypeScript app that uses TanStack Router, TanStack React Query, and TanStack React Table to display and manage a paginated list of characters from the [Rick and Morty API](https://rickandmortyapi.com/documentation).

---

##  Features

✅ **Fetch data from API**
- The app fetches character data from the public Rick and Morty API (`https://rickandmortyapi.com/api/character`).

✅ **Paginated character list**
- Displays characters in a paginated table using TanStack React Table.
- Users can navigate between pages using Prev / Next buttons.

✅ **Search param driven**
- The current page number is stored in the URL query string (`?page=2`).
- This allows:
  - Sharing links to a specific page.
  - Preserving the current page on browser refresh.

✅ **Refresh button**
- A refresh button re-fetches data for the currently visible page using React Query’s `refetch`.

✅ **Character detail page**
- Clicking a row navigates to a detail route (`/character/:id`) and displays information about that character.

---

## Tech Stack

- **React + TypeScript**
- **TanStack Router**
- **TanStack React Query**
- **TanStack React Table**
- **Axios**


