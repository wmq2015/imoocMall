<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">Home</a>
                <slot name="Goods"></slot>
                <slot name="My Cart"></slot>
            </nav>
        </div>
    </div>
</template>
<style></style>
<script>
    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        }
    }
</script>
