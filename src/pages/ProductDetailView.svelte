<script>
  import ProductSkeleton from "../lib/components/ProductSkeleton.svelte";
  import ProductDetail from "../lib/components/ProductDetail.svelte";
  import {store} from '../store'

  store.fetchProducts();

</script>



<div class="flex justify-center">
    {#if $store.loading && !$store.error}
      <ProductSkeleton /> 
      {:else}<ProductDetail {...product} />
      {/if} 
     
    
  </div>