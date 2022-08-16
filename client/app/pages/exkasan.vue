<template>
  <v-container>

    <v-card
        flat
        style="margin-top: 40px"
        v-if="transaction"
    >
      <v-list class="bg-light">
        <v-list-group
            :value="true"
            prepend-icon="mdi-file-account"
        >
          <template v-slot:activator>
            <v-list-item-title>ข้อมูลลายเซนต์อิเล็กทรอนิกส์ (Digital Signature)</v-list-item-title>
          </template>

          <v-list-group
              v-for="(v, k) in transaction.signatures"
              v-if="v.dsSignerCertificateDn"
              :key="k"
              :value="true"
              no-action1
              sub-group
              prepend-icon="mdi-draw-pen"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Sign</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>ผู้ลงลายมือชื่อดิจิตอล</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                {{ v.dsSignerCertificateDn.issuerDn.commonName }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>วันออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                {{ new Date(v.dsSignerCertificateDn.start) }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                {{ new Date(v.dsSignerCertificateDn.end) }}
              </v-list-item-content>
            </v-list-item>

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

            <v-list-group
                :value="true"
                no-action1
                sub-group
                prepend-icon="mdi-timer-check-outline"
                v-if="v.tsSignerCertificateDn"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Embedded Timestamp</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผลการตรวจสอบการประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{ v.tsSignerCertificateDn.subjectDn.organization }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>หน่วยงานผู้ประทับรับรองเวลา</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{ v.tsSignerCertificateDn.subjectDn.commonName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>ผู้ออกใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{ v.tsSignerCertificateDn.issuerDn.commonName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันออกใบรับรอง</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{ new Date(v.tsSignerCertificateDn.start) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{ new Date(v.tsSignerCertificateDn.end) }}</v-list-item-title>
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
            </v-list-group>
          </v-list-group>
        </v-list-group>
      </v-list>

      <br>
      <v-list class="bg-light">
        <v-list-group
            :value="true"
            prepend-icon="mdi-file-account"
        >
          <template v-slot:activator>
            <v-list-item-title>ข้อมูลใบรับรองประทับเวลา (e-Timestamp)</v-list-item-title>
          </template>

          <v-list-group
              v-for="(v, k) in transaction.signatures"
              :key="k"
              v-if="!v.dsSignerCertificateDn"
              :value="true"
              no-action1
              sub-group
              prepend-icon="mdi-timer-check-outline"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Timestamp</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>ชื่อองค์กรประทับรับรองเวลา</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ v.tsSignerCertificateDn.subjectDn.commonName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>ชื่อผู้ใหบริการใบรับรอง</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ v.tsSignerCertificateDn.issuerDn.commonName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>วันออกใบรับรอง</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ new Date(v.tsSignerCertificateDn.start) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>วันหมดอายุใบรับรองอิเล็กทรอนิกส์</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ new Date(v.tsSignerCertificateDn.end) }}</v-list-item-title>
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
          </v-list-group>
        </v-list-group>
      </v-list>

      <br>
      <v-expansion-panels
          multiple
          flat
          v-model="panel"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="bg-light">ข้อมูล Blockchain</v-expansion-panel-header>
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

  </v-container>
</template>


<script>
export default {
  data() {
    return {
      panel: [0, 1],
    }
  },
  computed: {
    transaction() {
      return this.$route.params.transaction
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
