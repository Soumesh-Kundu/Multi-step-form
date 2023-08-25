<template>
    <div class="grid w-full h-full place-items-center">
        <div class="flex flex-col items-center p-5 bg-white rounded-md gap-7">
            <CheckCircleIcon  class="w-28 h-28 text-primary-500"/>
            <span class="text-lg font-medium">
                Your response is submited and collected successfully
            </span>
        </div>
    </div>
</template>

<script setup>
import {CheckCircleIcon} from '@heroicons/vue/24/outline'
</script>