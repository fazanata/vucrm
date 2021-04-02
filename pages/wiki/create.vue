<template>
  <div class="form">
    <div class="form-element">
      <label for="url">Адрес категории URL</label>
      <input type="text" v-model="category.url" id="url" />
    </div>
    <div class="form-element">
      <label for="h1">Заголовок H1</label>
      <input type="text" v-model="category.h1" id="h1" />
    </div>
    <div class="form-element">
      <label for="title">Title категории</label>
      <input type="text" v-model="category.title" id="title" />
    </div>
    <div class="form-element">
      <label for="description">Мета-тег Description</label>
      <input type="description" v-model="category.description" id="description" />
    </div>
    <div class="form-element">
      <label for="content">Контент категории</label>
      <textarea v-model="category.content" id="content" rows="4"></textarea>
    </div>

    <button v-if="this.action === 'create'" @click="createPage">Создать страницу</button>
    <button v-if="this.action === 'update'" @click="updatePage">Обновить страницу</button>
    <button v-if="this.action === 'update'" @click="deletePage">Удалить страницу</button>
  </div>
</template>