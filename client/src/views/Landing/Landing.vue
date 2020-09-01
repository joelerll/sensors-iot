<template>
  <div id="Landing">
    <v-main center>
      <v-card color="#00BCEC" class="text-center">
        <v-row align="center" justify="center" style="padding: 20px;">
          <v-col>
            <h1>Iniciativa de datos abiertos de Guayaquil</h1>
          </v-col>
        </v-row>
      </v-card>

      <div class="sub-title text-center">
        <h1 class="font-weight-bold  display-3">Destacados</h1>
      </div>

      <v-main class="container">
        <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-2 basil--text">Medicion</h1>
            </v-card-title>

            <v-tabs background-color="transparent" color="basil" grow  v-model="tab">
            <v-tab>Medicion</v-tab>
            <v-tab>Impacto</v-tab>
            </v-tabs>

            <v-tabs-items  v-model="tab">
                <v-tab-item>
                    <v-card color="basil" flat>
                        <!-- <img width="100%"/> -->
                        <v-card-text><p v-dummy="150"></p></v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card color="basil" flat>
                        <v-card-text><p v-dummy="150"></p></v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
      </v-main>

      <v-main class="container">
        <div class="sub-title text-center">
            <h1 class="font-weight-bold  display-3">Impacto</h1>
        </div>
        <v-row>
            <v-col cols="12" md="8" >
                <v-card class="pa-2" outlined tile >
                <v-img height="400" width="200"></v-img>
                </v-card>
            </v-col>
            <v-col cols="6" md="4" >
                <v-card class="pa-2" outlined tile>
                    <v-img height="400" width="200"></v-img>
                </v-card>
            </v-col>
        </v-row>
      </v-main>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data() {
      return {
          tab: null
      }
  },
};
</script>

<style lang="css">
.sub-title {
  margin-top: 20px;
  margin-bottom: 20px;
}

.container {
  margin-left: 50px;
  margin-right: 50px;
}
</style>