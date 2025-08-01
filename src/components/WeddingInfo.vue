<template>
    <section class="bg-pink-50 p-8">
      <h2 class="text-3xl text-center text-gray-800 mb-8 font-['BlackRose']">婚宴資訊</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
        <!-- 日期 -->
        <div class="flex flex-col items-center">
          <div class="font-['BlackRose'] bg-white p-4 rounded-full shadow-md mb-3">
            日期
          </div>
          <p class="text-gray-600">{{ details.date }}</p>
        </div>
        <!-- 時間 -->
        <div class="flex flex-col items-center">
           <div class=" font-['BlackRose'] bg-white p-4 rounded-full shadow-md mb-3">
            時間
          </div>
          <p class="text-gray-600">{{ details.time }}</p>
        </div>
        <!-- 地點 -->
        <div class="flex flex-col items-center">
           <div class="font-['BlackRose'] bg-white p-4 rounded-full shadow-md mb-3">
            地點
          </div>
          <p class="text-gray-600">{{ details.location }}</p>
          <a :href="details.mapUrl" target="_blank" class="text-pink-600 hover:underline">點我跳到Google Map</a>
        </div>
      </div>
      <div class="text-center mt-8">
        <button 
          @click="handleClick" 
          class="
            bg-pink-500           <!-- 背景色：粉紅色 -->
            text-white            <!-- 文字顏色：白色 -->
            font-semibold         <!-- 字體粗細：半粗體 -->
            py-3 px-8             <!-- 內邊距：上下3(12px), 左右8(32px) -->
            rounded-full          <!-- 圓角：完全圓角，變成膠囊形狀 -->
            shadow-lg             <!-- 陰影：較大的陰影，增加立體感 -->
            hover:bg-pink-600     <!-- 滑鼠懸停效果：背景色變深 -->
            transform             <!-- 啟用 transform 效果 -->
            hover:scale-105       <!-- 滑鼠懸停效果：放大 5% -->
            transition-all        <!-- 過渡效果：所有屬性變化都平滑過渡 -->
            duration-300          <!-- 過渡時間：300毫秒 -->
            ease-in-out           <!-- 過渡曲線：緩進緩出 -->
            font-['BlackRose']
          "
        >
          查看停車資訊
        </button>
      </div>
       <!-- 
        1. 我們給 Transition 一個新的 name，例如 "grid-slide"，以匹配新的 CSS
      -->
      <Transition name="grid-slide" >
        <!-- 
          2. 外層 div 變成 Grid 容器，並由 v-show 控制
        -->
        <div v-show="parkState" class="grid-container">
          <!-- 
            3. 內部再包一層 div，這是 Grid 的內容項。
               它需要 overflow-hidden 來隱藏內容。
          -->
          <div class="overflow-hidden">
            <img :src="parkinfo" class="w-full h-auto object-cover rounded-lg" :alt="'停車資訊 '">
          </div>
        </div>
      </Transition>
    </section>
  </template>
  
  <script setup>



  defineProps({
    details: {
      type: Object,
      required: true,
    },
    parkinfo:{
        type:String,
        required: true,
    },
    parkState:{
        type:Boolean,
        required:true
    }
  });

  const emit = defineEmits(['click-park']);
  const handleClick = ()=>{
    emit('click-park');
  }
  </script>