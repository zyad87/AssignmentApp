<template>
    <div>
        <div class="container mx-auto ">
            <transition name="fade">
                <div v-if="successMessage"
                    class="fixed top-4 right-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg z-50">
                    {{ successMessage }}
                </div>
            </transition>

            <SkeletonCard v-if="isSaving || !person" />
            <div v-if="error" class="text-center text-red-500">
                <p>{{ error }}</p>
            </div>

            <PersonDetailsCard v-if="!isLoading && person && !isSaving" :person="person" @edit="openEditModal" />

            <div v-if="showEditModal"
                class="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Edit Person</h2>
                    <form @submit.prevent="handleEdit">
                        <div class="mb-4">
                            <label class="block text-gray-600 mb-1">Name</label>
                            <input v-model="editForm.name" type="text" class="w-full px-4 py-2 border rounded-lg" />
                            <p class="text-red-500 text-sm mt-1">{{ formErrors.name }}</p>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-600 mb-1">Email</label>
                            <input v-model="editForm.email" type="email" class="w-full px-4 py-2 border rounded-lg" />
                            <p class="text-red-500 text-sm mt-1">{{ formErrors.email }}</p>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-600 mb-1">Date of Birth</label>
                            <flat-pickr v-model="editForm.dob" class="w-full px-4 py-2 border rounded-lg"
                                :config="dateConfig" />
                            <p class="text-red-500 text-sm mt-1">{{ formErrors.dob }}</p>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-600 mb-1">Country</label>
                            <select v-model="editForm.country" class="w-full px-4 py-2 border rounded-lg">
                                <option disabled value="">Select a country</option>
                                <option v-for="country in countries" :key="country.code" :value="country.name">
                                    {{ country.name }}
                                </option>
                            </select>
                            <p class="text-red-500 text-sm mt-1">{{ formErrors.country }}</p>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-600 mb-1">Avatar URL</label>
                            <input v-model="editForm.avatar" type="url" class="w-full px-4 py-2 border rounded-lg" />
                            <p class="text-red-500 text-sm mt-1">{{ formErrors.avatar }}</p>
                        </div>

                        <div class="flex justify-end gap-2">
                            <button type="button" class="px-4 py-2 bg-gray-300 rounded-lg" @click="closeEditModal">
                                Cancel
                            </button>
                            <button type="submit"
                                class=" bg-blue-700 text-blue-100 px-4 py-3  shadow-lg hover:bg-blue-800 transition rounded-lg flex items-center justify-center"
                                :disabled="isSaving">
                                <span v-if="!isSaving">Save</span>
                                <span v-else>
                                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SkeletonCard from "./UI/Cards/SkeletonCard.vue";
import PersonDetailsCard from "./UI/Cards/PersonDetailsCard.vue";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { getPersonById, editPerson } from "../services/api";
import { validateName, validateEmail } from "../utils/validationUtils";
import { validateDateOfBirth } from "../utils/dateUtils";
import { countries } from "../utils/countries";
export default {
    components: {
        SkeletonCard,
        PersonDetailsCard,
        FlatPickr,
    },
    data() {
        return {
            person: null,
            isLoading: true,
            isSaving: false,
            successMessage: null,
            error: null,
            showEditModal: false,
            editForm: {},
            formErrors: {},
            dateConfig: {
                dateFormat: "Y-m-d",
                locale: "en",
            },
            countries,
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.fetchPersonDetails();
    },
    methods: {
        async fetchPersonDetails() {
            try {
                this.isLoading = true;
                const response = await getPersonById(this.id);
                this.person = response.data;
            } catch (err) {
                this.error = "Failed to load person details. Please try again.";
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },


        validateStep() {
            this.formErrors = { name: null, email: null, dob: null, country: null, avatar: null }; // إعادة ضبط الأخطاء
            let isValid = true;

            const nameError = validateName(this.editForm.name);
            if (nameError) {
                this.formErrors.name = nameError;
                isValid = false;
            }

            const emailError = validateEmail(this.editForm.email);
            if (emailError) {
                this.formErrors.email = emailError;
                isValid = false;
            }

            const dobError = validateDateOfBirth(this.editForm.dob);
            if (dobError) {
                this.formErrors.dob = dobError;
                isValid = false;
            }

            if (!this.editForm.country) {
                this.formErrors.country = "Country is required.";
                isValid = false;
            }

            if (!this.editForm.avatar) {
                this.formErrors.avatar = "Avatar URL is required.";
                isValid = false;
            }

            return isValid;
        },

        openEditModal() {
            this.showEditModal = true;
            this.editForm = { ...this.person };
        },
        closeEditModal() {
            this.showEditModal = false;
        },
        async handleEdit() {
            if (!this.validateStep()) {
                return;
            }

            this.isSaving = true;
            try {
                const response = await editPerson(this.person.id, this.editForm);

                this.closeEditModal();

                setTimeout(() => {
                    this.person = null;
                }, 100);

                setTimeout(() => {
                    this.person = { ...response.data };
                    this.isSaving = false;
                    this.successMessage = "Details updated successfully!";

                    setTimeout(() => {
                        this.successMessage = null;
                    }, 3000);
                }, 600);
            } catch (err) {
                console.error("Failed to edit person:", err);
                this.error = "Failed to edit person. Please try again.";
                this.isSaving = false;
            }
        },
    },
};
</script>

<style scoped>
.bg-black {
    transition: background-color 0.3s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>