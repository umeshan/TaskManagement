<template>
  <tr>
    <td>{{ task.title }}</td>
    <td>{{ task.status }}</td>
    <td>{{ task.priority }}</td>
    <td>{{ task.createdDate }}</td>
    <td>
      <button @click="deleteTask(task._id)" class="button">Delete</button>
      <button @click="updateTask(task._id)" class="button">Update</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods: {
    deleteTask(id) {
      this.$emit('delete-task', id);
    },
    updateTask(id) {
      this.$emit('update-task', id);
    },
  },
};
</script>

<style lang="stylus" scoped>
td
  padding: 12px 20px
  border: 1px solid #ddd

button.button
  padding: 6px 12px
  background-color: #f44336
  color: white
  border: none
  border-radius: 4px
  cursor: pointer
  transition: background-color 0.3s

button.button:hover
  background-color: #e53935
</style>
