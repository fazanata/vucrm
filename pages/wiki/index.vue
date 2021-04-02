<template>
  <main>
    <h1>Список категорий</h1>
    <ul>
      <li v-for="category in categories" :key="category.h1">
        <nuxt-link :to="`/page/${category.url}`">{{ category.h1 }}</nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // Получаем список категорий
    const { data } = await $axios.get(`/api/category/`);
    return { categories: data };
  },

  head() {
    let title = "Список категорий";
    let description = "Список категорий сайта";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },
};
</script>