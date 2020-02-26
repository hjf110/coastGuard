<template>
    <!--    路由刷新功能中转页面-->
</template>
<script>
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$router.replace(from.path);
        });
    }
};
</script>
