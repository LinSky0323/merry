<template>
    <section class="p-8">
      <h2 class="text-3xl font-serif text-center text-gray-800 mb-6">線上回覆</h2>
      
      <!-- 根據父組件傳來的 isSubmitted 狀態，顯示感謝訊息 -->
      <div v-if="isSubmitted" class="text-center p-8 bg-green-100 text-green-800 rounded-lg">
        <h3 class="text-2xl font-semibold mb-2">感謝您的回覆！</h3>
        <p v-if="rsvp.name === '羅苡菱'">恭喜您成為第38個填表人，您將獲得神秘小禮物！<br>請於當日早上8:30至新娘家領取，謝謝。</p>
        <p v-else-if="rsvp.attending === '1'">期待您的蒞臨！您紅包的厚度決定我嘴角上揚的角度！</p>
        <p v-else-if="rsvp.attending === '0'">很遺憾你錯過了一場盛世派對......QQ</p>
        <p v-else>求求您喬出時間來與我們狂歡，我9月25日前會再跟您做確認。</p>
      </div>
  
      <!-- 否則，顯示表單 -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6 max-w-lg mx-auto">
        <!-- 表單欄位... -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
          <div class="mt-1">
            <input 
              type="text" 
              id="name" 
              v-model="rsvp.name" 
              required 
              class="block w-full rounded-md shadow-sm 
                    border-2 border-gray-300 /* <-- 修改這裡 */
                    focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
              placeholder="請輸入您的大名,拜託寫全名  "
            >
          </div>
        </div>

        <div>
          <div>
            <div class="flex mb-1">
            <input id="attending-1" 
                  type="radio" 
                  value="1"
                  v-model="rsvp.attending"
                  class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ml-3">
            <label for="attending-1" class="ml-1 block text-sm font-medium text-gray-700">
              是的，我會參加！
            </label>
            </div>
            <div class="flex mb-1">
            <input id="attending-0" 
             type="radio" 
             value="0"
             v-model="rsvp.attending"
             class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ml-3">
            <label for="attending-0" class="ml-1 block text-sm font-medium text-gray-700">
              抱歉，無法參加！
            </label>
            </div>
            <div class="flex mb-1">
             <input id="attending-2" 
             type="radio" 
             value="2"
             v-model="rsvp.attending"
             class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ml-3">
            <label for="attending-0" class="ml-1 block text-sm font-medium text-gray-700">
              哎呀，不確定ㄟ！
            </label>
            </div>
          </div>
        </div>

        <div>
          <h3 class="block text-sm font-medium text-gray-700 mb-2">請問您是哪方的親友</h3>
            <div class="flex mb-1">
            <input id="attending-1" 
                  type="radio" 
                  value="1"
                  v-model="rsvp.type"
                  class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ml-3">
            <label for="attending-1" class="ml-1 block text-sm font-medium text-gray-700">
              男方
            </label>
            <input id="attending-0" 
             type="radio" 
             value="0"
             v-model="rsvp.type"
             class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ml-3">
            <label for="attending-0" class="ml-1 block text-sm font-medium text-gray-700">
              女方
            </label>
            </div>
        </div>

        <div class="flex ">
          <div v-if="rsvp.attending === '1'">
            <label for="guests" class="block text-sm  font-medium text-gray-700">包含您共有幾位？</label>
            <input type="number" id="guests" v-model.number="rsvp.guests" min="1" required class="block px-1 w-full rounded-md shadow-sm 
                      border-2 border-gray-300 /* <-- 修改這裡 */
                      focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm">
          </div>
          <div v-if="rsvp.attending === '1'" class="ml-12">
            <label for="guests_v" class="block text-sm font-medium text-gray-700">其中有幾位吃素？</label>
            <input type="number" id="guests_v" v-model.number="rsvp.guests_v" min="0" class="block px-1 w-full rounded-md shadow-sm 
                      border-2 border-gray-300 /* <-- 修改這裡 */
                      focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm">
          </div>
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">想給我們的話 (選填)</label>
          <textarea id="message" v-model="rsvp.message" rows="4" class="block w-full rounded-md shadow-sm 
                    border-2 border-gray-300 /* <-- 修改這裡 */
                    focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"></textarea>
        </div>
        <div class=" flex justify-center">
          <button type="submit" class=" flex justify-center             bg-pink-500           <!-- 背景色：粉紅色 -->
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
            ease-in-out           <!-- 過渡曲線：緩進緩出 -->">
            送出回覆
          </button>
        </div>
      </form>
    </section>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  // 接收來自父組件的 prop，決定是否顯示表單
  defineProps({
    isSubmitted: {
      type: Boolean,
      required: true
    }
  });
  
  // 定義此組件可以觸發的事件，名稱為 'submit-rsvp'
  // 當表單提交時，我們會用這個事件通知父組件
  const emit = defineEmits(['submit-rsvp']);
  
  // 使用 reactive 來管理表單的資料
  const rsvp = reactive({
    name: '',
    attending: '1',
    type:'',
    guests: null,
    guests_v: 0,
    message: ''
  });
  
  // 表單提交時的處理函式
  const handleSubmit = () => {
    // 觸發 'submit-rsvp' 事件，並將 rsvp 物件作為參數傳遞給父組件
    if(!rsvp.type){
      alert('請幫我填入您是哪方親友，方便新人統計，謝謝')
      return;
    }
    emit('submit-rsvp', rsvp);
    // 在這裡，子組件的工作就完成了。
    // 它不需要知道後續如何處理這些資料（例如發送到後端），
    // 這些都交給父組件決定。
  };
  </script>