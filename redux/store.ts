import { configureStore } from "@reduxjs/toolkit";

export function makeStore(preloadedState = {}) {
  return configureStore({
    reducer: {
     // define reducers
    },
    preloadedState
  });
}

// Get and Merge preloaded states
const preloadedState = {
  // define preloaded state
};

// Default store (for non-hydrated usage)
const store = makeStore(preloadedState);
export default store;

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;