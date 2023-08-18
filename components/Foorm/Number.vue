<template>
    <div class="border-b-2 border-gray-300 my-14 w-72">
        <input type="number" id="first_name" ref="emailRef"
            class="text-xl w-full font-semibold appearance-none border-none focus:border-none bg-slate-100 focus:ring-0 text-gray-500  placeholder:text-gray-400  focus:outline-non  !px-0"
            :placeholder="placeHolder" v-model.number="data[field]">
    </div>
</template>

<script setup>
const {field,placeHolder}=defineProps(['field','placeHolder'])
const data = useState('inputs')
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>