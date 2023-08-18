<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
        <a href="#">
            <img class="w-full rounded-t-lg aspect-video" :src="image" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Q: {{ question }}</h5>
            </a>
            <div class="w-full px-2 mt-2 mb-3">
                <div class="font-semibold">Tier:
                    <ul class="flex items-center gap-2 py-1 ">
                        <li v-for="item in   tiers  " class="flex items-center gap-3">
                            <button type="button" @click="() => { selectedTier = item }"
                                class="px-2 py-1 font-medium text-white duration-150 rounded-full" :class='{
                                    "bg-gray-500": item !== selectedTier, "bg-emerald-500": item === "Easy"
                                        && item === selectedTier, "bg-yellow-500": item === "Medium" && item === selectedTier, "bg-red-500": item === "Hard" && item === selectedTier
                                }'>
                                {{ item }}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col items-start my-2 font-semibold">
                    Parent Tag:
                    <span class="px-2 py-0.5 text-white bg-gray-600 rounded-full w-auto">
                        {{ ParentTag }}
                    </span>
                </div>
                <div class="font-semibold">Tags:
                    <ul class="flex flex-wrap items-center gap-2 py-2 font-medium">
                        <li class="px-2 py-0.5 text-white bg-gray-600 rounded-full flex items-center gap-1" v-for="  (item,index)   in   CardTags">
                            {{ item }} <button type="button" @click="removeTag(index)"> <XMarkIcon class="w-4 h-4"/></button>
                        </li>
                        <div class="relative">
                            <button class="p-0.5 text-white bg-gray-600 rounded-full relative"
                                @click="() => { isOpen = true }">
                                <PlusIcon class="w-6 h-6 text-white" />
                            </button>
                            <div v-if="isOpen"
                                class="absolute z-20 pt-2 text-black rounded-md bg-slate-200 left-full bottom-full">
                                <div class="px-2 text-start">
                                    <span v-if="searchTag?.length < 1">Search for tags !..</span>
                                    <ul v-if="filteredTags?.length > 0" class="flex flex-col items-start gap-2">
                                        <li v-for="item in filteredTags"
                                            class="px-2 py-1 bg-white rounded-full cursor-pointer"
                                            @click="addTagToList(item)">
                                            {{ item }}
                                        </li>
                                    </ul>
                                    <button type="button" class="flex items-center gap-2 p-1 bg-white rounded-full" @click="createTag"
                                        v-if="filteredTags.length < 1 && searchTag?.length > 0">Create tag
                                        <PlusIcon class="w-4 h-4" />
                                    </button>
                                </div>
                                <div class="box-border flex items-center p-1 overflow-hidden rounded-b-lg">
                                    <input type="text" v-model="searchTag" placeholder="searchTag"
                                        class="h-8 px-2 border-none outline-none bg-slate-200 w-44 focus:outline-none focus:ring-0">
                                    <button type="button" class="p-1 text-lg">
                                        <XMarkIcon class="w-4 h-4 text-black"
                                            @click="() => { isOpen = false; searchTag = '' }" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="flex items-center justify-around w-full">
                <button class="px-5 py-3 font-semibold text-white duration-150 rounded-md bg-primary-500" @click="()=>{CardAnswer='True'}" :class="{'!bg-gray-500':CardAnswer!=='True'}">True</button>
                <button class="px-5 py-3 font-semibold text-white duration-150 bg-red-600 rounded-md" @click="()=>{CardAnswer='False'}" :class="{'!bg-gray-500':CardAnswer!=='False'}">False</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const allTags = useState('tags')

const { question, ParentTag, tier, tags,answer,image } = defineProps(['question','image', 'answer', 'tier', 'tags', 'ParentTag'])
const CardTags=ref(tags)
const CardAnswer=ref(answer)
const tiers = ["Easy", 'Medium', "Hard"]
const isOpen = ref(false)
const selectedTier = ref(tier)
const searchTag = ref("")
const filteredTags = computed(() => {
    if (searchTag.value.length < 1) {
        return []
    }
    const regex = new RegExp(`^${searchTag.value}`, 'i')
    const filtedtags = allTags.value.filter(item => regex.test(item))
    return filtedtags
})
function addTagToList(item){
    CardTags.value.push(item)
    isOpen.value=false
    searchTag.value=""
}
function createTag(){
    const value=searchTag.value
    allTags.value.push(value)
    addTagToList(value)
    isOpen.value=false
    searchTag.value=""
}
function removeTag(index){
    CardTags.value.splice(index,1)
}
</script>