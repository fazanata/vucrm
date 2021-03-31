<template>
    <div>
        1233455
    </div>
</template>

<script>

export default {
    head() {
        return {
            link:[
                {rel: "canonical", href: `http://localhost:3000${this.$route.path}`}
            ],
            title: "текстовый тайтл",
            meta: [
                {hid: "description", name: "dewscription", content: "текстовый декс"},
                {hid: "robots", name: "robots", content: "noindex, nofollow"}
            ]
        }
    },
    mounted: function () {
        console.log(this.$route.path)
    }
}
</script>
