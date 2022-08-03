<template>
  <v-container
      class="d-flex justify-center"
  >

    <div id="text-decoration">
      หน้าหลัก / การให้บริการ / ระบบตรวจสอบเอกสารอิเล็กทรอนิกส์
    </div>

    <div class="d-flex flex-column justify-space-between align-center">
      <div>
        <v-img
            style="margin-top: 100px"
            :src="require('~/assets/images/ex.png')"
            width="255"
            height="175"
        ></v-img>
      </div>


      <v-card flat>
        <v-card-title><h2>ระบบตรวจสอบอิเล็กทรอนิกส์</h2></v-card-title>
        <v-card-text>
          <v-file-input
              :rules="rules"
              v-model="file"
              label="เลือกไฟล์"
              color="#D0DA52"
              prepend-icon="mdi-paperclip"
              outlined
              show-size
              accept="application/pdf"
          ></v-file-input>
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col cols="6" sm="6">
              <v-btn
                  block
                  link
                  x-large
                  color="#68E7D6"
                  @click="uploadPDF"
                  :loading="spin"
              >
                ตรวจสอบไฟล์
              </v-btn>
            </v-col>

            <v-col cols="6" sm="6">
              <v-btn
                  block
                  link
                  x-large
                  color="#F98F2E"
              >
                กลับหน้าหลัก
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <v-card-text>
        <div class="text-center">
          การตรวจสอบเอกสารดังกล่าว บริษัทยืนยันว่าไม่ได้มีการเก็บเอกสาร หรือเนื้อหาส่วนหนึ่งส่วนใดไว้ในระบบ
          ในกรณีที่เนื้อหาของเอกสารรั่วไหลไปยังบุคคลภายนอก ทางบริษัทจะไม่รับผิดชอบความเสียหายใดๆทั้งสิ้น
        </div>
      </v-card-text>
    </div>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      temp: {},
      spin: false,
      transaction: {},
      pdf_enc: null,
      pdf_pwd: '',
      file: null,
      rules: [
        value => !value || value.size < 10000000 || 'file size should be less than 10 MB!',
      ],
    }
  },

  methods: {
    async verify_exkasan(payload) {
      const path = '/signature/verify/exkasan';
      await this.$axios.post(path, payload)
          .then((res) => {
            this.transaction = res.data;
            this.$router.push(
                {
                  name: 'exkasan',
                  params: {
                    transaction: this.transaction,
                    signature_service: this.temp
                  }
                }
            )
            this.spin = false;
          })
          .catch((err) => {
            console.error(err);
            this.spin = false;
          })
    },

    async uploadPDF() {
      this.spin = true;
      let formData = new FormData();
      const path = '/signature/file/pdf/base64';
      let payload = {
        'pdf': this.pdf_enc,
        'reqRefNo': '1659405914',
        'pdfPassword': this.pdf_pwd,
      }

      formData.append('file', this.file);
      await this.$axios.post(path, formData)
          .then((res) => {
            this.temp = {
              file_content_type: res.data.file_content_type,
              file_name: res.data.file_name,
              file_size: res.data.file_size
            }
            payload.pdf = res.data.base64_enc;
            this.verify_exkasan(payload);
          })
          .catch((err) => {
            console.error(err);
            this.spin = false;
          })
    }
  }

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
