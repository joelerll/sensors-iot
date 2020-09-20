<template>
  <div id="Landing">
    <v-main center>
      <v-card color="#00BCEC" class="text-center">
        <v-row align="center" justify="center" style="padding: 20px;">
          <v-col>
            <h1>{{titulo}}</h1>
          </v-col>
        </v-row>
      </v-card>

      <div class="sub-title text-center">
        <!-- <h1 class="font-weight-bold display-3">Destacados</h1> -->
      </div>

      <v-main class="container">
        <v-card color="basil">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-2 basil--text">{{titulo_tab}}</h1>
          </v-card-title>

          <v-tabs background-color="transparent" color="basil" grow v-model="tab">
            <v-tab>{{titulo_tab_1}}</v-tab>
            <v-tab>{{titulo_tab_2}}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card color="basil" flat>
                <!-- <img width="100%"/> -->
                <v-card-text>
                  <h2>{{texto_tab_1}}</h2>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card color="basil" flat>
                <v-card-text>
                  <h2>{{texto_tab_2}}</h2>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-main>

      <v-main class="container">
        <div class="sub-title text-center">
          <h1 class="font-weight-bold display-3">Impacto</h1>
        </div>
        <v-row>
          <v-col cols="10" md="6">
            <v-card class="pa-2" outlined tile>
              <v-img :src="image_1"></v-img>
            </v-card>
          </v-col>
          <v-col cols="8" md="6">
            <v-card class="pa-2" outlined tile>
              <v-img :src="image_2"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-main>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      heigth="100px"
      style="max-height: 600px;"
    >
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title>
              <v-text-field label="Titulo" v-model="titulo"></v-text-field>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-text-field label="Titulo Tab" v-model="titulo_tab"></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-text-field label="Titulo Tab 1" v-model="titulo_tab_1"></v-text-field>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-text-field label="Titulo Tab 2" v-model="titulo_tab_2"></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-text-field label="Titulo Tab 2" v-model="titulo_tab_2"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-textarea label="Texto Tab 1" v-model="texto_tab_1"></v-textarea>
          </v-list-item>
          <v-list-item>
            <v-textarea label="Texto Tab 2" v-model="texto_tab_2"></v-textarea>
          </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-list-item-title>
            <v-text-field label="Image 1" v-model="image_1"></v-text-field>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-text-field label="Image 2" v-model="image_2"></v-text-field>
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>
            <v-btn block @click="save" color="success">Guardar</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Landing",
  computed: {
    drawer: {
      get: function () {
        return this.$store.getters["drawer"];
        // return false;
      },
      set: function () {
        return false;
      },
    },
  },
  methods: {
    save: function () {
      console.log(this.titulo);
      this.$store
        .dispatch("landing", {
          titulo: this.titulo,
          titulo_tab: this.titulo_tab,
          titulo_tab_1: this.titulo_tab_1,
          titulo_tab_2: this.titulo_tab_2,
          texto_tab_1: this.texto_tab_1,
          texto_tab_2: this.texto_tab_2,
          image_1: this.image_1,
          image_2: this.image_2,
        })
        .then(() => {})
        .catch(() => {});
    },
    get: function () {
      this.$store
        .dispatch("landing_get")
        .then((data) => {
          this.titulo = data.titulo;
          this.titulo_tab = data.titulo_tab;
          this.titulo_tab_1 = data.titulo_tab_1;
          this.titulo_tab_2 = data.titulo_tab_2;
          this.texto_tab_1 = data.texto_tab_1;
          this.texto_tab_2 = data.texto_tab_2;
          this.image_1 = data.image_1;
          this.image_2 = data.image_2;
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.get();
  },
  data() {
    return {
      hola: false,
      tab: null,
      titulo: "",
      titulo_tab: "",
      titulo_tab_1: "",
      titulo_tab_2: "",
      texto_tab_1: "",
      texto_tab_2: "",
      image_1: "",
      image_2: "",
    };
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