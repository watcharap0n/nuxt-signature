<template>
  <v-container
      class="d-flex justify-center"
  >

    <div class="d-flex flex-column justify-space-between align-center">
      <div>
        <v-img
            style="margin-top: 100px"
            :src="require('~/assets/images/ex-min.png')"
            width="255"
            height="175"
        ></v-img>
      </div>

      <div class="text-center p-2">
        <h3 style="margin-top: 10px;">ระบบประทับรับรองเวลาอิเล็กทรอนิกส์</h3>
      </div>

      <v-card flat>
        <v-card
            @mouseenter="dragover = true"
            @mouseleave="dragover = false"
            @drop.prevent="onDrop($event)"
            @dragover.prevent="dragover = true"
            @dragenter.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            :class="{ 'grey lighten-2': dragover }"
        >
          <input type="file" hidden @change="onDrop($event)" accept="application/pdf" ref="file"/>
          <v-card-text
              @click="$refs.file.click()"
              for="assetsFieldHandle" class="block cursor-pointer">
            <v-row
                for="assetsFieldHandle"
                class="d-flex flex-column"
                dense align="center"
                justify="center"
            >
              <v-icon
                  :class="[dragover ? 'mt-2, mb-6' : 'mt-5']"
                  size="60"
                  :color="`${dragover ? 'lime': ''}`"
              >
                mdi-cloud-upload
              </v-icon>
              <p>
                ลากไฟล์มาวางที่นี่ หรือ คลิกอัพโหลดไฟล์
              </p>
            </v-row>
            <div class="text-center">
              <v-chip class="ma-2"
                      color="lime"
                      dark
                      v-if="file"
                      close
                      @click:close="file = null"
              >
                <v-icon left>
                  mdi-file-pdf-box
                </v-icon>
                {{ file.name }} size: {{ Math.round(file.size / 1000) }}KB
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
        <br>
        <br>
        <div style="margin-left: -30px">
          <recaptcha
              id="recaptcha"
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
          />
        </div>

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
                ประทับรับรองเวลา
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
          การประทับรับรองเอกสารดังกล่าว ผู้ใช้บริการยินยอมให้บริษัทตรวจสอบเอกสารและบริษัทยืนยันว่าไม่ได้มีการเก็บเอกสาร
          <br>
          หรือเนื้อหาส่วนหนึ่งส่วนใดไว้ในระบบ
          ในกรณีที่เนื้อหาของเอกสารรั่วไหลไปยังบุคคลภายนอก ทางบริษัทจะไม่รับผิดชอบความเสียหายใดๆทั้งสิ้น
        </div>
      </v-card-text>
    </div>

  </v-container>
</template>

<script>
import liff from '@line/liff';

export default {
  data() {
    return {
      hideProgress: false,
      progress: 0,
      handleEvent: false,
      baseURL: this.$config.baseURLTimestamp,
      btnSubmit: false,
      siteKey: this.$config.siteKey,
      secretKey: this.$config.secretKey,
      spin: false,
      dragover: false,
      pdf_enc: null,
      pdf_pwd: '',
      file: null,
      rules: [
        value => !!value || 'required.',
        value => !value || value.size < 100000000 || 'file size should be less than 10 MB!'
      ],
    }
  },

  async mounted() {
    try {
      if (this.$device.android || this.$device.ios) {
        await this.initialized();
      }
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async initialized() {
      await liff.init({liffId: '1657396403-0YxPaKad'},
          () => {
            if (liff.isLoggedIn()) {
              liff.getProfile()
                  .then((profile) => {
                    console.log(profile)
                  })
            } else {
              liff.login();
            }
          });
    },

    async timestamp_exkasan() {
      this.spin = true;
      const path = `${this.baseURL}${this.$config.apiTimeStampExkasan}`
      const config = {
        onUploadProgress: function (progressEvent) {
          this.progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          this.hideProgress = true
        }.bind(this),
        responseType: 'blob',
      }
      let formData = new FormData();
      formData.append('file', this.file);

      await this.$axios.post(path, formData, config)
          .then((res) => {
            let ext = this.file.name.split('.')
            const blob = res.data;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${ext[0]}_timestamped.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((err) => {
            this.$swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Something went wrong please try again.'
            })
            console.error(err);
            this.$recaptcha.reset();
            this.btnSubmit = false;
            this.spin = false;
          })
      this.spin = false;
    },

    onDrop(e) {
      this.dragover = false;
      try {
        if (e.dataTransfer.files.length > 1) {
          this.$notifier.showMessage({
            color: 'red',
            content: 'คุณสามารถอัพโหลดได้เพียงแค่ 1 ไฟล์'
          })
        } else if (e.dataTransfer.files[0].type !== 'application/pdf') {
          this.$notifier.showMessage({
            color: 'red',
            content: 'ต้องเป็นไฟล์ PDF เท่านั้น'
          })
        } else {
          this.file = e.dataTransfer.files[0]
        }
      } catch {
        this.file = this.$refs.file.files[0]
      }
    },

    onSuccess(token) {
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
          await this.timestamp_exkasan();
          return response
        }
      } catch (error) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Something went wrong please try again.',
        })
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
