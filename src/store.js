import { writable } from "svelte/store";

function createStore() {
  const { subscribe, set, update } = writable({
    products: [],
    originalProducts: [],
    loading: false,
    error: false,
    sorting: "default",
    searchTerm: "",
    filterItem: "All categories"
  });

  return {
    subscribe,

    setFilterItem: (item) => update(state => {
      return { ...state, filterItem: item };
    }),

    setSorting: (item) => update(state => {
      return { ...state, sorting: item };
    }),

    setSearchTerm: (item) => update(state => {
      return { ...state, searchTerm: item };
    }),

    sortProducts: () => update(state => {
      if (state.sorting !== "default") {
        state.products = state.products.sort((a, b) =>
          state.sorting === "low" ? a.price - b.price : b.price - a.price
        );
      } else {
        state.products = JSON.parse(JSON.stringify(state.originalProducts));
      }
      return { ...state };
    }),

    searchProducts: () => update(state => {
      if (state.searchTerm.trim() !== "") {
        const filteredProducts = state.originalProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
        state.products = JSON.parse(JSON.stringify(filteredProducts));
      }
      return { ...state };
    }),

    fetchProducts: async () => {
      update(state => ({ ...state, loading: true }));

      try {
        const state = await new Promise((resolve, reject) => {
          update(state => {
            resolve(state);
            return state;
          });
        });

        const response = await fetch(
          state.filterItem !== "All categories" 
            ? `https://fakestoreapi.com/products/category/${state.filterItem}`
            : `https://fakestoreapi.com/products`
        );

        if (!response.ok) {
          throw new Error(
            "Data fetching failed, please check your network connection"
          );
        }

        const data = await response.json();

        update(state => {
          state.products = data;
          state.originalProducts = JSON.parse(JSON.stringify(data));
          state.loading = false;
          return { ...state };
        });

        // Call sorting and search after fetch
        update(state => {
          if (state.sorting !== "default") {
          state.products = state.products.sort((a, b) =>
            state.sorting === "low" ? a.price - b.price : b.price - a.price
          );
        }
        else{
          const { originalProducts } = state;
          state.products= JSON.parse(JSON.stringify(originalProducts))
        }
          if (state.searchTerm.trim() !== "") {
            const filteredProducts = state.originalProducts.filter((product) =>
              product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
            state.products = JSON.parse(JSON.stringify(filteredProducts));
          }

          return { ...state };
        });

      } catch (error) {
        update(state => ({ ...state, error, loading: false }));
      }
    }
  };
}

export const store = createStore();