<template>
  <div>
    <v-card class="rounded-lg" tile>
      <v-card-title primary-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ amount }}</v-list-item-title>
            <v-list-item-subtitle>{{ title }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="60"
            ><v-icon size="80">{{ icon }}</v-icon></v-list-item-avatar
          >
        </v-list-item>
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "chart-card-number",
  props: ["amount", "title", "icon"],
};
</script>
