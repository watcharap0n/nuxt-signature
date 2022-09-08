<template>
  <v-tooltip top color="white">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          text
          color="success"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon
            left
            color="success">mdi-checkbox-marked-circle
        </v-icon>
        <div class="text-lime-700 font-bold">{{ status }}</div>
      </v-btn>
    </template>
    <v-icon
        left
        color="success">mdi-checkbox-marked-circle
    </v-icon>
    <span style="color: black"> คือการ trusted ที่ไม่ใช่ระบบ </span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    status: {
      required: true,
      type: String,
    }
  }
}
</script>

