<template>
    <v-autocomplete
            v-model="selected"
            :flat="flat"
            :solo-inverted="soloInverted"
            :items="items"
            :loading="loading"
            :search-input.sync="search"
            item-text="title"
            item-value="title"
            hide-no-data
            hide-selected
            prepend-inner-icon="mdi-magnify"
            auto-select-first

            label=""
            placeholder="Поиск"
            clearable
    />
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    name: 'Searchbar',
    props: {
      flat: Boolean,
      soloInverted: Boolean,
    },
    data: function() {
      return {
        items: [],
        loading: false,
        selected: null,
        search: null,
      };
    },
    watch: {
      search(val) {
        this.completeSuggest(val);
      },
      selected(val) {
        if (val === undefined) {
          this.$store.commit('clearLessons');
          this.$store.commit('clearTarget');
          return;
        }
        const target = this.items.find(el => (el.title === val));
        const type = target.type;
        this.$store.commit('updateTarget', target);
        let lessonsURI;
        switch (type) {
          case 'professor':
            lessonsURI = `https://dev.muindor.com/api/rasp/professors/${val}/lessons`
            break;
          case 'group':
            lessonsURI = `https://dev.muindor.com/api/rasp/groups/${val}/lessons`;
            break;
          default:
            return;
        }

        axios.get(lessonsURI, {params: {}}).then(result => {
          if (result.data === []) {
            this.$store.commit('notFindLessons')
          } else {
            this.$store.commit('updateLessons', result.data)
          }
        }).catch(err => {
          this.$store.commit('clearLessons')
          console.log(err);
        }).finally(() => (this.loading = false));
      },
    },
    methods: {},
    created() {
      this.completeSuggest = _.debounce(function(val) {
        if (this.loading) return;
        if (val === null) return;
        if (val.length < 3) return;
        this.loading = true;

        axios.get('https://dev.muindor.com/api/rasp/suggest', {params: {suggest: val, limit: 15}}).then(res => {
          const groups = res.data.groups.map(val => ({title: val.title, type: 'group'}));
          const professors = res.data.professors.map(val => ({title: val.full_name, type: 'professor'}));
          this.items = [...groups, ...professors];
        }).catch(() => {
        }).finally(() => (this.loading = false));
      }, 500);
    },
  };
</script>

<style scoped>

</style>
