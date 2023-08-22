<template>
    <div class="flex items-center gap-8">
        <div v-for="(item,index) in options" :key="index" class="relative flex flex-col items-center gap-3 px-10 py-8 my-5 font-medium text-gray-400 duration-200 border-2 border-gray-300 rounded-md cursor-pointer hover:scale-105" @click="setCard(item.name)" :class="{'bg-white !text-primary-500 !border-primary-500 !scale-110':checkIsThere(item.name)}">
            <CheckCircleIcon class="absolute invisible w-5 h-5 top-2 right-2" :class="{'!visible':checkIsThere(item.name)}" />
            <component :is="item.icon" class="w-16 h-16"></component>
            <h5>{{ item.name }}</h5>
        </div>
    </div>
</template>

<script setup>
import {CheckCircleIcon} from '@heroicons/vue/24/solid'
const {options,field,multiple}=defineProps(['options','field','multiple'])
const data=useState('inputs')
if(multiple){
    data.value[field]=[]
}
function setCard(name){
    if(multiple){
        if(data.value[field].includes(name)){
            data.value[field]=data.value[field].filter(item=>item!==name)
            return
        }
        data.value[field].push(name)
        return
    }
    data.value[field]=name
}
function checkIsThere(name){
    if(multiple){
        return data.value[field].includes(name)
    }
    return name===data.value[field]
}
</script>

<style lang="scss" scoped>

</style>