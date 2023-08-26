<template>
    <main class="flex flex-col h-full overflow-hidden">
        <nav class="w-full my-5">
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
            :style="`transform: translateX(-${activeStep * 100 / (questionsSteps.length + 1)}%); width: ${(questionsSteps.length + 1) * 100}%`">
            <div class="relative grid duration-200 place-items-center" v-for="(item, index) in questionsSteps"
                :key="item.field" :style="`width:${100 / (questionsSteps.length + 1)}%`">
                <Foorm :class="{ '-translate-y-[40%] 2xl:translate-y-0': /date/.test(item.type) }" class=""
                    :nextStepId="questionsSteps[index + 1]?.stageId" :setNextStep="setNextStep" v-bind="item"
                    :setPreviosStep="setPreviosStep" />
            </div>
            <div class="flex items-center justify-center grow" :style="`width:${100 / (questionsSteps.length + 1)}%`">
                <div class="grid w-full grid-cols-3 place-items-center">
                    <button type="button" :disabled="activeStep < 1"
                        class="flex items-center gap-10 px-4 py-3 text-white bg-gray-700 " @click="setPreviosStep"
                        :class="{ '!bg-gray-300': activeStep < 1 }">
                        <ArrowLongLeftIcon class="w-5 h-5" />
                        <span class="text-xs font-semibold">PREVIOS</span>
                    </button>
                    <Final :questionSteps="questionsSteps" nameField="name" class=" grow" />
                    <button id="but" type="button" @click="onSubmit"
                        class="flex items-center gap-16 px-4 py-3 text-white duration-300 bg-primary-500">
                        <span class="text-xs font-semibold">SUBMIT</span>
                        <ArrowLongRightIcon class="w-5 h-5 " />
                    </button>
                </div>
            </div>
        </div>
        <div ref="ModalRef" id="popup-modal" tabindex="-1"
            class="fixed top-0 left-0 right-0 z-[100] hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-sm max-h-full">
                <div class="relative bg-white rounded-lg shadow ">
                    <div class="flex flex-col gap-5 text-center p-14">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-primary-500 "
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                        <span class="text-lg font-medium">
                            Please Wait...
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { UserIcon, UserGroupIcon, BriefcaseIcon, ArrowLongLeftIcon, ArrowLongRightIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { Modal } from 'flowbite';
const activeStep = useState('activeStep', () => 0)
const inputs = useState('inputs', () => ({}))
const totalQuestions = useState('totalQuestions')

// steppers List : add steppers name here to see in the stepper bar 
const steppers = ref([
    'Personal',
    'Cards',
    'Review',
    'Country',
    'Others'
])

const modal=ref(null)
const ModalRef = ref(null)
const completedStage = ref(0)
const currentStepId = ref(1)

//Question List: (most important) add question as a object in the particuler sturtured as written in the documentation

//types: text | number | email | imageCard | iconCard | rating | date | dropDown | file
const questionsSteps = ref([
    {
        question: 'What is your name',
        type: "text",
        placeHolder: 'Your name',
        field: 'name',
        stageId: 1,
        options: []
    },
    {
        question: 'What is your email',
        type: "email",
        placeHolder: 'Your email',
        field: 'email',
        stageId: 1,
        options: []
    },
    {
        question: 'Choose a Field',
        type: "imageCard",
        placeHolder: 'Your name',
        field: 'Select 1',
        multiple: false,
        stageId: 2,
        options: [
            {
                image: 'https://images.unsplash.com/photo-1609393919580-6410fe845398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8anIxWGRvWFBuWWN8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                name: "Ice Water"
            },
            {
                image: "https://images.unsplash.com/photo-1683650006376-4a0f184e9ee4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                name: "Flooded Water"
            },
            {
                image: "https://cdn.fstoppers.com/styles/full/s3/photos/2019/02/857ebd7658e56c84a4dc65cc4453a305.jpg?itok=rpCL6_UU",
                name: "Forest"
            },
        ]
    },
    {
        question: 'Choose a Field',
        type: "iconCard",
        placeHolder: 'Your name',
        field: 'Select',
        multiple: true,
        stageId: 2,
        options: [
            {
                icon: UserIcon,
                name: "User"
            },
            {
                icon: UserGroupIcon,
                name: "Group"
            },
            {
                icon: BriefcaseIcon,
                name: "Work"
            },
        ]
    },
    {
        question: 'Give us a Rating',
        type: "rating",
        placeHolder: '',
        field: 'review',
        stageId: 4,
        max: 5
    },
    {
        question: 'What is your Country',
        type: "dropDown",
        placeHolder: 'Your Country',
        field: 'country',
        stageId:5,
        options: ['India', "Russia", "America", "France", "England", "United Kingdom", "Japan", "Spain", "Italy"]
    },
    {
        question: 'What is your phone',
        type: "number",
        placeHolder: 'Your phone',
        field: 'phone',
        validation:/^[6-9]\d{9}$/,
        stageId:6,
        options: []
    },
    {
        question: 'Choose a Date',
        type: "date",
        format: 'dd/mm/yyyy',
        stageId:6,
        field: 'date',
    },
    {
        question: 'Choose a File',
        type: "file",
        multiple: true,
        stageId:6,
        //placeHolder required for file input becasue it is using as the content of the file button
        placeHolder: 'Choose a file',
        field: 'files',
    },
])
totalQuestions.value = questionsSteps.value.length

function setNextStep(stepperId) {
    if (activeStep.value === (questionsSteps.value.length - 1)) {
        completedStage.value++
    }
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
async function onSubmit() {
    const formData = new FormData()
    modal.value.show()
    for (const [props, value] of Object.entries(inputs.value)) {
        if (Array.isArray(value) && value[0]?.name !== undefined) {
            console.log('hello')
            for (const file of value) {
                formData.append(props, file, file.name)
            }
            continue
        }
        console.log(props)
        console.log(value)
        formData.append(props, value)
    }
    const { data } = await useFetch('/api/send', {
        method: 'POST',
        body: formData,
        onResponse(){
            modal.value.hide()
            navigateTo('complete')
        }
    })
}

useHead({
    script: questionsSteps.value.find(item => item.type === 'date') && [{ src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/datepicker.min.js", async: true }],
})
onMounted(() => {
    const $targetEl = ModalRef.value
    const options = {
        placement: 'center-center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
    };
    modal.value=new Modal($targetEl,options)
})
</script>

<style lang="scss" scoped></style>