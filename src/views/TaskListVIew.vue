<template>
  <div>
    <h1 class="text-center my-14">Список задач</h1>
    <AddTaskForm />
    <ul class="flex items-center justify-center flex-col gap-y-4">
      <li
        class="flex items-center gap-x-10 border border-black py-4 px-10"
        v-for="task in AllTasks"
        :key="task.id"
      >
        <div class="flex items-center gap-x-10" v-if="!task.isEdit">
          {{ task.text }}
          <button @click="editTask(task)">Редактировать</button>
          <button @click="deleteTask(task.id)">Удалить</button>
        </div>
        <div v-if="task.isEdit">
          <input class="py-3 px-4 mr-5 border border-black" type="text" v-model="task.editText" required />
          <button @click="saveTask(task)">Сохранить</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddTaskForm from "@/components/AddTaskForm.vue";
export default {
  name: "TaskListView",
  components: {
    AddTaskForm,
  },
  computed: {
    ...mapGetters(["AllTasks"]),
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(["updateTask", "deleteTask", "fetchTasks"]),
    editTask(task) {
      this.updateTask({
        id: task.id,
        task: { ...task, isEdit: true, editText: task.text },
      });
    },
    saveTask(task) {
      if (task.editText.trim() !== "") {
        const updatedTask = {
          ...task,
          text: task.editText,
          isEdit: false,
        };
        this.updateTask({ id: task.id, task: updatedTask });
      }
    },
  },
};
</script>
