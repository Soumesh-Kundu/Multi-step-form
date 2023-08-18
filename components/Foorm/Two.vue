<template>
    <div>
        <h2 class="text-2xl ">Company Name: <span class="font-semibold text-primary-500">{{ data.company }}</span></h2>
        <h4 class="text-lg">Company Email: <span class="font-semibold">{{ data.email }}</span>
        </h4>
        <div class="mt-10">
            <h4 class="mb-3">Services:</h4>
            <ul class="flex flex-col gap-2">
                <li v-for="(item, index) in data.services" :key="item">
                    {{ index + 1 }}. <span class="font-medium">{{ item }}</span>
                </li>
            </ul>
        </div>
        <div class="flex justify-center">
            <button @click="setNextStep" type="sumbit"
                class="flex items-center gap-16 px-4 py-3 mt-5 text-white bg-primary-500">
                <span class="text-xs font-semibold">NEXT</span>
                <ArrowLongRightIcon class="w-5 h-5 " />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline';

const { data, setNextStep } = defineProps(['data', 'setNextStep'])
onMounted(() => {
    console.log('two')
})
</script>

<style lang="scss" scoped></style>