<template>
  <div class="form">
    <div class="form-element">
      <label for="url">Адрес категории URL</label>
      <input type="text" v-model="url" id="url" />
    </div>
    <div class="form-element">
      <label for="h1">Заголовок H1</label>
      <input type="text" v-model="h1" id="h1" />
    </div>
    <div class="form-element">
      <label for="title">Title категории</label>
      <input type="text" v-model="title" id="title" />
    </div>
    <div class="form-element">
      <label for="description">Мета-тег Description</label>
      <input type="description" v-model="description" id="description" />
    </div>
    <div class="form-element">
      <label for="content">Контент категории</label>
      <textarea v-model="content" id="content" rows="4"></textarea>
    </div>

    <button @click="createCategory">Создать</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    h1: "",
    title: "",
    description: "",
    url: "",
    content: "",
  }),

  methods: {
    createCategory() {
      let formData = {
        h1: this.h1,
        title: this.title,
        description: this.description,
        url: this.url,
        content: this.content
      };
      axios.post(`${process.env.baseUrl}/api/category`, formData).then(
        setTimeout(() => {
          this.$router.push(`/category/`);
        }, 500)
      );
    },
  },
};
</script>

<style>
.form {
  width: 600px;
  margin: 0 auto;
}

.form-element {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.form-element input,
.form-element textarea {
  margin-top: 4px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>


