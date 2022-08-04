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

      <div>หน้าหลัก</div>/&nbsp;
      <div>การให้บริการ</div>/&nbsp;
      <div>ระบบตรวจสอบ</div>

    </v-app-bar>

    <div
        :style="`margin-top: 60px`"
    >

      <Nuxt/>
    </div>


    <footer class="text-center">
      <small>This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small>
    </footer>
  </v-app>
</template>

<script>

</script>
