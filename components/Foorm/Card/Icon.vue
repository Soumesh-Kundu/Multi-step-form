<template>
    <div  class="flex flex-wrap items-center gap-8">
        <div v-for="(item, index) in options" :key="index"
            class="relative flex flex-col items-center max-w-xs gap-3 py-5 my-3 font-medium text-gray-400 duration-200 border-2 border-gray-300 rounded-md cursor-pointer px-7 lg:px-10 lg:py-8 md:hover:scale-105"
            @click="setCard(item.name)"
            :class="{ 'bg-white !text-primary-500 !border-primary-500 !scale-110': checkIsThere(item.name) }">
            <CheckCircleIcon class="absolute invisible w-5 h-5 top-2 right-2"
                :class="{ '!visible': checkIsThere(item.name) }" />
            <component :is="item.icon" class="w-10 h-10 lg:w-16 lg:h-16"></component>
            <h5>{{ item.name }}</h5>
        </div>
    </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
const { options, field, multiple,questionQueue, skipOn,skipTo } = defineProps(['options', 'field', 'multiple','questionQueue','skipOn','skipTo'])
const data = useState('inputs')
const totalQuestions=useState('totalQuestions')
if (multiple) {
    data.value[field] = []
}
function setCard(name) {
    if (multiple) {
        if (data.value[field].includes(name)) {
            data.value[field] = data.value[field].filter(item => item !== name)
            return
        }
        data.value[field].push(name)
        return
    }
    data.value[field] = name
    if(skipOn!==undefined){
        if(data.value[field].toLowerCase()===skipOn){
            questionQueue.next=skipTo === "end" ? totalQuestions.value : skipTo
        }
        else{
            questionQueue.next=questionQueue.curr+1
        }
        const keys=Object.keys(data.value)
        const fieldIndex=keys.findIndex(item=>item===field)
        for(let i=(fieldIndex+1); i<keys.length; i++){
            const key=keys[i]
            if(Array.isArray(data.value[key])){
                data.value[key]=[]
            }
            else{
                data.value[key]=""
            }
        }
    }
}
function checkIsThere(name) {
    if (multiple) {
        return data.value[field].includes(name)
    }
    return name === data.value[field]
}
</script>

<style lang="scss" scoped></style>