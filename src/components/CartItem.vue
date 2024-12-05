// current issue is how to reset the number items when 
// an item is deleted from cart, or when all items are
// are removed from the cart

// my idea is to find a way to trigger the this component 
// to be aware that an item has been removed or all items 
// has been removed


<script setup>
import addToCart from "/images/icon-add-to-cart.svg";
import { ref, computed } from "vue";

const product = defineProps(["data", "cartItems", "status"]);
const inCart = ref(false);

const numberOfItems = ref(0);

const addCartItems = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/products/" + id);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    product.cartItems.push({ data, numberOfItems: 1 });
  } catch (error) {
    console.error(error);
  }
};

const handleAddToCart = computed(() => {
  inCart.value = true;
  numberOfItems.value++;
  addCartItems(product.data.id);
});

const handleDecrement = computed(() => {
  if (numberOfItems.value > 0) {
    numberOfItems.value--;
  }
  if (numberOfItems.value === 0) {
    inCart.value = false;
    product.cartItems.pop();
  }
});

const handleIncreement = computed(() => {
  numberOfItems.value++;
  product.cartItems.map((item, index) => {
    if (item.data.id === product.data.id) {
      item[index] = item.numberOfItems++;
    }
    return item;
  });
});
</script>

<template>
  <div>
    <div class="relative max-w-max">
      <img
        :src="data.image.desktop"
        :alt="data.name"
        class="rounded-lg"
        lazy
      />
      <div
        v-if="inCart"
        class="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary-100 font-bold text-sm text-white flex items-center justify-center gap-10 rounded-full border border-secondary-400 py-2 px-3"
      >
        <button
          @click="handleDecrement"
          class="border border-white rounded-full w-4 h-4 grid place-items-center"
        >
          <img
            src="/images/icon-decrement-quantity.svg"
            alt="decrement"
          >
        </button>
        <span>{{numberOfItems}}</span>
        <button
          @click="handleIncreement"
          class="border border-white rounded-full w-4 h-4 grid place-items-center"
        >
          <img
            src="/images/icon-increment-quantity.svg"
            alt=""
          >
        </button>
      </div>
      <button
        v-if="!inCart"
        @click="handleAddToCart"
        class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-secondary-600 hover:text-primary-100 flex justify-center gap-2 max-w-max rounded-full border border-secondary-400 hover:border-primary-100 py-3 px-5 transition-all"
      >
        <img
          :src="addToCart"
          alt="cart"
          class="w-4"
        >
        <span class="font-bold text-xs">Add to Cart</span>
      </button>
    </div>
    <div class="mt-10">
      <div class="text-secondary-300 text-sm font-semibold">{{data.category}}</div>
      <p class="font-semibold text-secondary-600 py-1">{{data.name}}</p>
      <div class="text-primary-100 font-semibold">${{data.price}}</div>
    </div>
  </div>
</template>

<style>
</style>