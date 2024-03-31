<script setup>
import IconStar from "@/components/icons/iconStar.vue";
import IconPaperAirplane from "@/components/icons/iconPaperAirplan.vue";
import IconPhone from "@/components/icons/iconPhone.vue";
import IconAvatar from "@/components/icons/iconAvatar.vue";
import IconEmoji from "@/components/icons/iconEmoji.vue";
import IconVideoCam from "@/components/icons/iconVideoCam.vue";
import {ref, onMounted} from "vue";
import axios from "axios";


let chatRooms = ref([]);
let activeRoom = ref({});
let authUser = ref({});
let currentChat = ref({});
let message = ref('');

async function fetchData() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/rooms/all/1');

    authUser.value = response.data.authUser;
    chatRooms.value = response.data.chatRooms;
    activeRoom.value = response.data.activeRoom;
    currentChat.value = response.data.chat;

    console.log('authUser: ', authUser.value);
    console.log('chatRooms: ', chatRooms.value);
    console.log('activeRoom: ', activeRoom.value);
    console.log('currentChat: ', currentChat.value);


    scrollToChatBottom()

  } catch (error) {
    console.log(error);
  }

}

onMounted(fetchData);

// eslint-disable-next-line no-undef
Echo.channel('newChannel')
.listen('SendMessage', (response) => {
  if (response.error) {
    console.log('Echo Error: ', response.error);
  } else {
    console.log('Echo Response: ', response);
    pushMessageToChat(response);
  }
})


function appendMessage() {
  if (message.value) {
    console.log('appendMessage: ', message.value);
    sendMessage();
    message.value = '';
    scrollToChatBottom();
  }
}

function scrollToChatBottom() {
  const chat = document.getElementById('chat');
  if (chat) {
    chat.scrollTop = chat.scrollHeight
  }
}

function sendMessage() {
  fetch('http://127.0.0.1:8000/api/chat/send/' + activeRoom.value.id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message.value,
      userName: authUser.value.name,
      userId: authUser.value.id
    }),
  }).then(response => console.log(response.json()))
  .catch(error => console.log('Error: ', error));
}

function pushMessageToChat(data) {
  console.log("pushMessageToChat: ", data);
  currentChat.value.push({
    "id": data.id,
    "message": data.message,
    "room_id": data.roomId,
    "time": data.time,
    "updated_at": data.updated_at ,
    "created_at": data.created_at ,
    "user_id": data.userId,
    "user_name": data.userName,
  });
}

</script>
<template>
  <div class="w-full h-full bg-[--vt-c-black-mute]">
    <div class="h-full w-full flex flex-col">
      <div
          class="min-h-[6rem] border-b border-b-[--vt-c-divider-dark-1] py-3 px-5 flex gap-5 justify-between items-center">

        <div class="w-12 h-12">
          <img :src="authUser.avatar" alt="avatar" class="rounded-full">
        </div>
        <div class="flex-grow">
          <h3 class="text-white font-bold text-lg">{{ authUser.name }}</h3>
          <p class="text-[--vt-c-white-mute] text-xs font-semibold">Online</p>
        </div>
        <div class="flex gap-4">
          <button class="bg-gray-500/40 rounded-full p-2">
            <iconStar class="w-6 h-6 text-white"/>
          </button>
          <button class="bg-gray-500/40 rounded-full p-2">
            <iconAvatar class="w-6 h-6 text-white"/>
          </button>
          <button class="bg-gray-500/40 rounded-full p-2">
            <iconVideoCam class="w-6 h-6 text-white"/>
          </button>
          <button class="bg-gray-500/40 rounded-full p-2">
            <iconPhone class="w-6 h-6 text-white"/>
          </button>
        </div>
      </div>
      <div id="chat" class="flex-grow w-full bg-[#1a1a1e] overflow-y-auto">
        <div v-for="message in currentChat" :key="message.id"
             class="min-h-[6rem] gap-3 w-full px-12 py-4 flex items-end"
             :class="{'flex-row-reverse ': message.user_id === authUser.id}">
          <div class="h-fit translate-y-2">
            <img :src="'https://api.dicebear.com/5.x/bottts/svg?seed=User' + message.user_id" alt="avatar" class="w-8 h-8 rounded-full">
          </div>
          <div class="w-fit min-w-[12rem] max-w-[30rem] bg-gradient-to-r px-8 py-4 space-y-3 rounded-lg"
               :class="{ 'from-sky-500 to-indigo-500': message.user_id !== authUser.id, 'from-violet-500 to-fuchsia-500': message.user_id === authUser.id, 'rounded-bl-none': message.user_id !== authUser.id, 'rounded-br-none': message.user_id === authUser.id }">
            <div class="flex flex-row justify-between items-center">
              <h3 class="text-white font-semibold text-sm">{{ message.user_name }}</h3>
              <h3 class="text-gray-300 text-sm">{{ message.time }}</h3>
            </div>
            <div>
              <p class="text-white text-sm">{{ message.message }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="min-h-[8rem] p-6 bg-[#1a1a1e]">
        <div class="flex justify-between gap-5 items-center px-5 rounded-lg bg-[--vt-c-black-soft] z-10 w-full h-full">
          <button>
            <iconEmoji class="w-7 h-7 text-white"/>
          </button>
          <div class="flex-grow">
            <input @keyup.enter="appendMessage" v-model="message" type="text" placeholder="Type a message"
                   class="text-white rounded-lg bg-transparent px-3 py-2 w-full">
          </div>
          <button @click="appendMessage">
            <IconPaperAirplane
                class="w-8 h-8 text-white bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full p-1"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>