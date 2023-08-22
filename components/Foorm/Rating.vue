<template>
    <div class="flex items-center gap-5 my-12">
        <div v-for="(_,index) in max" :key="index+1" class="cursor-pointer">
            <component :is="(index+1)<=data[field]?solidStarIcon:StarIcon" :class="{'text-yellow-500':(index+1)<=data[field]}" class="w-10 h-10 text-gray-500" @click="onClick(index+1)"></component>
        </div>
    </div>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/24/outline';
import { StarIcon as solidStarIcon } from '@heroicons/vue/24/solid';
const {field, max}=defineProps(['field','max'])
const data=useState('inputs')
data.value[field]=0
function onClick(value){
    data.value[field]=value
}
</script>

<style  scoped>

</style>