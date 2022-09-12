<template>
  <v-container>
    <br>
    <div>
      <h1 class="text-3xl">ตรวจสอบเอกสาร PDF</h1>
    </div>
    <v-divider></v-divider>
    <v-list>
      <v-list-group
          :value="true"
          prepend-icon="mdi-file-pdf-box"
          no-action
          style="background: #D0DA52; stroke: black; border-radius: 10px"
          color="black"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
                style="color: black"
            >ข้อมูลตรวจสอบเอกสาร (PDF Validation)
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <div class="bg-light">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>ชื่อไฟล์</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title> {{ filename.name }}</v-list-item-title>
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
              <v-list-item-title>จำนวนลายเซนต์ดิจิทัลทั้งหมด</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title>{{ dsSign }}</v-list-item-title>
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

        </div>
      </v-list-group>
    </v-list>

    <v-list>
      <v-list-group
          :value="true"
          prepend-icon="mdi-file-document-check"
          no-action
          style="background: #D0DA52; stroke: black; border-radius: 10px"
          color="black"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
                style="color: black"
            >ข้อมูลลายเซ็นต์ดิจิทัลและการประทับรับรองเวลาที่ออกจากระบบ Exkasan
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <div class="bg-light">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>จำนวนลายเซ็นต์ดิจิทัลที่ออกจากระบบ YourSign</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-if="countYourSign > 0">{{ countYourSign }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>จำนวนการประทับรับรองเวลาที่ออกจากระบบ Advancert</v-list-item-title>
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-if="countAvancert > 0">{{ countAvancert }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-group>
    </v-list>

    <v-card
        flat
        v-if="transaction"
    >
      <div v-for="(v, k) in transaction.signatures" :key="k">
        <v-list>
          <v-list-group
              style="background: #D0DA52; stroke: black; border-radius: 10px;"
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

                <v-list-item-content v-if="v.dsCertPathTrusted">
                  <v-list-item-icon>
                    <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
                    <div class="font-bold">
                      Signature is valid
                      <tooltips color="success"/>
                    </div>
                  </v-list-item-icon>
                </v-list-item-content>

                <v-list-item-content v-else>
                  <v-list-item-icon
                      v-if="v.dsSignerCertificateDn.issuerDn.commonName === 'Yoursign by ThaiAI'">
                    <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
                    <div class="text-lime-700 font-bold">Signature is valid
                      <tooltips color="success"/>
                    </div>
                  </v-list-item-icon>

                  <v-list-item-title v-else class="font-bold" style="color: #ffc700">
                    <v-icon left style="color: #ffc700">mdi-alert</v-icon>
                    Signature requires validating
                    <tooltips color="#ffc700"/>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ลงลายมือชื่อดิจิทัล</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div v-if="v.dsSignerCertificateDn.issuerDn.commonName === 'Yoursign by ThaiAI'"
                       class="text-lime-700">
                    {{ v.dsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                  <div v-else>
                    {{ v.dsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div v-if="v.dsSignerCertificateDn.issuerDn.commonName === 'Yoursign by ThaiAI'"
                       class="text-lime-700">
                    {{ v.dsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                  <div v-else>
                    {{ v.dsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div v-if="v.dsSignerCertificateDn.issuerDn.commonName === 'Yoursign by ThaiAI'"
                       class="text-lime-700">
                    {{ new Date(v.dsSignerCertificateDn.start) }}
                  </div>
                  <div v-else>
                    {{ new Date(v.dsSignerCertificateDn.start) }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div v-if="v.dsSignerCertificateDn.issuerDn.commonName === 'Yoursign by ThaiAI'"
                       class="text-lime-700">
                    {{ new Date(v.dsSignerCertificateDn.end) }}
                  </div>
                  <div v-else>
                    {{ new Date(v.dsSignerCertificateDn.end) }}
                  </div>
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

                <v-list-item-content v-if="v.tsCertPathTrusted">
                  <v-list-item-icon>
                    <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
                    <div class="text-lime-700 font-bold">Timestamp is valid
                      <tooltips color="success"/>
                    </div>
                  </v-list-item-icon>
                </v-list-item-content>

                <v-list-item-content v-else>
                  <v-list-item-title class="font-bold" style="color: #ffc700">Timestamp requires validating
                    <tooltips color="#ffc700"/>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>หน่วยงานผู้ประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ v.tsSignerCertificateDn.subjectDn.organization }}
                  </div>
                  <div v-else>
                    {{ v.tsSignerCertificateDn.subjectDn.organization }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ v.tsSignerCertificateDn.subjectDn.commonName }}
                  </div>
                  <div v-else>
                    {{ v.tsSignerCertificateDn.subjectDn.commonName }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ v.tsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                  <div v-else>
                    {{ v.tsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ new Date(v.tsSignerCertificateDn.start) }}
                  </div>
                  <div v-else>
                    {{ new Date(v.tsSignerCertificateDn.start) }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ new Date(v.tsSignerCertificateDn.end) }}
                  </div>
                  <div v-else>
                    {{ new Date(v.tsSignerCertificateDn.end) }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>

          <v-list-group
              style="background: #D0DA52; stroke: black; border-radius: 10px"
              v-if="!v.dsSignerCertificateDn"
              no-action
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
                  <v-list-item-title>ผลการตรวจสอบ</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content v-if="v.tsCertPathTrusted">
                  <v-list-item-icon>
                    <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
                    <div class="text-lime-700 font-bold">
                      Timestamp is valid
                      <tooltips color="success"/>
                    </div>
                  </v-list-item-icon>
                </v-list-item-content>

                <v-list-item-content v-else>
                  <v-list-item-title>
                    <v-icon left style="color: #ffc700">mdi-alert</v-icon>
                    <div class="font-bold">Timestamp requires validating
                      <tooltips color="#ffc700"/>
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ชื่อองค์กรประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ v.tsSignerCertificateDn.subjectDn.commonName }}
                  </div>
                  <div v-else>
                    {{ v.tsSignerCertificateDn.subjectDn.commonName }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ชื่อผู้ใหบริการใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ v.tsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                  <div v-else>
                    {{ v.tsSignerCertificateDn.issuerDn.commonName }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ new Date(v.tsSignerCertificateDn.start) }}
                  </div>
                  <div v-else>
                    {{ new Date(v.tsSignerCertificateDn.start) }}
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <div class="text-lime-700"
                       v-if="v.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI'">
                    {{ new Date(v.tsSignerCertificateDn.end) }}
                  </div>
                  <div v-else>
                    {{ new Date(v.tsSignerCertificateDn.end) }}
                  </div>
                </v-list-item-content>
              </v-list-item>

            </div>
          </v-list-group>
        </v-list>
      </div>

      <v-list>
        <v-list-group
            prepend-icon="mdi-graph"
            no-action
            style="background: #D0DA52; stroke: black; border-radius: 10px"
            color="black"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                  style="color: black"
              >ข้อมูล Blockchain
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <div class="bg-light">
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>Transaction ID</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>ผลการตรวจสอบ</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>

          </div>
        </v-list-group>
      </v-list>

    </v-card>

    <v-card-actions>
      <v-btn
          @click="$router.push('/validate')"
          color="black"
          rounded
          text
      >
        <v-icon>mdi-arrow-left-circle</v-icon>
        กลับหน้าหลัก
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <Overlay color="lime" :overlay="overlay"></Overlay>
  </v-container>
</template>


<script>
import Overlay from "@/components/Overlay";
import Tooltips from "@/components/Tooltips";

export default {
  data() {
    return {
      countAvancert: 0,
      countYourSign: 0,
      dsSign: 0,
      tsSign: 0,
      panel: [0, 1],
      overlay: false,
    }
  },

  created() {
    if (!this.filename)
      this.$router.push('/validate')
    this.conditionAC_TS();
  },


  computed: {
    transaction() {
      return this.$route.params.transaction
    },
    filename() {
      return this.$route.params.signature_service
    }
  },
  components: {
    Overlay,
    Tooltips
  },
  methods: {
    conditionAC_TS() {
      let ds = 0;
      let ts = 0;
      if (this.transaction.signatures) {
        let signatures = this.transaction.signatures
        signatures.forEach((val) => {
              if (val.dsSignerCertificateDn) {
                ds += 1
                this.dsSign = ds;
                if (val.dsSignerCertificateDn.issuerDn.commonName === 'Yoursign by ThaiAI') {
                  this.countYourSign += 1
                }
              }

              if (!val.dsSignerCertificateDn) {
                ts += 1
                this.tsSign = ts;
                if (val.tsSignerCertificateDn.subjectDn.commonName === 'Advancert by ThaiAI') {
                  this.countAvancert += 1
                }
              }
            }
        )
      }
    },
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
