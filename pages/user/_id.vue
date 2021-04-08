<template>
  <div>
    <h1>
      {{ user.name }}
    </h1>
    <div>
        Профиль создан
        {{ 
            //$datefnc.format(this.user.date_created, "d MMMM yyyy г.") 
            this.user.date_created
        }}

    </div>
  </div>
</template>