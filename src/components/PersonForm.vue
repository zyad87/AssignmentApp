<template>
<div class="flex justify-center items-center h-screen bg-gray-50 overflow-hidden mx-1">
    <div class="max-w-lg w-full bg-white shadow-xl rounded-lg p-6">
        <h1 v-if="!feedbackMessage" class="text-2xl font-bold mb-6 text-center">Create Person</h1>
  
        <ProgressBar v-if="!feedbackMessage" :steps="steps" :currentStep="currentStep" />

  
        <h2 v-if="!feedbackMessage" class="text-xl font-semibold text-center mb-4">{{ currentStepLabel }}</h2>
  
        <div v-if="!feedbackMessage">
  <div v-if="currentStep === 1">
    <div class="form-control mb-4">
      <label for="name" class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        placeholder="Enter name"
        class="input input-bordered w-full"
      />
      <ErrorMessage :message="formErrors.name" />
    </div>
    <div class="form-control mb-4">
      <label for="email" class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        placeholder="Enter email"
        class="input input-bordered w-full"
      />
      <ErrorMessage :message="formErrors.email" />
    </div>
  </div>

  <div v-if="currentStep === 2">
    <div class="form-control mb-4">
      <label for="dob" class="label">
        <span class="label-text">Date of Birth</span>
      </label>
      <div class="relative">
        <flat-pickr
          id="dob"
          v-model="formData.dob"
          class="input input-bordered w-full pl-10"
          :config="dateConfig"
        />
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="fas fa-calendar text-gray-400 hidden md:block lg:block sm:hidden"></i>
        </span>
      </div>
      <ErrorMessage :message="formErrors.dob" />
    </div>
    <div class="form-control mb-4">
      <label for="country" class="label">
        <span class="label-text">Country</span>
      </label>
      <Multiselect
        v-model="formData.country"
        :options="countries.map((country) => country.name)"
        placeholder="Select a Country"
        class="select-bordered w-full"
      />
      <ErrorMessage :message="formErrors.country" />
    </div>
  </div>

  <div v-if="currentStep === 3">
    <div class="form-control mb-4">
      <div class="flex justify-center">
        <img
          :src="avatarPreview"
          alt="Avatar Preview"
          class="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <label for="avatar" class="label">
        <span class="label-text">Avatar URL</span>
      </label>
      <input
        id="avatar"
        v-model="formData.avatar"
        type="text"
        placeholder="Enter avatar URL"
        class="input input-bordered w-full"
        @input="updateAvatarPreview"
      />
      <p class="text-gray-500 text-sm mt-1">
        If no avatar URL is provided, an avatar will be generated from the name.
      </p>
    </div>
  </div>
</div>

  
        <div v-if="!feedbackMessage" class="flex justify-between mt-6">
            <button
  type="button"
  @click="handlePrevious"
  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
  :disabled="isLoading"
>
  {{ currentStep === 1 ? "Home" : "Previous" }}
</button>

<button
  v-if="currentStep < steps.length"
  type="button"
  @click="nextStep"
  class="bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition"
>
  Next
</button>

<button
  v-else
  type="button"
  @click="handleSubmit"
  class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
>
  Submit
</button>

        </div>
  
<div v-if="feedbackMessage" class="mt-6 text-center">
  <div class="flex justify-center items-center">
    <div v-if="isLoading" class="flex flex-col items-center">
      <div class="custom-loader"></div>
      <p class="text-blue-500 font-semibold text-lg mt-2">Processing...</p>
    </div>

    <div v-else class="text-green-500 flex flex-col items-center">
      <i class="fas fa-check-circle text-4xl"></i>
      <p class="text-green-600 font-bold text-lg mt-2">Success!</p>
    </div>
  </div>

  <p class="mt-4 text-gray-700 text-md">{{ feedbackMessage }}</p>
