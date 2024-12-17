<template>
  <div
    class="w-[12rem] sm:w-[20rem] h-[122px] bg-white items-center justify-center flex"
  >
    <div
      class="min-h-[128px] p-2 font-medium font-mono bg-white w-[11rem] sm:w-[19.1875rem]"
    >
      <p ref="animatedTextRef"></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Full text with email and password wrapped in <span> for green styling
const fullText =
  "> Alrighttt... First I need your <span class='text-green-600 font-semibold'>email</span> and <span class='text-green-600 font-semibold'>password</span>!";
const animatedTextRef = ref(null);

let currentIndex = 0;

const animateText = () => {
  if (currentIndex <= fullText.length) {
    // Slice the current content
    const partialText = fullText.substring(0, currentIndex);
    // Insert partial content while keeping HTML tags rendered properly
    animatedTextRef.value.innerHTML = partialText;
    currentIndex++;
  } else {
    clearInterval(animationInterval); // Stop when text finishes
  }
};

let animationInterval;

onMounted(() => {
  animationInterval = setInterval(animateText, 25); // Animation speed in ms
});
</script>

<style scoped>
.text-green-600 {
  color: #10b981; /* Tailwind's green color */
}
</style>
