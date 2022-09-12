<template>
  <v-tooltip bottom color="white">
    <template v-slot:activator="{ on, attrs }">
      <v-icon
          style="margin-top: -10px"
          x-small
          :color="color"
          dark
          v-bind="on"
          v-on="on"
      >
        mdi-information
      </v-icon>
    </template>

    <v-card>
      <v-card-title class="text-lime-700">
        <v-icon
            left
            color="success">mdi-checkbox-marked-circle
        </v-icon>
        Signature is valid
      </v-card-title>
      <v-card-text>
        มีลายมือชื่อดิจิทัลออกโดยระบบExkasan หรือออกโดยผู้ให้บริการที่อยู่ใน <br> Adobe Trusted List (ATL) และ Eurupien
        Union Trusted List (EUTL)<br> หรืออื่นๆที่ปรากฏในระบบ Exkasan
      </v-card-text>
    </v-card>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    color: {
      default: 'success',
      type: String,
    },

  }
}
</script>

