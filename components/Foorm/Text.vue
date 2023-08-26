<template>
    <div class="border-b-2 border-gray-300 my-14 w-60 lg:w-72"
        >
        <input type="text" id="first_name" ref="emailRef"
        class="text-lg lg:text-xl w-full font-semibold border-none focus:border-none bg-slate-100 focus:ring-0 text-gray-500  placeholder:text-gray-400  focus:outline-non  !px-0"
        :placeholder="placeHolder" v-model="data[field]" @input="()=>{}">
    </div>
</template>

<script setup>
const {field,placeHolder}=defineProps(['field','placeHolder'])
const data=useState('inputs')
</script>

<style lang="scss" scoped></style>