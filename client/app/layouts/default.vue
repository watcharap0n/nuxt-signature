<template>
  <v-app style="font-family: 'Prompt', sans-serif;" class="bg-gray-100 h-auto">

    <v-app-bar
        flat
        fixed
        :style="`margin-left: ${$vuetify.application.left}px;`"
        color="black"
        dark
    >
      <v-toolbar-title style="color: #D0DA52">EXKASAN</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text>หน้าหลัก</v-btn>&nbsp;
      <v-btn text @click.prevent="$router.push('/validate')">ระบบตรวจสอบ</v-btn>
      <v-btn text>ระบบประทับรับรองเวลา</v-btn>&nbsp;

    </v-app-bar>

    <div :style="`margin-top: 60px`">

      <Nuxt/>

      <Snackbar/>
    </div>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar";

export default {
  components: {
    Snackbar
  }
}
</script>