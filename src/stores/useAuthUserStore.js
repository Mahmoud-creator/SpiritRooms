import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('user', () => {

    const user = ref(null);

    const isAuthenticated = computed(() => user.value !== null);

    return { user , isAuthenticated }
})
