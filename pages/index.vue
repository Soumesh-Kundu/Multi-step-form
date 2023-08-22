<template>
    <main class="flex flex-col h-full overflow-hidden">
        <nav class="w-full my-5" v-if="activeStep < (questionsSteps.length)">
            <ol class="flex items-center justify-between w-full text-sm font-medium text-center text-gray-500 sm:text-base">
                <template v-for="(item, index) in steppers">
                    <li class="flex items-center " :class="{ 'text-primary-500': completedStage > index }">
                        <span class="flex items-center ">
                            <CheckCircleIcon v-if="completedStage > index" class="w-5 h-5 mr-1" />
                            <span v-else class="mr-2">{{ index + 1 }}</span>
                            {{ item }}
                        </span>
                    </li>
                    <li v-if="index < (steppers.length - 1)" class="inline-block h-[2px] bg-gray-300 "
                        :style="`width:${(100 / steppers.length) - (steppers.length * 1.5)}%`">

                    </li>
                </template>
            </ol>
        </nav>
        <div class="flex flex-row overflow-hidden duration-500 grow"
            :style="`transform: translateX(-${activeStep * 100 / questionsSteps.length}%); width: ${questionsSteps.length * 100}%`"
            v-if="activeStep < (questionsSteps.length)">
            <div class="relative grid content-start duration-200 place-items-center" v-for="(item, index) in questionsSteps"
                :key="item.field" :style="`width:${100 / questionsSteps.length}%`">
                <Foorm :class="{ 'my-[5%]': item.type !== 'iconImage' }" :nextStepId="questionsSteps[index + 1]?.stageId"
                    :setNextStep="setNextStep" v-bind="item" :setPreviosStep="setPreviosStep" />
            </div>
        </div>
        <div v-if="questionsSteps.length > 0 && activeStep >= questionsSteps?.length"
            class="flex items-center justify-center grow">
            <div class="grid grid-cols-2 gap-14">
                <Final :data="inputs" nameField="name" />
            </div>
        </div>
        <div class="flex invisible gap-8 py-3 text-sm font-semibold" :class="{ '!visible': activeStep > 0 }">
            <div v-if="activeStep >= questionsSteps.length" class="flex items-center gap-2">
                <button @click="clear" type="button" class="p-1 bg-white rounded-sm">
                    Enter
                </button>
                Back to Main
            </div>
        </div>
    </main>
</template>

<script setup>
import { UserIcon, UserGroupIcon, BriefcaseIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import image1 from '~/public/images/1.jpg'
const activeStep = useState('activeStep', () => 0)
const inputs = useState('inputs', () => ({}))
const totalQuestions = useState('totalQuestions')
const steppers = ref([
    'Personal',
    'Images',
    'Icons',
    'Review',
    'Country',
    // 'Complete'
])
const completedStage = ref(0)
const currentStepId = ref(1)
const questionsSteps = ref([
    {
        question: 'What is your name',
        type: "text",
        placeHolder: 'Your name',
        field: 'name',
        stageId:1,
        options: []
    },
    {
        question: 'Choose a Field',
        type: "iconImage",
        placeHolder: 'Your name',
        field: 'Select 1',
        multiple: false,
        stageId:2,
        options: [
            {
                image: 'https://images.unsplash.com/photo-1609393919580-6410fe845398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8anIxWGRvWFBuWWN8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                name: "Field 1"
            },
            {
                image: "https://images.unsplash.com/photo-1683650006376-4a0f184e9ee4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                name: "Field 2"
            },
            {
                image: "https://cdn.fstoppers.com/styles/full/s3/photos/2019/02/857ebd7658e56c84a4dc65cc4453a305.jpg?itok=rpCL6_UU",
                name: "Field 3"
            },
            {
                image: image1,
                name: "Field 4"
            },
        ]
    },
    {
        question: 'Choose a Field',
        type: "iconCard",
        placeHolder: 'Your name',
        field: 'Select',
        multiple:true,
        stageId:3,
        options: [
            {
                icon:UserIcon,
                name:"Field 1"
            },
            {
                icon:UserGroupIcon,
                name:"Field 2"
            },
            {
                icon:BriefcaseIcon,
                name:"Field 3"
            },
        ]
    },
    {
        question: 'Give us a Rating',
        type: "rating",
        placeHolder: '',
        field: 'review',
        stageId:4,
        max: 5
    },
    {
        question: 'Choose a Country',
        type: "dropDown",
        placeHolder: 'Your Country',
        field: 'country',
        stageId:5,
        options:[
            'India',"America","Japan","Germeny","England","United Kindom","France","Brazil"
        ]
    },
    // {
    //     question: 'What is your email',
    //     type: "email",
    //     placeHolder: 'Your email',
    //     field: 'email',
    //     stageId:2,
    //     options: []
    // },
    // {
    //     question: 'What is your address',
    //     type: "text",
    //     placeHolder: 'Your address',
    //     field: 'address',
    //     stageId:3,
    //     options: []
    // },
    // {
    //     question: 'What is your phone',
    //     type: "number",
    //     placeHolder: 'Your phone',
    //     field: 'phone',
    //     stageId:4,
    //     options: []
    // },
    // {
    //     question: 'What is your Father',
    //     type: "text",
    //     placeHolder: 'Your father name',
    //     field: 'father',
    //     stageId:5,
    //     options: []
    // },
])
totalQuestions.value = questionsSteps.value.length

function setNextStep(stepperId) {
    if (currentStepId.value < stepperId) {
        completedStage.value++
        currentStepId.value = stepperId
    }
    activeStep.value++
    return
}
function setPreviosStep() {
    activeStep.value--
}
function clear() {
    activeStep.value = 0
    completedStage.value = 0
    inputs.value = {}
}
const tags = useState('tags', () => [])
tags.value = ["Nature", "Wild Life", 'Math', "Science", "Computer", "Space", 'Sports', 'Football']
</script>

<style lang="scss" scoped></style>