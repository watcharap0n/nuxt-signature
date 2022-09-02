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

    <v-dialog
        width="800px"
        v-model="dialog"
    >
      <v-card
          falt
      >
        <v-card-title>Timestamp</v-card-title>
        <v-card-text>
          <v-subheader>ระบบได้รับการประทับระบรองเวลา Advancert ลงบนเอกสารเรียบร้อยแล้วกรุณาดาวโหลด</v-subheader>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success"
                 text
                 @click="downloadPDF"
                 rounded

          >
            <v-icon left>
              mdi-download-circle-outline
            </v-icon>
            Download
          </v-btn>
          <v-btn color="error"
                 text
                 @click="dialog = false"
                 rounded
          >
            <v-icon left>
              mdi-close-circle-outline
            </v-icon>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        persistent
        width="400px"
        v-model="dialogLogin"
    >
      <v-card>
        <v-card-title style="align-content: center; justify-content: center">
          เข้าสู่ระบบ
        </v-card-title>

        <v-card-text>
          <v-btn block
                 color="#5AC463"
                 dark
                 style="margin-bottom: 10px;"
                 @click="initializedLINE"
          >
            <i class="fa-brands fa-line"></i>
            &nbsp;เข้าสู่ระบบด้วย LINE
          </v-btn>

          <v-btn block
                 color="white"
                 style="margin-bottom: 10px;"
                 @click="initializedGoogle"
          >
            <i class="fa-brands fa-google"></i>
            &nbsp;เข้าสู่ระบบด้วย Google
          </v-btn>

          <v-btn block
                 color="#42538A"
                 dark
                 style="margin-bottom: 10px;"
                 @click="initializedFB"
          >
            <i class="fab fa-facebook-f"></i>
            &nbsp;เข้าสู่ระบบด้วย FACEBOOK
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-btn small
           @click="logout"
           text
           color="error"
           :hidden="!isLogout"
    >ออกจากระบบ
    </v-btn>

    <Overlay :overlay="overlay" color="lime"></Overlay>
  </v-container>
</template>

<script>
import liff from '@line/liff';
import Overlay from "@/components/Overlay";

export default {
  data() {
    return {
      overlay: false,
      isLogout: false,
      dialogLogin: false,
      dialog: false,
      hideProgress: false,
      progress: 0,
      handleEvent: false,
      baseURL: this.$config.baseURLTimestamp,
      btnSubmit: false,
      siteKey: this.$config.siteKey,
      secretKey: this.$config.secretKey,
      liffIdTs: this.$config.liffIdTs,
      spin: false,
      dragover: false,
      pdf_enc: null,
      pdf_pwd: '',
      file: null,
      transaction: null,
      blob: '',
      filenamePDF: '',
      rules: [
        value => !!value || 'required.',
        value => !value || value.size < 100000000 || 'file size should be less than 10 MB!'
      ],
    }
  },
  components: {
    Overlay
  },

  async created() {
    this.overlay = true
    console.log(this.$auth.loggedIn)
    console.log(this.$auth.user)
    console.log(this.$auth.strategy.name)
    await liff.init({liffId: this.liffIdTs},
        () => {
          if (liff.isLoggedIn()) {
            liff.getProfile()
                .then((profile) => {
                  this.$parent.$emit('authUser', profile);
                  this.$parent.$emit('issue', 'line')
                })
            this.$nuxt.$emit('session', false)
            this.dialogLogin = false
          }
          if (!liff.isLoggedIn() && !this.$auth.loggedIn) {
            this.$nuxt.$emit('session', true)
            this.dialogLogin = true
          }
        })
    if (this.$auth.loggedIn) {
      await this.$parent.$emit('authUser', this.$auth.user);
      await this.$parent.$emit('issue', this.$auth.strategy.name)
      this.$nuxt.$emit('session', false)
      this.dialogLogin = false;
    }
    if (!liff.isLoggedIn() && !this.$auth.loggedIn) {
      this.$nuxt.$emit('session', true)
      this.dialogLogin = true
    }
    this.overlay = false
  },

  methods: {
    async initializedLINE() {
      await liff.init({liffId: this.liffIdTs},
          () => {
            if (liff.isLoggedIn()) {
              liff.getProfile()
                  .then((profile) => {
                    console.log(profile);
                    this.dialogLogin = false;
                  })
            } else {
              liff.login();
            }
          });
    },

    async initializedGoogle() {
      await this.$auth.loginWith('google', {params: {prompt: "select_account"}});
    },

    async initializedFB() {
      await this.$auth.loginWith('facebook');
    },

    async verifyCaptcha() {
      try {
        if (this.file) {
          const token = await this.$recaptcha.getResponse();
          const path = `/captcha-api/siteverify?secret=${this.secretKey}&response=${token}`;
          const response = await this.$axios.$post(path);
          await this.timestampExkasan();
          return response
        }
      } catch (error) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Internal server error',
          text: `Something went wrong (${error.response.status}) please try again.`
        })
        console.log('Login error:', error);
      }
    },

    async logout() {
      await this.$auth.logout()
      location.reload()
    },

    async timestampExkasan() {
      this.spin = true;
      const path = `${this.baseURL}${this.$config.apiTimeStampExkasan}`
      const config = {
        onUploadProgress: function (progressEvent) {
          this.progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          this.hideProgress = true
        }.bind(this),
        responseType: 'blob',
        auth: {
          username: this.$config.basicAuthUsername,
          password: this.$config.basicAuthPassword
        }
      }
      let formData = new FormData();
      formData.append('file', this.file);

      await this.$axios.post(path, formData, config)
          .then((res) => {
            let ext = this.file.name.split('.');
            this.blob = res.data
            this.filenamePDF = `${ext[0]}_timestamped.pdf`;
            this.dialog = true
          })
          .catch((err) => {
            this.$swal.fire({
              icon: 'warning',
              title: 'Internal server error',
              text: `Something went wrong (${err.response.status}) please try again.`
            })
            console.error(err);
          })
      this.$recaptcha.reset();
      this.btnSubmit = false;
      this.spin = false;
    },

    downloadPDF() {
      const blob = this.blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = this.filenamePDF
      document.body.appendChild(link);
      link.click();
      this.file = null
      this.dialog = false
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

  }
}
</script>

<style>

#recaptcha {
  margin-left: 50px;
  margin-top: -30px;
}

.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
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
