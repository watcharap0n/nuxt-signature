<template>
  <v-container>

    <div id="text-decoration">
      หน้าหลัก / การให้บริการ / ระบบตรวจสอบเอกสารอิเล็กทรอนิกส์
    </div>

    <v-card
        flat
        style="margin-top: 40px">

      <v-card-title>
        ข้อมูลลายเซนต์อิเล็กทรอนิกส์ (Digital Signature)
      </v-card-title>

      <v-card-text>
        <v-row
            class="bg-light">
          <v-col sm="6">

            <div>
              <strong>ชื่อไฟล์</strong>
            </div>

            <div>
              <strong>จำนวนหลายเซ็นอิเล็กทรอนิกส์ทั้งหมด</strong>
            </div>

            <div>
              <strong>ผลการตรวจสอบ</strong>
            </div>

          </v-col>
          <v-col sm="6">

            <div>
              {{ $route.params.signature_service.file_name }}
            </div>

            <div>
              จำนวนลายเซ็นต์อิเล็กทรอนิกส์ที่ออกจากระบบ
            </div>

          </v-col>
        </v-row>
      </v-card-text>

      <v-card-title>
        ข้อมูลใบรับรองประทับเวลา (e-Timestamp)
      </v-card-title>

      <v-card-text>
        <v-row
            class="bg-light">
          <v-col sm="6">
            <div>
              <strong>ชื่อองค์กรประทับรับรองเวลา</strong>
            </div>

            <div>
              <strong>ชื่อผู้ให้บริการใบรับรอง</strong>
            </div>

            <div>
              <strong>ผลการตรวจสอบ</strong>
            </div>
          </v-col>

          <v-col sm="6">
            <div>
              {{ $route.params.transaction.dsSignerCertificateDn.subjectDn.commonName }}
            </div>

            <div>
              {{ $route.params.transaction.dsSignerCertificateDn.issuerDn.commonName }}
            </div>

            <div>
              {{ $route.params.transaction.tsTrusted }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card-title>
      ข้อมูล Blockchain
    </v-card-title>

    <v-card-text>
      <v-row
          class="bg-light">
        <v-col sm="6">
          <div>
            <strong>Tax ID</strong>
          </div>

          <div>
            <strong>ผลการตรวจสอบ</strong>
          </div>
        </v-col>

        <v-col sm="6"></v-col>
      </v-row>
    </v-card-text>

   <v-card-actions>
     <v-btn
         @click="$router.push('/')"
         color="info"
         rounded
         small
     >
       กลับหน้าหลัก
     </v-btn>
     <v-spacer></v-spacer>
   </v-card-actions>

  </v-container>
</template>


<script>
export default {
  data() {
    return {
      transaction: []
    }
  },
  methods: {}
}

</script>


<style>
#text-decoration {
  position: absolute;
  width: 562px;
  height: 19px;
  left: 848px;
  top: 118px;

  margin-top: -30px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 90%;
  /* or 22px */
  text-align: center;

  color: #000000;
}
</style>
