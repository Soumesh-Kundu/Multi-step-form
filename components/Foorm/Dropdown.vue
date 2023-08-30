<template >
    <div class="flex items-center gap-3 mb-5 border-b-2 border-b-gray-500">

        <input ref="dropDownButton"
            class="w-full text-lg font-semibold text-gray-500 border-none lg:text-xl focus:border-none bg-slate-100 focus:ring-0 placeholder:text-gray-400 focus:outline-none "
            type="text" @focus="() => { dropDown.show() }" @input="() => { data[field] = '' }" v-model="searchInput[field]"
            :placeholder="placeHolder" />
    </div>
    <div ref="dropDownList" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
        <ul v-if="filterOptions?.length > 0"
            class="flex flex-col gap-2 py-2 overflow-auto text-gray-700 max-h-48 custom-scrollbar">
            <li v-for="item in filterOptions" :key="item" class="cursor-pointer" @click="onClick(item)">
                <span class="px-3 py-2 font-medium ">{{ item }}</span>
            </li>
        </ul>
        <span v-else class="block px-3 py-4">
            No Results found!
        </span>
    </div>
</template>

<script setup>
import { Dropdown } from 'flowbite'

const { options, field, placeHolder, refer, refering } = defineProps(['options', 'field', 'placeHolder', 'refer', 'refering'])
const data = useState('inputs')

const allOptions = computed(() => {
    if (refer) {
        return options[data.value[refer]]
    }
    else {
        return options
    }
})
// watchEffect(()=>{
//     if(field==='refering' && data.value[field].length<1){
//         searchInput.value=""
//         console.log('changes refering')
//     }
// })
const searchInput = useState('searchInput',()=>({}))
searchInput.value[field]=""
const filterOptions = computed(() => {
    if (searchInput.value[field].length < 1) {
        return allOptions.value
    }
    const search = new RegExp(`^${searchInput.value[field]}`, 'i')
    return allOptions.value.filter(item => search.test(item))
})
function onClick(item) {
    data.value[field] = item
    searchInput.value[field] = item
    if(refering!==undefined){
        data.value[refering]=""
        searchInput.value[refering]=""
    }
    dropDown.value.hide()
}
const dropDownButton = ref(null)
const dropDownList = ref(null)
const dropDown = ref(null)
onMounted(() => {
    const $targetEl = dropDownList.value;
    const $triggerEl = dropDownButton.value;
    dropDown.value = new Dropdown($targetEl, $triggerEl, { offsetDistance: 10, triggerType: 'none' })
})
</script>

<style >
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    background: #fcf5f5;
    border-radius: 30px;
    z-index: 100;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 30px;
}
</style>