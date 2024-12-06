<script setup>
defineProps(["cartItems", "startNewOrder", "totalPrice", "toggleModal"]);
</script>

<template>
  <div
    @click.self='toggleModal'
    class="fixed inset-0 bg-black/30 grid place-items-center"
  >
    <div class="bg-white rounded-2xl px-6 py-8 min-w-[50ch]">
      <img
        src="/images/icon-order-confirmed.svg"
        alt="confirmed"
      >

      <div class="my-8">
        <h2 class="text-3xl font-bold">Order Confirmed</h2>
        <p class="text-sm text-secondary-400 font-semibold pt-2">We hope you enjoy your food!</p>
      </div>
      <div class="px-5 py-6 bg-secondary-200 rounded-lg">
        <div class="flex flex-col gap-4">
          <div
            v-for="item in cartItems"
            :key="item.data.id"
            class="flex items-center justify-between border-b border-secondary-300/20 pb-4"
          >
            <div class="flex gap-3">
              <img
                :src="item.data.image.thumbnail"
                alt=""
                class="w-14"
              >
              <div class="flex flex-col justify-between font-semibold">
                <h3 class="text-sm text-secondary-600 font-semibold pb-2">{{item.data.name}}</h3>
                <div class="text-sm flex gap-4">
                  <span class="text-primary-100">{{item.numberOfItems}}x</span>
                  <span class="text-secondary-500">${{item.numberOfItems * item.data.price}}</span>
                </div>
              </div>
            </div>
            <p class="text-secondary-500 font-semibold">${{item.numberOfItems * item.data.price}}</p>
          </div>
        </div>
        <div class="flex justify-between items-center pt-6">
          <div class="text-secondary-500 text-sm font-medium">Order Total</div>
          <h2 class="text-2xl font-bold">${{totalPrice}}</h2>
        </div>
      </div>
      <button
        @click.prevent="startNewOrder"
        class="rounded-3xl bg-primary-100 hover:bg-secondary-500 transition-all text-white text-sm font-semibold mt-8 px-6 py-3 w-full"
      >
        Start New Order
      </button>
    </div>
  </div>
</template>