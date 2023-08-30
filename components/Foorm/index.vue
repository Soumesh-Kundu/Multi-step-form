<template>
    <div class="flex flex-col items-center gap-3">
        <span class="font-semibold text-gray-500 ">Question {{ activeStep + 1 }}</span>
        <h1 class="max-w-xl text-2xl font-semibold text-center break-words lg:text-3xl 2xl:text-4xl text-primary-500">{{ question }}</h1>
        <div class="max-w-2xl text-center">
            {{ description }}
        </div>
        <div v-if="boolean" class="flex gap-3 my-2">
            <div @click="onYes" class="flex items-center gap-2 p-1">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded " :checked="check === 'yes'" disabled>
                <label for="">
                    Yes, {{ yesContent }}
                </label>
            </div>
            <div @click="onNo" class="flex items-center gap-2 p-1">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded "
                    :checked="check === 'no'" disabled>
                <label for="">
                    No, {{ noContent }}
                </label>
            </div>

        </div>
        <FoormText :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'text'" :field='field' :placeHolder="placeHolder" />
        <FoormEmail :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'email'" :field='field' :placeHolder="placeHolder" :onInput="onBlurEmail" :valid='email' />
        <FoormNumber :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'number'" :field='field' :placeHolder="placeHolder" :onInput="onBlurNumber" :valid="number" />
        <FoormCardIcon :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'iconCard'" :questionQueue="questionQueue" :skipOn="skipOn" :skipTo="skipTo" :field='field' :placeHolder="placeHolder" :options="options"
            :multiple="multiple ?? false" />
        <FoormCardImage :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'imageCard'" :field='field' :multiple="multiple ?? false" :placeHolder="placeHolder"
            :options="options" />
        <FoormDropdown :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }" 
        v-if="type === 'dropDown'"  :refering="refering" :field='field' :placeHolder="placeHolder" :options="options" :refer="refer" />
        <FoormRating :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'rating'" :field='field' :placeHolder="placeHolder" :max="max" />
        <FoormFile :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'file'" :field='field' :placeHolder="placeHolder" :multiple="multiple ?? false" />
        <FoormDate :class="{ 'pointer-events-none': boolean && (check === disabledWhen || check.length < 1) }"
            v-if="type === 'date'" :field='field' :placeHolder="format" />
        <div class="flex gap-2">
            <button type="button" :disabled="activeStep < 1"
                class="flex items-center px-3 py-2 text-white duration-300 bg-gray-700 gap-7 lg:gap-10 lg:px-4 lg:py-3"
                @click="setPreviosStep" :class="{ '!bg-gray-300': activeStep < 1 }">
                <ArrowLongLeftIcon class="w-5 h-5" />
                <span class="text-xs font-semibold">PREVIOS</span>
            </button>
            <button v-if="type === 'email'" type="button" :disabled="(!email.valid || data[field]?.length === 0)" @click="() => {
                if (!email.valid || data[field]?.length === 0 || data[field] === undefined) return
                setNextStep()
            }" class="flex items-center gap-12 px-3 py-2 text-white duration-300 bg-gray-300 lg:gap-16 lg:px-4 lg:py-3"
                :class="{ '!bg-primary-500': (email.valid && data[field]?.length > 0) }">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
            <button v-if="type === 'number'" type="button" :disabled="(!number.valid || data[field]?.length === 0)" @click="() => {
                if (!number.valid || data[field]?.length === 0 || data[field] === undefined) return
                setNextStep()
            }" class="flex items-center gap-12 px-3 py-2 text-white duration-300 bg-gray-300 lg:gap-16 lg:px-4 lg:py-3"
                :class="{ '!bg-primary-500': (number.valid && data[field]?.toString()?.length > 0) }">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
            <button v-if="!/number|email/.test(type)" type="button" :disabled="data[field]?.length === 0" @click="() => {
                if (data[field]?.length === 0 || data[field] === undefined) return
                setNextStep()
            }" class="flex items-center gap-12 px-3 py-2 text-white duration-300 bg-gray-300 lg:gap-16 lg:px-4 lg:py-3"
                :class="{ '!bg-primary-500': data[field]?.toString().length > 0 }">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
        </div>
        <div v-if="/iconCard|imageCard/.test(type)" class="flex mt-1 overflow-auto text-sm ">
            <div v-for="(value, key) in  details" :class="{'!w-96':Object.values(details).length<3}" :key="key" class="py-1 px-1.5 border-2 border-gray-600 w-[25%]">
                <div class="py-1 mb-3 font-semibold text-center border-b-2 border-b-gray-600">{{ key }}</div>
                <div v-html="value" class="flex "></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'
const { setNextStep, question, type, field, placeHolder, options, setPreviosStep, multiple, max, format, validation, boolean, disabledWhen, skipOn, skipTo, questionQueue, refer, yesContent, noContent, details,booleanOption, description,refering } = defineProps(['question', 'type', 'options', 'placeHolder', 'field', 'setNextStep', 'setPreviosStep', 'multiple', 'max', 'format', 'validation', 'boolean', 'disabledWhen', 'skipOn', 'skipTo', 'questionQueue', 'refer', 'yesContent', 'noContent', 'details','booleanOption','description','refering'])

const activeStep = useState('activeStep')
const data = useState('inputs')
const totalQuestions = useState('totalQuestions')
if (multiple) {
    data.value[field] = []
}
else {
    data.value[field] = ""
}
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
const check = ref("")
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
function onYes() {
    check.value = 'yes'
    if (disabledWhen === 'yes') {
        data.value[field] = 'yes'
    }
    else {
        if (multiple) return data.value[field] = []
        data.value[field] = ''
    }
    if (skipOn === 'yes') {
        questionQueue.next = skipTo === "end" ? totalQuestions.value : skipTo
    }
    else {
        questionQueue.next = questionQueue.curr + 1
    }
}
function onNo() {
    check.value = 'no'
    if (disabledWhen === 'no') {
        data.value[field] = 'no'
    }
    else {
        if (multiple) return data.value[field] = []
        data.value[field] = ''
    }
    if (skipOn === 'no') {
        questionQueue.next = skipTo === "end" ? totalQuestions.value : skipTo
    }
    else {
        questionQueue.next = questionQueue.curr + 1
    }
}
</script>
