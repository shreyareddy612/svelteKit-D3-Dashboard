<script>
    let { children } = $props();
    import "../app.css";
    import Header from "$lib/components/header.svelte";
</script>


<svelte:head>
    <title>Interactive Multi Views</title>
    <meta name="description" content="Svelte + D3 Tutorial" />
</svelte:head>

<Header />

{@render children()}