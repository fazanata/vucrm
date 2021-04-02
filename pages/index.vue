<template>
  <main>
    <h1>пока ничего</h1>

    <p>тут что-то будет обязательно скоро =)</p>
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
