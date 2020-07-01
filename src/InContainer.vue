<template>
    <v-app id="inspire">
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <router-link class="hidden-sm-and-down" style="color: #FFFFFF; text-decoration: none;"
                             :to="{path: '/'}">
                    MPU Расписание
                </router-link>
            </v-toolbar-title>

            <v-btn outlined dark tile to="/about">О проекте</v-btn>
            <Searchbar v-if="needSearchbar" flat
                       solo-inverted class="hidden-sm-and-down pt-7" />
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <v-container
                    fluid
            >
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
  import Searchbar from '@/components/Searchbar';

  export default {
    components: {Searchbar},
    props: {},
    data: function() {
      return {
        dialog: false,
        drawer: null,
      };
    },
    computed: {
      needSearchbar() {return this.$route.path !== '/' && this.$route.path !== '/about';},
    },
    methods: {},
  };
</script>

<style scoped>

</style>
