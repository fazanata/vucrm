<template>
    <ul>
      <li v-for="page in pages" :key="page.h1">
        <nuxt-link :to="`/page/${page.url}`">{{ page.h1 }}</nuxt-link>
      </li>
    </ul>
</template>
<script>

export default{
    props: ['pages', 'count'],
}
</script>
