<template>
    <div class="my-12">
        <label :for="field" class="px-5 py-4 text-lg font-medium text-white bg-primary-500 rounded-4">
            {{ placeHolder }}
        </label>
        <input type="file" :id="field" hidden :multiple="multiple" @change="onFileChange">
    </div>
    <div>
        <ul v-if="data[field] !== undefined" class="flex flex-wrap items-center justify-center gap-3">
            <li v-for="file in data[field]" class="flex items-center gap-2 px-3 py-2 bg-white rounded-full">
                <span>{{ file.name }}</span>
                <button type="button" @click="onCancel(file.name)" class="p-1 duration-200 rounded-full hover:bg-slate-200">
                    <XMarkIcon class="w-5 h-5 " />
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

const { placeHolder, field, multiple } = defineProps(['placeHolder', 'field', 'multiple'])
const data = useState('inputs')
data.value[field] ||= []
function onFileChange(e) {
    const files = e.target.files || e.dataTrasfer.files
    if (!files.length) return
    if (!multiple) {
        data.value[field][0] = files[0]
        return
    }
    for (const file of files) {
        data.value[field].push(file)
    }
}
function onCancel(name){
    data.value[field]=data.value[field].filter(item=>item.name!==name)
    
}
</script>

<style lang="scss" scoped></style>