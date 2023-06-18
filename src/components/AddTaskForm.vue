<template>
  <div class="flex flex-col justify-center items-center mb-10 gap-y-5">
    <h1>Форма создания задачи</h1>
    <form @submit.prevent="createTask">
      <input class="mr-7 py-4 px-5" type="text" v-model="text" placeholder="Текст задачи" required>
      <button class="bg-black text-white text-lg py-4 px-7 rounded-lg" type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'TaskForm',
  data() {
    return {
      text: ''
    };
  },
  methods: {
    ...mapActions(['addTask']),
    createTask() {
      const task = {
        text: this.text // Убедитесь, что поле text корректно передается в объект задачи
      };
      this.addTask(task);
      this.text = '';
    }
  }
};
</script>