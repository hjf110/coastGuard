<template>
    <!--    路由刷新功能中转页面-->
    <div></div>
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
