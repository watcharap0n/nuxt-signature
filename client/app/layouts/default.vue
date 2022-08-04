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
      <v-btn text>การให้บริการ</v-btn>&nbsp;
      <v-btn text>ระบบตรวจสอบ</v-btn>

    </v-app-bar>

    <div :style="`margin-top: 60px`">

      <Nuxt/>

    </div>


  </v-app>
</template>
