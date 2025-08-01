<template>
    <div>
      <!-- 大標題 -->
      <header class="text-center p-8 bg-pink-50">
        <p class="font-['BlackRose'] text-lg text-gray-600 tracking-widest uppercase">We're Getting Married</p>
        <h1 class="font-['BlackRose'] text-5xl md:text-7xl text-gray-800 my-4">
          {{ names.groom }} & {{ names.bride }}
        </h1>
        <p class="text-xl text-gray-500 font-['BlackRose']">
          誠摯邀請您來見證我們的幸福
        </p>
      </header>
      
      <!-- 主照片 -->
      <div class="w-full h-96">
        <img 
          :src="mainPhotoUrl" 
          alt="新郎與新娘" 
          class="w-full h-full object-cover"
        >
      </div>
    </div>
  </template>
  
  <script setup>
  // 使用 defineProps 來宣告此組件可以接收的屬性
  // 這樣我們就可以從父組件傳遞資料進來
  defineProps({
    names: {
      type: Object,
      required: true, // 代表這個 prop 是必須的
      // 提供一個預設值，以防萬一
      default: () => ({ groom: '新郎', bride: '新娘' })
    },
    mainPhotoUrl: {
      type: String,
      required: true
    }
  });
  </script>