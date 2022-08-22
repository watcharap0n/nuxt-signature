<template>
  <v-container>

    <v-list>
      <v-list-group
          :value="true"
          prepend-icon="mdi-file-pdf-box"
          no-action
          color="black"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>ข้อมูลตรวจสอบเอกสาร (PDF Validation)</v-list-item-title>
          </v-list-item-content>
        </template>

        <div class="bg-light">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>ชื่อไฟล์</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>{{ filename.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>ขนาดไฟล์</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>{{ filename.size / 1000 }}KB</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>จำนวนลายเซนต์อิเล็กทรอนิกส์ทั้งหมด</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>{{ dsSign }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>จำนวนลายเซ็นต์อิเล็กทรอนิกส์ที่ออกจากระบบ YouSign</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>จำนวนการประทับรับรองเวลาทั้งหมด</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>{{ tsSign }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>จำนวนการประทับรับรองเวลาที่ออกจากระบบ Advancert</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-group>
    </v-list>

    <v-card
        flat
        style="margin-top: 40px"
        v-if="transaction"
    >
      <div v-for="(v, k) in transaction.signatures" :key="k">
        <br><br>
        <v-list>
          <v-list-group
              :value="true"
              v-if="v.dsSignerCertificateDn"
              :key="k"
              prepend-icon="mdi-draw-pen"
              no-action
              color="black"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Rev.{{ k + 1 }} ข้อมูลลายมือชื่อดิจิทัล (Digital Signature)</v-list-item-title>
              </v-list-item-content>
            </template>

            <div class="bg-light">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผลการตรวจสอบ</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="success" v-text="v.dsTrusted ? 'mdi-check-bold': 'mdi-window-close'"></v-icon>
                  </v-list-item-icon>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ลงลายมือชื่อดิจิตอล</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content :class="[changeColorVal]">
                  {{ v.dsSignerCertificateDn.issuerDn.commonName }}
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content :class="[changeColorVal]">
                  {{ v.dsSignerCertificateDn.issuerDn.commonName }}
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content :class="[changeColorVal]">
                  {{ new Date(v.dsSignerCertificateDn.start) }}
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content :class="[changeColorVal]">
                  {{ new Date(v.dsSignerCertificateDn.end) }}
                </v-list-item-content>
              </v-list-item>

              <v-list-item style="margin-top: 10px">
                <v-list-item-content>
                  <v-list-item-title class="text-h6">Embedded Timestamp</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผลการตรวจสอบการประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="success" v-text="v.tsTrusted ? 'mdi-check-bold': 'mdi-window-close'"></v-icon>
                  </v-list-item-icon>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>หน่วยงานผู้ประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="[changeColorVal]">
                    {{ v.tsSignerCertificateDn.subjectDn.organization }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="[changeColorVal]">
                    {{ v.tsSignerCertificateDn.subjectDn.commonName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ v.tsSignerCertificateDn.issuerDn.commonName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ new Date(v.tsSignerCertificateDn.start) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ new Date(v.tsSignerCertificateDn.end) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>

          <v-list-group
              v-if="!v.dsSignerCertificateDn"
              no-action
              :value="true"
              prepend-icon="mdi-timer-lock-open-outline"
              color="black"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Rev.{{ k + 1 }} Timestamp</v-list-item-title>
              </v-list-item-content>
            </template>

            <div class="bg-light">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ชื่อองค์กรประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ v.tsSignerCertificateDn.subjectDn.commonName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ชื่อผู้ใหบริการใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ v.tsSignerCertificateDn.issuerDn.commonName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ new Date(v.tsSignerCertificateDn.start) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title :class="changeColorVal">
                    {{ new Date(v.tsSignerCertificateDn.end) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผลการตรวจสอบ</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="success" v-text="v.tsTrusted ? 'mdi-check-bold': 'mdi-window-close'"></v-icon>
                  </v-list-item-icon>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>
        </v-list>
      </div>

      <br>
      <v-expansion-panels
          multiple
          flat
          v-model="panel"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>ข้อมูล Blockchain</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col sm="6">
                <div class="p-2">
                  Transaction ID
                </div>
                <div class="p-2">
                  ผลการตรวจสอบ
                </div>
              </v-col>

              <v-divider vertical></v-divider>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <v-card-actions>
      <v-btn
          @click="$router.push('/')"
          color="info"
          rounded
          small
          text
      >
        กลับหน้าหลัก
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <Overlay color="lime" :overlay="overlay"></Overlay>
  </v-container>
</template>


<script>
import Overlay from "@/components/Overlay";

export default {
  data() {
    return {
      dsSign: 0,
      tsSign: 0,
      panel: [0, 1],
      overlay: false,
    }
  },

  computed: {
    changeColorVal() {
      let text = '';
      let num = 0;
      let ds = 0;
      let ts = 0;
      if (this.transaction.signatures) {
        let signatures = this.transaction.signatures
        signatures.forEach((val) => {
          if (val.dsSignerCertificateDn) {
            ds += 1
            this.dsSign = ds;
          }
          if (!val.dsSignerCertificateDn) {
            ts += 1
            this.tsSign = ts;
          }
          if (val.tsSignerCertificateDn) {
            if (val.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI') {
              num += 1
              if (num === 1)
                text += 'text-lime-700'
            }
          }
        })
      }
      return text
    },
    transaction() {
      return this.$route.params.transaction
    },
    filename() {
      return this.$route.params.signature_service
    }
  },
  components: {
    Overlay
  },
  methods: {
    initialized() {
      this.overlay = !this.transaction;
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
