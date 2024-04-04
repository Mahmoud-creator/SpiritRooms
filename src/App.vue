<script setup>
import ChatPlane from "@/components/ChatPlane.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";
import {ref} from "vue";
import {useAuthUserStore} from "@/stores/useAuthUserStore.js";

const useAuthUser = useAuthUserStore();

console.log(useAuthUser.user);

const isAuthUser = useAuthUser.isAuthenticated;

</script>

<template>
<!--  <div v-if="!isAuthUser" class="fixed w-full h-full bg-red-400/10 z-50 backdrop-blur-sm">-->
<!--    <h1>{{ isAuthUser }}</h1>-->
<!--  </div>-->
  <main class="h-screen flex flex-wrap">
    <NavigationMenu />
    <ChatPlane />
  </main>
</template>

<style scoped>
</style>
