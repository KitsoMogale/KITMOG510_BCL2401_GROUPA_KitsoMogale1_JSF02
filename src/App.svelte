<script>
  import Header from "./lib/components/Header.svelte";
  import Filter from "./lib/components/Filter.svelte";
  import Sort from "./lib/components/Sort.svelte";
  import ProductList from "./lib/components/ProductList.svelte";
</script>
<main>
  <Header/>
  <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start  mt-3 mx-auto justify-center">
    <Filter />
    <Sort />
  </div>
  <ProductList/>
</main>
