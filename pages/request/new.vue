<template>
  <div class="form">
       <h1>Оставить заявку</h1>
    <div class="form-element">
      <label for="name">Ваше имя (ФИО):</label>
      <input type="text" v-model="name" id="name" />
    </div>
    <div class="form-element">
      <label for="adres">Адрес для выезда на заявку:</label>
      <input type="text" v-model="adres" id="adres" />
    </div>
    <div class="form-element">
      <label for="mobile">Телефон для связи с вами</label>
      <input type="text" v-model="mobile" id="mobile" />
    </div>
    <div class="form-element">
      <label for="content">Описание проблемы:</label>
      <textarea v-model="content" id="content" rows="4"></textarea>
    </div>
    <div class="form-element">
      <label for="description">Комментарии:</label>
      <textarea v-model="description" id="description" rows="4"></textarea>
    </div>
    <div>
      <button v-on:click="newRequest">Отправить заявку</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  head() {
    let title = "Оставить заявку на монтаж";
    let description = "Монтаж оборудования";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },
  data: () => ({
    name: "",
    adres: "",
    mobile: "",
    description: "",
    content: "",
  }),
  /*
  data() {
      return {
          name: "",
          adres: "",
          mobile: "",
          description:"",
          content: "",

      }
  },*/
  methods: {
    newRequest() {
      let formData = {
        name: this.name,
        adres: this.adres,
        mobile: this.mobile,
        description: this.description,
        content: this.content,
      };
      axios.post(`${process.env.baseUrl}/api/request`, formData).then(
          setTimeout(() => {
              this.$router.push(`/request/`)
          }, 500)
      )
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

