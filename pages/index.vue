<template>
  <main>
    <h1>Справочники</h1>
    <h2>Категории</h2>
    <nuxt-link to="/category">Список категорий</nuxt-link>
    <nuxt-link to="/category/create">Добавить категорию</nuxt-link>
    <h2>Страницы</h2>
    <nuxt-link to="/page">Список страниц</nuxt-link>
    <nuxt-link to="/page/create">Создать страницу</nuxt-link>
    <hr/>
    <h2>Пользователи</h2>
    <nuxt-link to="/user">Список пользователей</nuxt-link>
    <nuxt-link to="/user/create">Добавить пользователя</nuxt-link>   
    <hr />
    <h2>Заявки</h2>
    <nuxt-link to="/request">Заявки</nuxt-link>
    <nuxt-link to="/request/new">Оставить заявку</nuxt-link>
  </main>
</template>

<script>
export default {
  head() {
    // У всех страниц должны быть title и description.
    let title = "CRM для управления заявками";
    let description = "оставить заявку на монтаж оборудования";

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
