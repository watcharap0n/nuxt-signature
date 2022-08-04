<template>
  <v-container
      class="d-flex justify-center"
  >

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
        <h3 style="margin-top: 10px">ระบบตรวจสอบอิเล็กทรอนิกส์</h3>
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

        <recaptcha
            id="recaptcha"
            @error="onError"
            @success="onSuccess"
            @expired="onExpired"
        />

        <v-card-actions>
          <v-row>
            <v-col cols="6" sm="6">
              <v-btn
                  :disabled="!btnSubmit"
                  block
                  x-large
                  color="#68E7D6"
                  @click="verifyCaptcha"
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
import {env} from "@@/nuxt.config";

export default {

  data() {
    return {
      btnSubmit: false,
      siteKey: env.siteKey,
      secretKey: env.secretKey,
      temp: {},
      spin: false,
      transaction: {},
      pdf_enc: null,
      pdf_pwd: '',
      file: null,
      rules: [
        value => !value || value.size < 10000000 || 'file size should be less than 10 MB!',
        value => !!value || 'required.'
      ],
    }
  },

  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async verify_exkasan(payload) {
      const path = 'https://lab.kanepro.co/signature/verify/exkasan';
      await this.$axios.post(path, payload)
          .then((res) => {
            this.btnSubmit = false;
            this.transaction = res.data;
            this.$recaptcha.reset();
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
            this.$recaptcha.reset();
            this.btnSubmit = false;
            this.spin = false;
          })
    },

    async uploadPDF() {
      this.spin = true;
      let formData = new FormData();
      const path = 'https://lab.kanepro.co/signature/file/pdf/base64';
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
    },

    onSuccess(token) {
      console.log('Succeeded:', token)
      this.btnSubmit = true;
    },
    onExpired() {
      console.log('Expired')
    },
    onError(error) {
      console.log('Error happened:', error)
    },

    async verifyCaptcha() {
      try {
        if (this.file) {
          const token = await this.$recaptcha.getResponse();
          const path = `/captcha-api/siteverify?secret=${this.secretKey}&response=${token}`;
          const response = await this.$axios.$post(path);
          await this.uploadPDF();
          return response
        }
      } catch (error) {
        console.log('Login error:', error);
      }
    },
  }

}
</script>

<style>

#recaptcha {
  margin-left: 50px;
  margin-top: -30px;
}

#text-decoration {

  position: absolute;
  width: 562px;
  height: 19px;
  margin-left: 848px;
  margin-top: 30px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 90%;
  /* or 22px */
  text-align: center;

  color: #000000;
}
</style>
