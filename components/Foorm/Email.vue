<template>
    <div class="border-b-2 border-gray-300 my-14 w-72" :class="{'!border-red-500':!valid.valid}">
        <input type="email" id="first_name" ref="emailRef" 
            class="text-xl w-full font-semibold border-none focus:border-none bg-slate-100 focus:ring-0 text-gray-500  placeholder:text-gray-400  focus:outline-non  !px-0"
            :placeholder="placeHolder" v-model="data[field]" @input="onInput">
    </div>
</template>

<script setup>
const {field,placeHolder,valid,onInput}=defineProps(['field','placeHolder','valid','onInput'])
const data = useState('inputs')
onMounted(()=>{
    if (data.value[field]?.length > 0) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!data.value[field].length) {
            valid.valid = true
            return
        }
        if (!emailRegex.test(data.value[field])) {
            valid.valid = false
            return
        }
        valid.valid = true
    }
})
</script>

<style lang="scss" scoped></style>