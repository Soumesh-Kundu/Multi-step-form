<template>
    <div class="flex items-center gap-8">
        <div v-for="(item,index) in options" class="flex flex-col overflow-hidden overflow-x-auto font-medium text-gray-500 duration-200 border-2 border-gray-300 rounded-md cursor-pointer" :style="`width:${options.length<=3?16:16-0.25*options.length}rem`" @click="setCard(item.name)" :class="{'bg-white border-primary-500 text-primary-500':checkIsThere(item.name)}">
            <img :src="item.image" :alt="`Card Image ${index+1}`" class="w-full aspect-[8/9] ">
            <div class="grid w-full py-6 place-items-center">
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