<template>
  <main>
    <h1>Список категорий</h1>
    <ul>
      <li v-for="category in categories" :key="category.h1">
        <nuxt-link :to="`/page/${category.url}`">{{ category.h1 }}</nuxt-link>
        <ListPages v-if="category.pages" />
        <button @click="deleteCategory(category.url)">X</button>
      </li>
    </ul>
  </main>
</template>

<script>
import ListPages from "~/components/ListPages";

export default {
  async asyncData({ $axios }) {
    // Получаем список категорий
    const { data } = await $axios.get(`/api/category/`);
    console.log("data=", data);

    let datacat = data.map((cat, i) => {

      const {allpages} = $axios.get(`/api/page/category/${cat._id}`);
      console.log("allpages =", allpages);
      return {
        ...cat,
        pages: allpages,
      };
    });
    console.log("categories =", datacat);

    return { categories: datacat };
  },
  data: () => ({
    pages: [],
    categories: [],
  }),

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
  methods: {
    async getDataPages(id) {
      let dataPages;
      $axios
        .get(`/api/page/category/${id}`)
        .then((response) => {
          dataPages = response.data;
        })
        .catch(function (e) {
          this.error = e;
        });
      return dataPages;
    },
    deleteCategory(urlCategory) {
      // При удалении категории также используем текущий URL, а не изменяемый URL в форме.
      console.log(urlCategory);
      this.$axios
        .delete(`/api/category/${urlCategory}`)
        .then(() => {
          console.log("удаление", this.$router.path);
          setTimeout(() => {
            this.$router.push(`/category/`);
            console.log("___", this.$router.path);
          }, 500);
        })
        .catch((err) => console.log(err.response.data.message));
    },
  },
  components: {
    ListPages,
  },
};
</script>