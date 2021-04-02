<template>
    <div class="main">
        <h1>Список заявок</h1>
        <div v-for="request in requests" :key="request._id">
                <nuxt-link :to="`/request/edit/${request._id}`">{{ request.name}} - {{ request.adres}} - {{ request.mobile}} </nuxt-link>
        </div>
       
    </div>
</template>

<script>
import axios from "axios";

export default {
    head() {
        return {
            title: "sdsd",
            meta: [
                {hid: "description", name: "description", content: "sdsdf"}
            ]
        }
    },
    async asyncData() {
        const {data} = await axios.get(`${process.env.baseUrl}/api/request`)
        return { requests: data}
    }
}
</script>
<style scoped>
.main {
    padding: 16px;
}
</style>
