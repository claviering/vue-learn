<template>
    <div v-text="msg" class="red"></div>
</template>

<script>
    export default{
        data(){
            return {
                msg:'hello world'
            }
        }
    }
    
</script>

<style scoped>
    .red{
        color: red;
    }
    
</style>