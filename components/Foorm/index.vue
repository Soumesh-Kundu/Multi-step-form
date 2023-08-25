<template>
    <div class="flex flex-col items-center gap-5">
        <span class="font-semibold text-gray-500 ">Question {{ activeStep + 1 }}</span>
        <h1 class="text-3xl font-semibold text-primary-500">{{ question }}</h1>
        <FoormText v-if="type === 'text'" :field='field' :placeHolder="placeHolder" />
        <FoormEmail v-if="type === 'email'" :field='field' :placeHolder="placeHolder" :onInput="onBlurEmail"
            :valid='email' />
        <FoormNumber v-if="type === 'number'" :field='field' :placeHolder="placeHolder" :onInput="onBlurNumber"
            :valid="number" />
        <FoormCardIcon v-if="type === 'iconCard'" :field='field' :placeHolder="placeHolder" :options="options"
            :multiple="multiple ?? false" />
        <FoormCardImage v-if="type === 'imageCard'" :field='field' :multiple="multiple ?? false" :placeHolder="placeHolder"
            :options="options" />
        <FoormDropdown v-if="type === 'dropDown'" :field='field' :placeHolder="placeHolder" :options="options" />
        <FoormRating v-if="type === 'rating'" :field='field' :placeHolder="placeHolder" :max="max" />
        <FoormFile v-if="type === 'file'" :field='field' :placeHolder="placeHolder" :multiple="multiple ?? false" />
        <FoormDate v-if="type === 'date'" :field='field' :placeHolder="format" />
        <div class="flex gap-2">
            <button type="button" :disabled="activeStep < 1"
                class="flex items-center gap-10 px-4 py-3 text-white bg-gray-700" @click="setPreviosStep"
                :class="{ '!bg-gray-300': activeStep < 1 }">
                <ArrowLongLeftIcon class="w-5 h-5" />
                <span class="text-xs font-semibold">PREVIOS</span>
            </button>
            <button v-if="type === 'email'" type="button"
                :disabled="(!email.valid || data[field]?.length === 0)" @click="() => {
                    if (!email.valid || data[field]?.length === 0 || data[field] === undefined) return
                    setNextStep(nextStepId)
                }" class="flex items-center gap-16 px-4 py-3 text-white duration-300 bg-gray-300"
                :class="{ '!bg-primary-500': (email.valid && data[field]?.length > 0) }">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
            <button v-if="type === 'number'" type="button" :disabled="(!number.valid || data[field]?.length === 0)" @click="() => {
                if (!number.valid || data[field]?.length === 0 || data[field] === undefined) return
                setNextStep(nextStepId)
            }" class="flex items-center gap-16 px-4 py-3 text-white duration-300 bg-gray-300"
                :class="{ '!bg-primary-500': (number.valid && data[field]?.toString()?.length > 0) }">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
            <button v-if="!/number|email/.test(type)" type="button" :disabled="data[field]?.length === 0" @click="() => {
                if (data[field]?.length === 0 || data[field] === undefined) return
                setNextStep(nextStepId)
            }" class="flex items-center gap-16 px-4 py-3 text-white duration-300 bg-gray-300"
                :class="{ '!bg-primary-500': data[field]?.toString().length > 0 }">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'
const { setNextStep, question, type, field, placeHolder, options, setPreviosStep, nextStepId, multiple, max, format, validation } = defineProps(['question', 'type', 'options', 'placeHolder', 'field', 'setNextStep', 'setPreviosStep', 'nextStepId', 'multiple', 'max', 'format', 'validation'])


const activeStep = useState('activeStep')
const data = useState('inputs')
const number = ref({ valid: true })
const email = ref({ valid: true })
function onBlurNumber(e) {
    const numberRegex = validation
    if (!e.target.value.length) {
        number.value.valid = true
        return
    }
    if (!numberRegex.test(e.target.value)) {
        number.value.valid = false
        return
    }
    number.value.valid = true
    console.log(data.value[field])
    return
}
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
