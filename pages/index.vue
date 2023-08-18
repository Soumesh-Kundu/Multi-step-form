<template>
    <main class="flex flex-col h-full overflow-hidden">
        <div class="flex flex-row overflow-hidden duration-500 grow"
            :style="`transform: translateX(-${activeStep * 100 / questionsSteps.length}%); width: ${questionsSteps.length * 100}%`"
            v-if="activeStep < (questionsSteps.length)">
            <div class="relative grid grid-cols-3 duration-200 place-items-center " v-for="(item, index) in questionsSteps"
                :key="item.ParentTag" :style="`width:${100 / questionsSteps.length}%`">
                <nav class="w-full col-span-3 mx-5 my-3">
                    <ol
                        class="flex items-center justify-between w-full text-sm font-medium text-center text-gray-500 sm:text-base">
                        <li class="flex items-center " :class="{ 'text-primary-500': completedStage > 0 }">
                            <span class="flex items-center ">
                                <CheckCircleIcon v-if="completedStage > 0" class="w-5 h-5 mr-1" />
                                <span v-else class="mr-2">1</span>
                                Creation
                            </span>
                        </li>
                        <li class="inline-block h-[2px] bg-gray-300 w-[10%] ">

                        </li>
                        <li class="flex items-center " :class="{ 'text-primary-500': completedStage > 1 }">
                            <span class="flex items-center gap-2">
                                <CheckCircleIcon v-if="completedStage > 1" class="w-5 h-5 mr-1" />
                                <span v-else class="mr-2">2</span>
                                Fact Checking
                            </span>
                        </li>
                        <li class="inline-block h-[2px] bg-gray-300 w-[10%] ">
                        </li>
                        <li class="flex items-center gap-2" :class="{ 'text-primary-500': completedStage > 2 }">
                            <CheckCircleIcon v-if="completedStage > 2" class="w-5 h-5 mr-1" />
                            <span v-else class="mr-2">3</span>
                            Grammer Checking
                        </li>
                        <li class="inline-block h-[2px] bg-gray-300 w-[10%] ">

                        </li>
                        <li class="flex items-center gap-2" :class="{ 'text-primary-500': completedStage > 3 }">
                            <CheckCircleIcon v-if="completedStage > 3" class="w-5 h-5 mr-1" />
                            <span v-else class="mr-2">4</span>
                            Tagging
                        </li>
                        <li class="inline-block h-[2px] bg-gray-300 w-[10%] ">

                        </li>
                        <li class="flex items-center gap-2" :class="{ 'text-primary-500': completedStage > 4 }">
                            <CheckCircleIcon v-if="completedStage > 4" class="w-5 h-5 mr-1" />
                            <span v-else class="mr-2">5</span>
                            Complete
                        </li>
                    </ol>
                </nav>
                <button type="button" @click="() => {
                    setPreviosStep()
                }" class="flex items-center gap-10 px-4 py-3 text-white bg-primary-500 "
                    :class="{ 'invisible': (index === 0 && completedStage === 0) }">
                    <ArrowLongLeftIcon class="w-5 h-5 " />
                    <span class="text-xs font-semibold">PREVIOUS</span>
                </button>
                <Card :setNextStep="setNextStep" v-bind="item" />
                <button type="button" @click="() => {
                    setNextStep()
                }" class="flex items-center gap-16 px-4 py-3 text-white bg-primary-500 "
                    :class="{ 'invisible': (index === questionsSteps.length && completedStage === 5) }">
                    <span v-if="(index === (questionsSteps.length - 1) && completedStage === 5)"
                        class="text-xs font-semibold">COMPLETE</span>
                    <span v-else class="text-xs font-semibold">NEXT</span>
                    <ArrowLongRightIcon class="w-5 h-5 " />
                </button>
            </div>
        </div>
        <div v-else class="flex items-center justify-center grow">
            <div class="grid grid-cols-2 gap-14">
                <Final :data="inputs" :setNextStep="setNextStep" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
const activeStep = useState('activeStep', () => 0)
const inputs = useState('inputs', () => ({}))
const totalQuestions = useState('totalQuestions', () => 0)
// const questionsSteps=[
//     {
//         question:'What is your name',
//         type:"text",
//         placeHolder:'Your name',
//         field:'name',
//         options:[]
//     },
//     {
//         question:'What is your email',
//         type:"email",
//         placeHolder:'Your email',
//         field:'email',
//         options:[]
//     },
//     {
//         question:'What is your address',
//         type:"text",
//         placeHolder:'Your address',
//         field:'address',
//         options:[]
//     },
//     {
//         question:'What is your phone',
//         type:"number",
//         placeHolder:'Your phone',
//         field:'phone',
//         options:[]
//     },
//     {
//         question:'What is your Father',
//         type:"text",
//         placeHolder:'Your father name',
//         field:'father',
//         options:[]
//     },
//     {
//         question:'What is your Mother',
//         type:"text",
//         placeHolder:'your mother name',
//         field:'mother',
//         options:[]
//     },
// ]

const completedStage = ref(0)
const questionsSteps = [
    {
        question: `"We will always win" is written on the Man. City slogan`,
        answer: "False",
        tier: "Easy",
        image: "https://www.mykhel.com/img/2023/08/manchester-city-uefa-super-cup-600-1692221307.jpg",
        ParentTag: "Manchester City",
        tags: ['Ronaldi']
    },
    {
        question: `"Benny the bull" is one of the Man. City mascots`,
        answer: "False",
        tier: "Easy",
        image: "https://media.nbcchicago.com/2019/09/benny-the-bullGettyImages-485096049.jpg?quality=85&strip=all&resize=1200%2C675",
        ParentTag: "Manchester City",
        tags: ['Biases matuidi']
    },
    {
        question: `"Blue moon" was a chant of the Man. City fans`,
        answer: "True",
        tier: "Medium",
        image: "data:image/jpeg;base64,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",
        ParentTag: "Manchester City",
        tags: []
    }
]
totalQuestions.value = questionsSteps.length

function setNextStep() {
    if (completedStage.value === 5) {
        activeStep.value++
        completedStage.value = 0
        return
    }
    completedStage.value++
}
function setPreviosStep() {
    if (activeStep.value === 0 && completedStage.value === 0) {
        return
    }
    if (completedStage.value === 0) {
        activeStep.value--
        completedStage.value = 5
    }
    completedStage.value--
}
const tags = useState('tags', () => [])
tags.value = ["Nature", "Wild Life", 'Math', "Science", "Computer", "Space", 'Sports', 'Football']
</script>

<style lang="scss" scoped></style>