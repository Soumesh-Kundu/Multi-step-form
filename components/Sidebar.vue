<template>
    <aside id="default-sidebar"
        class="fixed top-0 left-0 z-50 w-64 h-screen py-8 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div>
            <h1 class="px-8 text-3xl font-bold text-primary-500">Qualyval</h1>
        </div>
        <div class="grid h-48 place-items-center">
            <div class="w-32 h-32 rounded-[50%] progress grid place-items-center duration-500"
                :style="`--percentage:${totalCompleted * 100 / totalQuestions}%`">
                <div class="flex flex-col items-center justify-center">
                    <div class="flex items-start" v-if="activeStep >= 0">
                        <span v-if="activeStep >= totalQuestions">
                            <CheckIcon class="w-10 h-10 text-primary-500" />
                        </span>
                        <span v-else
                            class="ml-4 text-3xl font-bold">{{ totalCompleted === 0 ? 0 : Math.floor(totalCompleted * 100 / totalQuestions)
                            }}<span class="text-base font-medium">%</span></span>
                    </div>
                    <span v-if="activeStep < totalQuestions">{{ totalCompleted || 0 }}/{{ totalQuestions }}</span>
                </div>
            </div>
        </div>
        <div class="h-full px-4 overflow-y-auto">
            <ul class="space-y-2 ">
                <li><span class="font-semibold">Today:</span> {{ totalCompleted || 0 }}</li>
                <li><span class="font-semibold">Yesterday:</span> 25</li>
                <li><span class="font-semibold">This week : </span> 120</li>
                <li><span class="font-semibold">This month: </span> 568</li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ChatBubbleBottomCenterIcon, CheckIcon } from '@heroicons/vue/24/outline'
const activeStep = useState('activeStep')
const totalQuestions = useState('totalQuestions')
const Allsteps = new Set()
const totalCompleted = computed(() => {
    if (activeStep.value === 0 && Allsteps.has(totalQuestions.value)) {
        Allsteps.clear()
    }
    Allsteps.add(activeStep.value)
    return Math.max(...Array.from(Allsteps))
})

</script>
<style scoped>
.progress {
    background:
        radial-gradient(closest-side, white 89%, transparent 90% 100%),
        conic-gradient(#26873E var(--percentage), rgb(229, 231, 235) 0%);
}</style>