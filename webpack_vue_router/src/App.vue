<template>
    <div>
        <router-link to="login">登录</router-link>
        <router-link to="register">注册</router-link>
        <router-view></router-view>
    </div>
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