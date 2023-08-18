<template>
    <div>

    </div>
</template>

<script setup>
definePageMeta({
    layout:"clean"
})
const {Realm}=useRealm()
onMounted(()=>{
    console.log('hello')
    Realm.handleAuthRedirect()
})
</script>

<style lang="scss" scoped>

</style>