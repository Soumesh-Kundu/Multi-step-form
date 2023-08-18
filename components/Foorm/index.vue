<template>
     <div class="flex flex-col items-center gap-5" >
        <span class="font-semibold text-gray-500 ">Question {{ activeStep+1 }}</span>
        <h1 class="text-3xl font-semibold text-primary-500">{{ question }}</h1>
        <FoormText v-if="type==='text'" :field='field' :placeHolder="placeHolder" :options="options" />
        <FoormEmail v-if="type==='email'" :field='field' :placeHolder="placeHolder" :onInput="onBlurEmail" :valid='email' :options="options" />
        <FoormNumber v-if="type==='number'" :field='field' :placeHolder="placeHolder" :options="options" />
        <button v-if="type!=='email'" id="but" type="button" :disabled="data[field]?.length===0" @click="()=>{
            if(data[field]?.length===0 || data[field]===undefined)return
            setNextStep()}"
            class="flex items-center gap-16 px-4 py-3 text-white bg-gray-300"
            :class="{ '!bg-primary-500': data[field]?.toString().length > 0 }">
            <span class="text-xs font-semibold">NEXT</span>
            <ArrowLongRightIcon class="w-5 h-5 " />
        </button>
        <button v-else type="button" :disabled="(!email.valid || data[field]?.length === 0)" @click="()=>{
            if(!email.valid || data[field]?.length === 0 || data[field]===undefined) return
            setNextStep()}"
            class="flex items-center gap-16 px-4 py-3 text-white bg-gray-300"
            :class="{ '!bg-primary-500':(email.valid && data[field]?.length > 0) }">
            <span class="text-xs font-semibold">NEXT</span>
            <ArrowLongRightIcon class="w-5 h-5 " />
        </button>
    </div>
</template>

<script setup>
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline'
const { setNextStep,question,type,field,placeHolder,options } = defineProps(['question','type','options','placeHolder','field','setNextStep'])


const activeStep=useState('activeStep')
const data=useState('inputs')
const email = ref({valid:true})
watch(data.value['name'],()=>{
    console.log(data.value['name'])
})
function onBlurEmail(e) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!e.target.value.length) {
        email.value.valid = true
        return
    }
    if (!emailRegex.test(e.target.value)) {
        email.value.valid = false
        return
    }
    email.value.valid = true
    return
}

</script>
