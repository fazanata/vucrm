<template>
  <div class="form">
    <h1>Добавить пользователя</h1>
    <div class="form-element">
      <label for="name">имя (ФИО):</label>
      <input type="text" v-model="name" id="name" />
    </div>
    <div class="form-element">
      <label for="login">Логин для входа в систему (уникальный):</label>
      <input type="text" v-model="login" id="login" />
    </div>
    <div class="form-element">
      <label for="password">Пароль</label>
      <input type="password" v-model="password" id="password" />
    </div>


    <div class="form-element">
      <label for="role">Роль в системе:</label>
      <a-select label-in-value :default-value="{ key: 'lucy' }"  @change="handleChange" v-model="role" id="role">
        <a-select-option v-for="role_ in roles" v-bind:key="role_.key"> {{ role_.name }} </a-select-option>
      </a-select>
    </div>

    <div class="form-element">
      <label for="note">Примечание:</label>
      <textarea v-model="note" id="note" rows="4"></textarea>
    </div>
    <div>
      <button v-on:click="newUser">Создать пользователя</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Select  from "ant-design-vue/lib/select";

export default {
  head() {
    let title = "Справочник пользователей";
    let description = "Справочник пользователей";

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
    login: "",
    password: "",
    role: "",
    note: "",
    roles:[
                {name:'администратор', key: 'admin'},
                {name:'менеджер', key: 'manager'},
                {name:'сотрудник', key: 'worker'}
            ],
  }),
  components: {
    "a-select": Select,
  },

  methods: {
    handleChange(value) {
      //console.log('list=', value); // { key: "lucy", label: "Lucy (101)" }
    },
    newUser() {
      let formData = {
        name: this.name,
        login: this.login,
        password: this.password,
        role: this.role.key,
        note: this.note,
      };
      
      axios.post(`${process.env.baseUrl}/api/user`, formData).then(
        setTimeout(() => {
          this.$router.push(`/user/`);
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

