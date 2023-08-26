<template>
    <div class="flex items-center gap-3 mb-10 border-b-2 border-b-gray-500">
        <CalendarDaysIcon class="w-7 h-7" />
        <input datepicker datepicker-autohide datepicker-orientation="bottom right" type="text"
            :datepicker-format="placeHolder" @changeDate="(e) => { data[field] = e.target.value }" :placeholder="placeHolder"
            class="text-lg lg:text-xl w-full font-semibold border-none focus:border-none bg-slate-100 focus:ring-0 text-gray-500  placeholder:text-gray-400  focus:outline-non  !px-0">
    </div>
</template>

<script setup>

import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
const { field, placeHolder } = defineProps(['field', 'placeHolder'])
const data = useState('inputs')
</script>

<style lang="scss" scoped></style>