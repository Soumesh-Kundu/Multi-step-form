<template>
    <div class="my-10" >
        <h2 class="text-2xl ">Form submited by: <span class="text-primary-500">{{ `${data['firstname']} ${data['lastname']}` }}</span> </h2>
        <div class="mt-8">
            All field and answers:
             <ul class="flex flex-col gap-2 px-2 mt-3 custom-scrollbar overflow-auto bg-white rounded-lg max-h-80 2xl:max-h-[26rem] ">
                <template v-for="(item,prop) in questionSteps" >
                    <li v-if="data[item.field].length" class="max-w-sm">
                        {{ item.field }} : <span class="font-semibold" v-if="item.type==='file'">{{ data[item.field].map(item=>item.name).join(', ') }}</span>
                        <span class="font-semibold" v-else>{{ Array.isArray(data[item.field])?data[item.field].join(', '):data[item.field] }}</span>
                    </li>
                </template>
             </ul>
        </div> 
    </div>
</template>

<script setup>
const {questionSteps,nameField}=defineProps(['nameField','questionSteps'])
const data=useState('inputs')

</script>

<style lang="scss" scoped>

</style>