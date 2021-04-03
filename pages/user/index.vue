<template>
    <div class="main">
        <h1>Список пользователей</h1>
        <div v-for="user in users" :key="user._id">
                <nuxt-link :to="`/user/edit/${user._id}`">{{ user.name}} - {{ user.login}} - {{ user.role}} </nuxt-link>
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
        const {data} = await axios.get(`${process.env.baseUrl}/api/user`)
        return { users: data}
    }
}
</script>
<style scoped>
.main {
    padding: 16px;
}
</style>
