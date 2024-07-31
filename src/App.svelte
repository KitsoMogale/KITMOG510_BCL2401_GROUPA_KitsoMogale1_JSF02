<script>
  import Header from "./lib/components/Header.svelte";
  import Router, {location, link} from 'svelte-spa-router';
  import Home from "./pages/Home.svelte";
    import Login from "./pages/Login.svelte";
    import ProductDetailView from "./pages/ProductDetailView.svelte";
</script>
<main>
  <Header/>
  <Router   routes={{
    '/': Home,
    '/login': Login,
    '/productDetailView/:id' : ProductDetailView
  }}/>

</main>
