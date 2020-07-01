<template>
    <v-container fluid>
        <v-layout
                fill-height
                align-center
                justify-center
                row
        >
            <v-flex md6 sm8 py-2>
                <v-card>
                    <v-card-title>
                        Расписание
                    </v-card-title>
                    <v-card-text>
                        <Searchbar />
                    </v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout
                fill-height
                align-center
                justify-center
                row
        >
            <v-flex v-if="lessons" md8>
                <v-layout row>
                    <v-flex
                            v-for="(lesson, key) in lessons" :key="`${key}-${lesson.subject}`"
                            xl3 lg4 md6 sm8
                            xs12 pa-2
                    >
                        <v-card>
                            <v-card-text>
                                <div class="text-center">
                                    <span class="text--primary">
                                        <span class="font-weight-bold">{{ lesson.day_number | convertDay }} -</span>
                                </span>
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <span class="text--primary" v-on="on">
                                                <span class="font-weight-bold" style="border-bottom: 1px dashed">
                                                    {{ lesson.lesson_number | convertPair }}</span>
                                            </span>
                                        </template>
                                        <span>Время указано для групп очного образования.</span>
                                    </v-tooltip>
                                </div>
                                <v-divider />
                                <template v-if="lessonsType">
                                     <span>
                                        Группа: <strong class=" text--primary">{{lesson.group.title}}</strong>
                                    </span>
                                    <br>
                                    <span>
                                        Курс: <strong>{{lesson.group.course}}</strong>
                                    </span>
                                    <br>
                                </template>
                                <v-divider />

                                <span class="font-weight-bold text--primary">{{ lesson.subject }}</span>

                                <span class="font-weight-bold text--secondary"> ({{ lesson.type }})</span>
                                <br>
                                <!--                                <span>Аудитори{{ (lesson.auditories.length > 1) ? 'и':'я' }}:</span>-->
                                <span
                                        v-for="(auditory) in lesson.auditories" :key="`a-${key}-${auditory.title}`"
                                        :style="`color: ${auditory.color ? auditory.color : 'darkcyan'};`"
                                        class="font-weight-bold"
                                >
                                        {{ auditory.title }}
                                    </span>
                                <v-divider />
                                <div v-for="(professor) in lesson.professors"
                                     :key="`p-${key}-${professor.full_name}`">
                                        <span
                                                class="text--primary"
                                        >
                                        {{ professor.full_name }}
                                    </span>
                                </div>
                                <v-divider />
                                <span class="font-weight-light" v-if="lesson.lesson_day">
                                        {{ lesson.lesson_day | convertDate }}
                                </span>
                                <span class="font-weight-light" v-else>
                                        {{ lesson.date_from }} - {{ lesson.date_to }}
                                </span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import Searchbar from '@/components/Searchbar';

  export default {
    components: {Searchbar},
    filters: {
      convertDate: function(val) {
        const formatter = new Intl.DateTimeFormat('ru', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return formatter.format((new Date(val)));
      },
      convertDay: function(val) {
        if (!val) return '';
        switch (Number.parseInt(val)) {
          case 1:
            return 'Понедельник';
          case 2:
            return 'Вторник';
          case 3:
            return 'Среда';
          case 4:
            return 'Четверг';
          case 5:
            return 'Пятница';
          case 6:
            return 'Суббота';
          default:
            return val;
        }
      },
      convertPair: function(val) {
        if (!val) return '';
        switch (Number.parseInt(val)) {
          case 1:
            return '9:00-10:30';
          case 2:
            return '10:40-12:10';
          case 3:
            return '12:20-13:50';
          case 4:
            return '14:30-16:00';
          case 5:
            return '16:10-17:40';
          case 6:
            return '17:50-19:20';
          case 7:
            return '19:30-21:00';
          default:
            return val;
        }
      },
    },
    computed: {
      lessons() {
        return this.$store.state.lessons;
      },
      target() {
        return this.$store.state.target;
      },
      lessonsType() {
        // true - расписание преподавателя
        // false - расписание группы
        return this.target.type === 'professor';
      },

    },
  };
</script>

<style scoped>

</style>
