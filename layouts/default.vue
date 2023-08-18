<template>
    <Sidebar />
    <div class="h-[100dvh] px-4 bg-slate-100 sm:ml-64  relative ">
        <slot />
    </div>
</template>

<script setup>

</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

body {
    font-family: "Plus Jakarta Sans", sans-serif !important;
}
</style>