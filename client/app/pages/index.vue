<template>
  <v-container></v-container>
</template>

<script>
export default {
  beforeCreate() {
    this.$router.push('/validate')
  }
}
</script>