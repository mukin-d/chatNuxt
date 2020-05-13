<template>
    <v-app dark align="center" style="height: 100%;">
        <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
        </h1>
        <h1 v-else>
        {{ otherError }}
        </h1>
        <NuxtLink to="/">
            Вернуться на страницу входа
        </NuxtLink>
    </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Страница не найдена',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>

    h1 {
      font-size: 24px;
    }
</style>
