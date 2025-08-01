<template>
    <section class="p-8">
      <h2 class="text-3xl  text-center text-gray-800 mb-6 font-['BlackRose']">我們的點滴</h2>
      <div v-if="photos.length > 0" class="relative  w-full max-w-2xl mx-auto">
        <!-- 輪播圖片容器 -->
        <div class="relative aspect-[21/28] overflow-hidden rounded-lg">
          <div 
            v-for="(photo, index) in photos" 
            :key="photo.id" 
            class="absolute w-full h-full transition-opacity duration-700 ease-in-out"
            :class="{'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index}"
          >
            <img :src="photo.url" class="w-full h-full object-cover object-center" :alt="'婚紗照 ' + (index + 1)">
          </div>
        </div>
        
        <!-- 控制按鈕 -->
        <button @click="clickPrev" class="absolute top-1/2 left-0 z-10 -translate-y-1/2 ml-4 bg-white/50 p-2 rounded-full hover:bg-white transition">
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button @click="clickNext" class="absolute top-1/2 right-0 z-10 -translate-y-1/2 mr-4 bg-white/50 p-2 rounded-full hover:bg-white transition">
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      <p v-else class="text-center text-gray-500">照片載入中...</p>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 透過 props 接收照片陣列
  const props = defineProps({
    photos: {
      type: Array,
      required: true,
      default: () => []
    }
  });
  
  // 組件自身的狀態，用來追蹤當前顯示的照片索引
  const currentIndex = ref(0);
  
  // 點擊按鈕
  const clickNext = ()=>{
    stopplay()
    nextSlide()
    startplay()
  }

  const clickPrev = ()=>{
    stopplay()
    prevSlide()
    startplay()
  }

  // 切換到下一張照片的函式
  const nextSlide = () => {
    if (props.photos.length === 0) return;
    currentIndex.value = (currentIndex.value + 1) % props.photos.length;
  };
  
  // 切換到上一張照片的函式
  const prevSlide = () => {
    if (props.photos.length === 0) return;
    currentIndex.value = (currentIndex.value - 1 + props.photos.length) % props.photos.length;
  };

  // 定時輪播
  let photochange = null;

  const startplay = ()=>{
    photochange = setInterval(()=>{
        nextSlide()
    },3000)
  }
  const stopplay = ()=>{
    clearInterval(photochange)
  }

  // 開始撥
  startplay()
  
  </script>