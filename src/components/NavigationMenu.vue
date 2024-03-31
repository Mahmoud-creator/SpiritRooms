<script setup>
import iconEllipsisHorizontal from '@/components/icons/iconEllipsisHorizontal.vue';
import iconBell from '@/components/icons/iconBell.vue';
import {onMounted, ref} from "vue";
import axios from "axios";

let chatRooms = ref([]);
let activeRoom = ref({});

async function fetchData() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/rooms/all/1');

    chatRooms.value = response.data.chatRooms;
    activeRoom.value = response.data.activeRoom;

    console.log('chatRooms: ', chatRooms.value);
    console.log('activeRoom: ', activeRoom.value);
  } catch (error) {
    console.log(error);
  }
}

onMounted(fetchData);


</script>
<template>
  <div class="w-[30rem] h-full bg-[--vt-c-black-soft]">
    <div class="h-full w-full px-5 py-8">
      <div class="flex content-center items-center justify-between gap-2">
        <div class="w-12 h-12">
          <img src="https://i.pravatar.cc/50?u=mahmoud@gmail.com" alt="avatar" class="rounded-full">
        </div>
        <div class="flex-grow">
          <h3 class="text-white font-bold text-md">Mahmoud Shawish</h3>
        </div>
        <div class="flex gap-1">
          <button><iconBell class="text-white" /></button>
          <button><iconEllipsisHorizontal class="text-white" /></button>
        </div>
      </div>
      <div class="pt-5 space-y-5">
        <div>
          <input type="text" placeholder="Search" class="text-white rounded-2xl bg-[--vt-c-black-mute] px-3 py-2 w-full">
        </div>
        <div class="flex justify-evenly">
          <div><p class="font-semibold text-sm pb-1 border-b-2 text-[--vt-c-white-soft] uppercase">Active Now</p></div>
          <div><p class="font-semibold text-sm text-[--vt-c-white-soft] uppercase">Favorites</p></div>
          <div><p class="font-semibold text-sm text-[--vt-c-white-soft] uppercase">All</p></div>
        </div>
        <div class="space-y-2">
          <div v-for="room in chatRooms" :key="room.id" class="cursor-pointer px-2 rounded-lg hover:bg-gray-50/10 flex gap-4 mb-5 py-2 border-b border-[--vt-c-divider-dark-1]" :class="{ 'bg-gray-50/10': room.id === activeRoom.id }">
            <div class="w-12 h-12">
              <img :src="room.avatar" alt="avatar" class="rounded-full">
            </div>
            <div class="flex-grow">
              <h3 class="text-white font-bold text-lg">{{ room.name }}</h3>
              <p class="text-[--vt-c-white-mute] text-xs font-semibold">{{ (room.description).slice(0, 20) + ( room.description.length > 20 ? '...' : '') }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-50">Sat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>