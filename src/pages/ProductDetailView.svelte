<script>
  import ProductSkeleton from "../lib/components/ProductSkeleton.svelte";
  import ProductDetail from "../lib/components/ProductDetail.svelte";
  import {store} from '../store'
  import { fetchSingleProduct } from "../api";
    import { onMount } from "svelte";

  export let params;
  $: product = {};
  $: loading = false;
  $: error = null;
 

  onMount(async()=>{
    loading = true;
    console.log(params.id)
    let {response,error} = await fetchSingleProduct(params.id);
    product = response;
    loading = false;
    console.log(product)
  })

</script>



<div class="flex justify-center">
    {#if loading && !error}
      <ProductSkeleton /> 
      {:else}
      <ProductDetail product={product} />
    {/if} 
     
    
  </div>