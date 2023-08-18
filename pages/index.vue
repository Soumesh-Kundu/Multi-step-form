<template>
    <main class="flex flex-col h-full overflow-hidden">
        <div class="flex flex-row items-center overflow-hidden duration-500 grow"
            :style="`transform: translateX(-${activeStep * 100 / questionsSteps.length}%); width: ${questionsSteps.length * 100}%`"
            v-if="activeStep < (questionsSteps.length)">
            <div class="relative grid grid-cols-3 duration-200 place-items-center" v-for="(item, index) in questionsSteps"
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
                    :class="{ 'invisible': (index === 0 && completedStage===0) }">
                    <ArrowLongLeftIcon class="w-5 h-5 " />
                    <span class="text-xs font-semibold">PREVIOUS</span>
                </button>
                <Card :setNextStep="setNextStep" v-bind="item" />
                <button type="button" @click="() => {
                    setNextStep()
                }" class="flex items-center gap-16 px-4 py-3 text-white bg-primary-500 " :class="{ 'invisible': (index === questionsSteps.length && completedStage===5) }">
                    <span v-if="(index === (questionsSteps.length-1) && completedStage===5)" class="text-xs font-semibold" >COMPLETE</span>
                    <span v-else class="text-xs font-semibold" >NEXT</span>
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
        question: "Monaco is the smallest country in the world",
        answer: "False",
        tier: "Easy",
        image:"https://images.unsplash.com/photo-1546448935-9d0f92876a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80",
        ParentTag: "Manchester City",
        tags: ['Ronaldi']
    },
    {
        question: "The atomic number for lithium is 17",
        answer: "False",
        tier: "Easy",
        image:"https://imgk.timesnownews.com/story/Lithium_mining_iStock_1200.jpg?tr=w-600,h-450,fo-auto",
        ParentTag: "Manchester City",
        tags: ['Biases matuidi']
    },
    {
        question: "Fish cannot blink",
        answer: "True",
        tier: "Medium",
        image:"https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmV0dGElMjBmaXNofGVufDB8fDB8fHww&w=1000&q=80",
        ParentTag: "Manchester City",
        tags: ['Science']
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
tags.value = ["Nature", "Wild Life", 'Math', "Science", "Computer", "Space", "Star"]
</script>

<style lang="scss" scoped></style>