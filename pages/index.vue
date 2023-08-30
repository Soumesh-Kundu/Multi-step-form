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
                        :style="`width:${(100 / steppers.length) - (steppers.length * 2)}%`">

                    </li>
                </template>
            </ol>
        </nav>
        <div class="flex flex-row overflow-hidden duration-500 grow"
            :style="`transform: translateX(-${activeStep * 100 / (questionsSteps.length + 1)}%); width: ${(questionsSteps.length + 1) * 100}%`">
            <div class="relative grid duration-200 place-items-center" v-for="(item, index) in questionsSteps"
                :key="item.field" :style="`width:${100 / (questionsSteps.length + 1)}%`">
                <Foorm :class="{ '-translate-y-[40%] 2xl:translate-y-0': /date/.test(item.type) }"
                    :questionQueue="questionQueue" :setNextStep="setNextStep" v-bind="item"
                    :setPreviosStep="setPreviosStep" />
            </div>
            <div class="flex items-center justify-center grow" :style="`width:${100 / (questionsSteps.length + 1)}%`">
                <div class="flex items-center gap-5">
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
import IconMale from '@/components/Icon/Male';
import IconFemale from '@/components/Icon/Female';
import { ArrowLongLeftIcon, ArrowLongRightIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { Modal } from 'flowbite';
const activeStep = useState('activeStep', () => 0)
const inputs = useState('inputs', () => ({}))
const totalQuestions = useState('totalQuestions')
const questionQueue = ref({
    prev: [null],
    curr: 0,
    next: 1
})
// steppers List : add steppers name here to see in the stepper bar 
const steppers = ref([
    'Personal Details',
    'Employe Statement',
    'Student Loans'
])

const modal = ref(null)
const ModalRef = ref(null)
const completedStage = ref(0)
const currentStepId = ref(1)

//Question List: (most important) add question as a object in the particuler sturtured as written in the documentation

//types: text | number | email | imageCard | iconCard | rating | date | dropDown | file
const questionsSteps = ref([
    {
        question: 'Last name',
        type: "text",
        placeHolder: 'Your last name',
        field: 'lastname',
        stageId: 1,
    },
    {
        question: 'First name',
        description: `Do not enter initials or shortened names for example,
Jim for James or Liz for Elizabeth`,
        type: "text",
        placeHolder: 'Your first name',
        field: 'firstname',
        stageId: 1,
    },
    {
        question: 'What is your gender',
        type: "iconCard",
        description: `As shown on your birth certificate or gender recognition
certificate`,
        placeHolder: '',
        field: 'gender',
        stageId: 1,
        options: [
            {
                icon: IconMale,
                name: "Male"
            },
            {
                icon: IconFemale,
                name: "Female"
            }
        ]
    },
    {
        question: "Date of birth",
        type: 'date',
        format: 'dd/mm/yyyy',
        stageId: 1,
        field: "DOB"
    },
    {
        question: 'Which Country are you from',
        type: 'dropDown',
        placeHolder: "Your country",
        stageId: 1,
        refering: 'city',
        field: 'country',
        options: ['India', "USA", 'UK', 'France']
    },
    {
        question: 'Which City are you from',
        type: 'dropDown',
        placeHolder: 'Your city',
        refer: 'country',
        field: 'city',
        options: {
            'India': ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
            'USA': ['New York', 'Chicago', 'Boston', 'Los Angeles'],
            'UK': ['Birmingham', 'Belfast', 'Cambridge', 'Liverpool'],
            'France': ['Paris', 'Strasborg', 'Versailles', 'Lyon']
        },
        stageId: 1,
    },
    {
        question: 'Home Address',
        type: "text",
        placeHolder: 'Your address',
        field: 'address',
        stageId: 1,
    },
    {
        question: 'National Insurance Number',
        boolean: true,
        disabledWhen: 'no',
        yesContent: "I have that",
        noContent: "I don't have that",
        type: "number",
        placeHolder: 'Your insurance number',
        field: 'InsuraceNumber',
        stageId: 1,
    },
    {
        question: 'Employment start date',
        type: "date",
        format: 'dd/mm/yyyy',
        field: 'Emp_Start_date',
        stageId: 1,
    },
    {
        question: 'Do you have another job?',
        type: 'iconCard',
        skipOn: 'yes',
        skipTo: 12,
        field: "Have another Job",
        options: [
            {
                icon: CheckIcon,
                name: "Yes"
            },
            {
                icon: XMarkIcon,
                name: "No"
            },
        ],
        stageId: 2,
        details: {
            'Yes means': `<p><span class="font-semibold">Tax Code BR</span> - I have another job and/or I am in receipt
    of a State, workplace or private pension.</p>`,
        }
    },
    {
        question: 'Do you receive payments from a State,workplace or private pension?',
        type: 'iconCard',
        skipOn: 'yes',
        skipTo: 12,
        field: 'receiving payments from State,workpalace or private pension',
        stageId: 2,
        options: [
            {
                icon: CheckIcon,
                name: "Yes"
            },
            {
                icon: XMarkIcon,
                name: "No"
            },
        ],
        details: {
            'Yes means': `<p><span class="font-semibold">Tax Code BR</span> - I have another job and/or I am in receipt
    of a State, workplace or private pension.</p>`,
        }
    },
    {
        question: 'Since 6 April have you received payments ?',
        type: 'iconCard',
        field: 'receiving payments since 6 april',
        stageId: 2,
        options: [
            {
                icon: CheckIcon,
                name: "Yes"
            },
            {
                icon: XMarkIcon,
                name: "No"
            },
        ],
        details: {
            'Yes means': `<p><span class="font-semibold">Current personal allowance
    on a Week 1/Month 1 basis</span> - Since 6 April I have had another job
    but I do not have a P45. And/or since
    the 6 April I have received payments from Jobseeker’s Allowance or Employment and Support Allowance or Incapacity Benefit</p>`,
            'No means': `<p> <span class="font-semibold">Current personal allowance
    </span> - This is my first job since 6 April and
    since the 6 April I have not received
    payments from Jobseeker’s Allowance or Employment and Support Allowance or Incapacity Benefit  </p>`,
        }
    },
    {
        question: 'Do you have a student or postgraduate loan ?',
        type: 'iconCard',
        skipOn: 'no',
        skipTo: 'end',
        stageId: 3,
        field: 'student Loan',
        options: [
            {
                icon: CheckIcon,
                name: "Yes"
            },
            {
                icon: XMarkIcon,
                name: "No"
            },
        ],

    },
    {
        question: 'Do any of the below following statements apply',
        type: 'iconCard',
        skipOn: 'yes',
        skipTo: 'end',
        field: 'Loan state',
        stageId: 3,
        options: [
            {
                icon: CheckIcon,
                name: "Yes"
            },
            {
                icon: XMarkIcon,
                name: "No"
            },
        ],
        details: {
            "Statements 1": `<p>
                you’re still studying on a course that your
                student loan relates to
                </p>`,
            'Statement 2': `<p>
                    you completed or left your course after the
                    start of the current tax year, which started
                    on 6 April
                    </p>`,
            'Statement 3': `<p>
                        you’ve already repaid your loan in full
                        </p>`,
            'Statement 4': `<p>
                            you’re paying the Student Loans Company
                            by Direct Debit from your bank to manage
                            your end of loan repayments
                            </p>`
        }
    },
    {
        question: `Select which plans do you have`,
        description: `To avoid repaying more than you need to, tick the
correct student loan or loans that you have – use the
guidance on the below to help you`,
        type: 'iconCard',
        field: 'plans',
        stageId: 3,
        multiple: true,
        options: [
            {
                name: "Plan 1"
            },
            {
                name: "Plan 2"
            },
            {
                name: "Plan 4"
            },
            {
                name: "Postgraduate loan"
            },
        ],
        details: {
            'Plan 1': `<p>you lived in Northern Ireland when you started
your course / you lived in England or Wales and started your course
before 1 September 2012</p>`,
            'Plan 2': `<p>You lived in England or Wales and started your course
on or after 1 September 2012</p>`,
            'Plan 4': `<p>You lived in Scotland and applied through the
Students Award Agency Scotland (SAAS) when you started
your course.</p>`,
            'Postgraduate loan': `<p> you lived in England and started your postgraduate
master’s course on or after 1 August 2016 / you lived in Wales and started your postgraduate
master’s course on or after 1 August 2017 / you lived in England or Wales and started your
postgraduate doctoral course on or after 1 August 2018 </p>`,
        }
    },
])
totalQuestions.value = questionsSteps.value.length

function setNextStep() {
    if (activeStep.value === (questionsSteps.value.length - 1) || questionQueue.value.next === totalQuestions.value) {
        completedStage.value++
    }
    else {
        const stepperId = questionsSteps.value[questionQueue.value.next].stageId
        while (currentStepId.value < stepperId) {
            completedStage.value++
            currentStepId.value++
            console.log(currentStepId.value)
        }
    }

    activeStep.value = questionQueue.value.next
    questionQueue.value.prev.push(questionQueue.value.curr)
    questionQueue.value.next = questionQueue.value.next + 1
    questionQueue.value.curr = activeStep.value
    return
}
function setPreviosStep() {
    activeStep.value = questionQueue.value.prev.pop()
    questionQueue.value.next = questionQueue.value.curr
    questionQueue.value.curr = activeStep.value
}
async function onSubmit() {
    const formData = new FormData()
    modal.value.show()
    for (const [props, value] of Object.entries(inputs.value)) {
        if (value.length < 1) {
            continue
        }
        if (Array.isArray(value) && value[0]?.name !== undefined) {
            for (const file of value) {
                formData.append(props, file, file.name)
            }
            continue
        }
        formData.append(props, value)
    }
    const { data } = await useFetch('/api/send', {
        method: 'POST',
        body: formData,
        onResponse() {
            modal.value.hide()
            navigateTo('complete')
        },
        onResponseError(){
            modal.value.hide()
        }
    })
}

useHead({
    script: questionsSteps?.value.find(item => item.type === 'date') && [{ src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/datepicker.min.js", async: true }],
})
onMounted(() => {
    const $targetEl = ModalRef.value
    const options = {
        placement: 'center-center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
    };
    modal.value = new Modal($targetEl, options)
})
</script>

<style lang="scss" scoped></style>