import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, { id, task }) {
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        state.tasks.splice(index, 1, task);
      }
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(x => x.id !== id);
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get('http://localhost:3001/tasks');
      commit('setTasks', response.data);
    },
    async addTask({ commit }, task) {
      const response = await axios.post('http://localhost:3001/tasks', task);
      commit('addTask', response.data);
    },
    async updateTask({ commit }, { id, task }) {
      await axios.put(`http://localhost:3001/tasks/${id}`, task);
      commit('updateTask', { id, task });
    },
    async deleteTask({ commit }, id) {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      commit('deleteTask', id);
    }
  },
  getters: {
    AllTasks(state) {
      return state.tasks;
    }
  },
  modules: {
  }
})
