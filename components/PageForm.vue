<template>
  <div class="form">
    <div class="form-element">
      <label for="url">Адрес страницы URL</label>
      <input type="text" v-model="page.url" id="url" />
    </div>
    <div class="form-element">
      <label for="h1">Заголовок H1</label>
      <input type="text" v-model="page.h1" id="h1" />
    </div>
    <div class="form-element">
      <label for="title">Title страницы</label>
      <input type="text" v-model="page.title" id="title" />
    </div>
    <div>
      <label for="category">Категория</label>
      <multiselect
        v-model="page.category"
        id="category"
        :options="categoryListOptions"
        :multiple="false"
        placeholder="Выберите категорию"
        label="title"
        track-by="_id"
        selectLabel="Выбрать"
        deselectLabel="Убрать"
        selectedLabel="Выбрано"
      >
      </multiselect>
    </div>
    <div class="form-element">
      <label for="description">Мета-тег Description</label>
      <input type="description" v-model="page.description" id="description" />
    </div>
    <div class="form-element">
      <label for="content">Контент страницы</label>
      <textarea v-model="page.content" id="content" rows="4"></textarea>
    </div>

    <button v-if="this.action === 'create'" @click="createPage">Создать страницу</button>
    <button v-if="this.action === 'update'" @click="updatePage">Обновить страницу</button>
    <button v-if="this.action === 'update'" @click="deletePage">Удалить страницу</button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  // Это переиспользуемый компонент с формой для создания/редактирования/удаления страницы.
  // В зависимости от поступаемых пропсов меняется отображение кнопок.
  // Если компонент используется для редактирования текущей страницы, то в него передаются её данные.
  props: { page: { type: Object, default: () => ({}) }, action: { type: String } },

  // Нам потребуется текущий URL страницы, которые не будет связан с input формы.

  data() {
    return {
      currentUrl: "",
      currentCategory: "",
      categoryListOptions: [],
    };
  },
  async fetch() {
    const category = await fetch(`${process.env.baseUrl}/api/category`).then((res) => res.json());

    this.categoryListOptions = category;
    console.log('this.cat=',this.categoryListOptions )
  },
  // call fetch only on client-side
  fetchOnServer: false,
  methods: {
    createPage() {
      console.log('create page =', this.page)
      // Создаём новую страницу.
      this.$axios
        .post(`/api/page`, this.page)
        .then(() => {
          // После успешного создания новой страницы происходит перенаправление на неё.
          this.$router.push(`/page/${this.page.url}`);
        })
        .catch((err) => {
          // Если страница не создана, то в консоль выводим ошибку из бэкенда.
          console.log(err.response.data.message);
        });
    },
    updatePage() {
      // При обновлении текущей страницы нужен исходный URL для запроса в API.
      this.$axios
        .patch(`/api/page/${this.currentUrl}`, this.page)
        .then(() => {
          // После обновления контента происходит перенаправление на страницу со списком страниц.
          this.$router.push(`/page`);
        })
        .catch((err) => console.log(err.response.data.message));
    },
    deletePage() {
      // При удалении страницы также используем текущий URL, а не изменяемый URL в форме.
      this.$axios
        .delete(`/api/page/${this.currentUrl}`)
        .then(() => {
          this.$router.push(`/page`);
        })
        .catch((err) => console.log(err.response.data.message));
    },
  },
  components: { Multiselect  },
  mounted() {
    // Сохраняем текущий URL на стадии mount компонента.
    this.page.category !== "" ? (this.currentCategory = this.page.category) : "Выбрать";
    this.currentUrl = this.page.url;  
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.form {
  width: 600px;
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
