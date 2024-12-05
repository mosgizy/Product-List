<script setup>
import { onMounted, ref, computed } from "vue";
import CartItem from "./components/CartItem.vue";
import Modal from "./components/Modal.vue";

const products = ref([]);
const errorRef = ref("");
const cartItems = ref([]);
const modalRef = ref(false);
const status = ref({ status: false });

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    products.value = data;
  } catch (error) {
    errorRef.value = error.message;
    console.error(error);
  }
};

const totalNumberOfItemsInCart = computed(() =>
  cartItems.value.reduce((total, item) => total + item.numberOfItems, 0)
);

const totalPriceOfItemsInCart = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.data.price * item.numberOfItems,
    0
  )
);

const toggleModal = () => (modalRef.value = !modalRef.value);

const removeItemFromCart = (productId) => {
  const updatedCartItems = cartItems.value.filter(
    (item) => item.data.id !== productId
  );
  cartItems.value = updatedCartItems;
};

const startNewOrder = () => {
  toggleModal();
  cartItems.value = [];
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <main class=" bg-secondary-100 px-16 py-24 flex gap-8">
    <section class="flex-1 w-64">
      <h1 class="text-3xl font-bold mb-10">Desserts</h1>
      <section class="grid grid-cols-3 gap-4">
        <CartItem
          v-for="product in products"
          :key="product.id"
          :data='product'
          :cartItems='cartItems'
          :status='status'
        />
      </section>
    </section>
    <aside class="bg-white max-h-max max-w-[40ch] px-6 py-8 flex-1">
      <h2 class="text-primary-100 text-xl font-semibold">Your Cart ({{totalNumberOfItemsInCart}})</h2>
      <div
        v-if="cartItems.length < 1"
        class="flex flex-col items-center mt-8"
      >
        <img
          src="/images/illustration-empty-cart.svg"
          alt="empty cart"
        >
        <p class="text-center text-sm text-secondary-400 font-semibold mt-2">Your added items will appear here</p>
      </div>
      <div v-if="totalNumberOfItemsInCart > 0">
        <div
          v-for="item in cartItems"
          :key="item.data.id"
          class="flex items-center justify-between mt-6"
        >
          <div>
            <h3 class="text-sm text-secondary-600 font-semibold pb-2">{{item.data.name}}</h3>
            <div class="flex items-center gap-3 text-sm font-semibold">
              <span class="text-primary-100">{{item.numberOfItems}}x</span>
              <span class="text-secondary-400">@ ${{item.data.price}}</span>
              <span class="text-secondary-500">${{item.numberOfItems * item.data.price}}</span>
            </div>
          </div>
          <button
            @click="removeItemFromCart(item.data.id)"
            class="border border-secondary-300 rounded-full w-4 h-4 grid place-items-center"
          >
            <img
              src="/images/icon-remove-item.svg"
              alt=""
            >
          </button>
        </div>
        <div class="flex justify-between items-center my-5 pt-5 border-t border-secondary-200">
          <div class="text-secondary-500 text-sm">Order Total</div>
          <h2 class="text-2xl font-bold">${{totalPriceOfItemsInCart}}</h2>
        </div>
        <div class="bg-secondary-200/80 px-6 py-4 rounded-3xl flex justify-center gap-2">
          <img
            src="/images/icon-carbon-neutral.svg"
            alt="carbon"
          >
          <div class="text-sm text-secondary-600">This is a <span class="font-bold">Carbon-neutral</span> delivery</div>
        </div>
        <button
          @click="toggleModal"
          class="rounded-3xl bg-primary-100 hover:bg-secondary-500 transition-all text-white text-sm font-semibold mt-8 px-6 py-3 w-full"
        >
          Confirm Order
        </button>
      </div>
    </aside>

    <!-- Modal -->
    <Modal
      v-if="modalRef"
      :cartItems='cartItems'
      :startNewOrder='startNewOrder'
      :totalPrice="totalPriceOfItemsInCart"
    />
  </main>
</template>

<style scoped>
</style>
