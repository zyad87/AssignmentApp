<template>
    <div
        class="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 text-center px-6">
        <h1 class="text-9xl font-extrabold text-blue-500 drop-shadow-md mb-6">404</h1>
        <p class="text-2xl text-gray-800 font-semibold mb-4">
            Page Not Found
        </p>
        <p class="text-lg text-gray-600 mb-8">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <router-link to="/"
            class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200">
            Back to Home
        </router-link>

        <div class="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div class="absolute bottom-16 right-16 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped>
.bg-gradient-to-br {
    background: linear-gradient(to bottom right, #f8fafc, #e5e7eb);
}

.blur-2xl {
    filter: blur(20px);
}

.blur-3xl {
    filter: blur(30px);
}
</style>