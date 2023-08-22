<template>
    <div >
        <h2 class="text-2xl ">Data inserted by: <span class="text-primary-500">{{ data[nameField] }}</span> </h2>
        <div class="mt-10">
            Data inputs:
             <ul class="flex flex-col gap-2 mt-3">
                <li v-for="(item,prop) in data">
                {{ prop }} : <span class="font-semibold">{{ item }}</span>
                </li>
             </ul>
        </div> 
    </div>
</template>

<script setup>
const {data,nameField}=defineProps(['data','nameField'])
</script>

<style lang="scss" scoped>

</style>