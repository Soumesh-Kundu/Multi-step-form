<template>
    <div class="w-full" >
        <h2 class="text-2xl ">Data inserted by: <span class="text-primary-500">{{ data[nameField] }}</span> </h2>
        <div class="mt-10">
            Data inputs:
             <ul class="flex flex-col flex-wrap gap-2 mt-3 max-h-72">
                <li v-for="(item,prop) in questionSteps">
                {{ item.field }} : <span class="font-semibold" v-if="item.type==='file'">{{ data[item.field].map(item=>item.name).join(', ') }}</span>
                <span class="font-semibold" v-else>{{ Array.isArray(data[item.field])?data[item.field].join(', '):data[item.field] }}</span>
                </li>
             </ul>
        </div> 
    </div>
</template>

<script setup>
const {questionSteps,nameField}=defineProps(['nameField','questionSteps'])
const data=useState('inputs')

</script>

<style lang="scss" scoped>

</style>