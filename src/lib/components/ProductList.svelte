<script>

    import CardSkeleton from './CardSkeleton.svelte'
    import ProductCard from './ProductCard.svelte';
    import {store} from '../../store';
    import { onMount } from 'svelte';
    

   onMount(async () => {
    store.fetchProducts();
    
});

    const message = "Data fetching failed, please check your network connection1";
</script>


{#if ($store.loading && !$store.error)}

<div class="grid justify-center">
    <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      {#each new Array(20).fill(null) as item }

      <CardSkeleton  />

      {/each}
    </div>
  </div>

{/if}

{#if ($store.error)}

<div class="grid justify-center">
    <div class="mt-28 text-red-500 text-xl font-bold">{message}</div>;
</div>
{/if}


<div class="grid justify-center">
  <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
  
     {#each $store.products as product (product.id)}
         <ProductCard  product= {product} />
      {/each}
    </div>
  </div>