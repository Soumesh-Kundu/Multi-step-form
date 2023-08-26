<template>
    <div class="flex flex-wrap items-center gap-8 my-5">
        <div v-for="(item,index) in options" class="flex flex-col w-32 overflow-hidden overflow-x-auto font-medium text-gray-500 duration-300 border-2 border-gray-300 rounded-md cursor-pointer lg:w-40 md:hover:scale-105" @click="setCard(item.name)" :class="{'bg-white border-primary-500 text-primary-500 !scale-110':checkIsThere(item.name)}">
            <img :src="item.image" :alt="`Card Image ${index+1}`" class="w-full aspect-square">
            <div class="grid w-full py-4 text-sm lg:text-base place-items-center">
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
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