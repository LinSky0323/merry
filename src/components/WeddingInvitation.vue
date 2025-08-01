<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
      <div class="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        
        <!-- 1. 標題組件：傳入新人名字和主照片 -->
        <InvitationHeader 
          :names="coupleNames"
          :main-photo-url="mainPhoto"
        />
  
        <!-- 2. 輪播組件：傳入照片列表 -->
        <PhotoCarousel :photos="photoGallery" />
  
        <!-- 3. 資訊組件：傳入婚宴細節 -->
        <WeddingInfo 
        :details="weddingDetails"
        :parkinfo = "parkurl"
        :parkState = "parkState"
        @click-park="handlePark"
        />
  
        <!-- 4. 表單組件 -->
        <!-- :is-submitted 傳遞表單是否已提交的狀態 -->
        <!-- @submit-rsvp 監聽子組件觸發的 'submit-rsvp' 事件，並執行 handleRsvpSubmit 函式 -->
        <RsvpForm 
          :is-submitted="formSubmitted"
          @submit-rsvp="handleRsvpSubmit"
        />
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // 引入所有子組件
  import InvitationHeader from './InvitationHeader.vue';
  import PhotoCarousel from './PhotoCarousel.vue';
  import WeddingInfo from './WeddingInfo.vue';
  import RsvpForm from './RsvpForm.vue';
  import { returnMsg } from '@/lib/firebase/firestore';

  
  // --- 資料中心 (Single Source of Truth) ---
  // 所有喜帖的資料都定義在這裡，方便統一管理
  
  // 新人姓名
  const coupleNames = reactive({
    groom: '聖鎧',
    bride: '芮智'
  });
  
  // 主婚紗照
  const mainPhoto = ref('/images/S__13434891.jpg');
  
  // 照片輪播列表
  const photoGallery = ref([
    { id: 1, url: '/images/S__13434885.jpg' },
    { id: 2, url: '/images/S__13434886.jpg' },
    { id: 3, url: '/images/S__13434887.jpg' },
    { id: 4, url: '/images/S__13434888.jpg' },
    { id: 5, url: '/images/S__13434889.jpg' },
    { id: 6, url: '/images/S__13434890.jpg' }
  ]);
  // 停車資訊
  const parkurl = ref('/images/park.webp')

  // 婚宴資訊
  const weddingDetails = reactive({
    date: '2025 年 10 月 25 日 (星期六)',
    time: ' 11:30 迎賓 | 12:00 開席',
    location: '湖口 芃華國際會館 芃華廳',
    mapUrl: 'https://www.google.com/maps/place/%E8%8A%83%E8%8F%AF%E5%9C%8B%E9%9A%9B%E9%A4%90%E9%A3%B2%E6%96%87%E5%8C%96%E6%9C%83%E9%A4%A8/@24.8638105,121.0230778,17z/data=!3m1!4b1!4m6!3m5!1s0x3468312f6fd9ae3f:0x3ae39ef38d550726!8m2!3d24.8638105!4d121.0256527!16s%2Fg%2F1pzpkkj5w?authuser=0&entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D' // 換成你的地圖連結
  });
  
  // 表單相關狀態
  const formSubmitted = ref(false);
  // 停資資訊狀態
  const parkState = ref(false);
  
  // --- 事件處理函式 ---
  // 當 RsvpForm 組件觸發 'submit-rsvp' 事件時，這個函式會被呼叫
  // 參數 formData 就是從子組件傳來的 rsvp 物件
  const  handleRsvpSubmit = async  (formData) => {
    console.log('從子組件收到的表單資料：', formData.attending);
    const name = formData.name;
    const data = {
      "attend":formData.attending,
      "count":formData.guests,
      "countv":formData.guests_v,
      "type":formData.type,
      "mes":formData.message
    }
    const result = await returnMsg(name,data);
    if(!result.success){
      console.log(result)
      alert("填報出錯，請重新嘗試，或是聯絡新人，謝謝。");
      return
    }
    // 處理完畢後，更新狀態，讓 RsvpForm 顯示感謝訊息
    formSubmitted.value = true;
  };
  // 顯示停車資訊
  const handlePark = ()=>{
    parkState.value = !parkState.value
  }
  </script>