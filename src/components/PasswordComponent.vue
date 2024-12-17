<template>
  <div
    class="w-[12rem] sm:w-[20rem] h-[122px] bg-white items-center justify-center flex"
  >
    <div
      class="min-h-[128px] p-2 font-medium font-mono bg-white w-[11rem] sm:w-[19.1875rem]"
    >
      <div>
        <!-- Use normal text container without v-html -->
        <p ref="textContainer" style="word-break: break-all"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";

const props = defineProps({
  emailOrPhone: {
    required: true,
  },
});

const textContainer = ref(null);
let index = 0;
const delay = 50;

// Function for typewriter animation
const typeWriter = (sentence) => {
  if (index < sentence.length) {
    const letter = sentence.charAt(index);
    const span = document.createElement("span");
    span.innerHTML = letter === " " ? "&nbsp;" : letter; // Preserve spaces

    // Append the letter (or space) into the text container
    textContainer.value.appendChild(span);
    index++;

    setTimeout(() => typeWriter(sentence), delay); // Continue to next letter
  }
};

// Update the display text
const updateText = (sentence) => {
  textContainer.value.innerHTML = ""; // Reset text container
  index = 0;
  typeWriter(sentence); // Start the typewriter animation
};

// Watch for changes in the prop and update the text
watch(
  () => props.emailOrPhone,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      const sentence = `> Enter the authentication code displayed in your Authenticator app or your Email!`;
      updateText(sentence);
    }
  }
);

onMounted(() => {
  const initialSentence = `> Enter the authentication code displayed in your Authenticator app or your Email!`;
  updateText(initialSentence);
});
</script>

<style scoped>
/* Applying the same color to all text */
span {
  color: #10b981; /* Tailwind green color */
  font-weight: 600;
}
</style>