</div>

      </div>
    </div>
  </template>
  

  <script>
    import "@vueform/multiselect/themes/default.css";
    import 'flatpickr/dist/flatpickr.css';
  import FlatPickr from 'vue-flatpickr-component';
  import Multiselect from "@vueform/multiselect";
  import ProgressBar from "./UI/Loaders/ProgressBar.vue";
  import ErrorMessage from "./UI/ErrorMessage.vue";
  import { validateName, validateEmail } from "../utils/validationUtils";
  import { validateDateOfBirth } from "../utils/dateUtils";
  import { countries } from "../utils/countries";
  import { addPerson } from "../services/api.js";

export default {
  components: {
    FlatPickr,
    Multiselect,
    ErrorMessage,
    ProgressBar,
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        dob: "",
        country: "",
        avatar: "",
      },
      formErrors: {
        name: null,
        email: null,
        dob: null,
        country: null,
      },
      currentStep: 1,
      steps: [
        { id: 1, label: "Basic Info" },
        { id: 2, label: "Personal Details" },
        { id: 3, label: "Avatar" },
      ],
      avatarPreview: "",
      feedbackMessage: "",
      isLoading: false,
    countries,
      dateConfig: {
        dateFormat: "Y-m-d",
        locale: "en",
      },
    };
  },
  computed: {
    currentStepLabel() {
      return this.steps.find((step) => step.id === this.currentStep).label;
    },
  },
  methods: {

validateStep() {
  this.formErrors = { name: null, email: null, dob: null, country: null }; 
  let isValid = true;

  if (this.currentStep === 1) {
    const nameError = validateName(this.formData.name);
    if (nameError) {
      this.formErrors.name = nameError;
      isValid = false;
    }

    const emailError = validateEmail(this.formData.email);
    if (emailError) {
      this.formErrors.email = emailError;
      isValid = false;
    }
  } else if (this.currentStep === 2) {
    const dobError = validateDateOfBirth(this.formData.dob);
    if (dobError) {
      this.formErrors.dob = dobError;
      isValid = false;
    }

    if (!this.formData.country) {
      this.formErrors.country = "Country is required.";
      isValid = false;
    }
  }

  return isValid;
},


    nextStep() {
      if (this.validateStep()) {
        this.currentStep++;
        if (this.currentStep === 3) {
          this.updateAvatarPreview();
        }
      }
    },
    handlePrevious() {
    if (this.currentStep === 1) {
      this.$router.push("/");
    } else {
      this.prevStep();
    }
  },
  prevStep() {
    this.currentStep--;
  },
    updateAvatarPreview() {
      this.avatarPreview = this.formData.avatar
        ? this.formData.avatar
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            this.formData.name || "Default User"
          )}`;
    },
    async handleSubmit() {
  if (!this.formData.avatar) {
    this.formData.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      this.formData.name || "Default User"
    )}`;
  }

  this.feedbackMessage = "Adding person...";
  this.isLoading = true;

  try {
    const response = await addPerson(this.formData);
    console.log("Person added successfully:", response.data);

    this.feedbackMessage = "Person added successfully!";
    
    setTimeout(() => {
      this.feedbackMessage = "";
      this.formData = {
        name: "",
        email: "",
        dob: "",
        country: "",
        avatar: "",
      };
      this.avatarPreview = "";
      this.currentStep = 1;
      this.$router.push("/persons");
    }, 2000);
  } catch (error) {
    console.error("Error adding person:", error);
    this.feedbackMessage = "Failed to add person. Please try again.";
  } finally {
    this.isLoading = false;
  }
},

  },
};

  </script>
  <style>
  .multiselect {
    box-shadow: none !important;
    background-color: white !important;
    border: 1px solid #d1d5db !important; 
    border-radius: 0.375rem !important; 
  }
  .flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange {
  background: #26c08e;
  border-color: #26c08e;
}

.custom-loader {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.success-icon {
  position: relative;
  width: 50px;
  height: 50px;
}

.success-icon .circle {
  width: 50px;
  height: 50px;
  background-color: #3b82f6;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
}

.success-icon .check {
  width: 15px;
  height: 30px;
  border: 4px solid #3b82f6;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  position: absolute;
  top: 12px;
  left: 18px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
  </style>