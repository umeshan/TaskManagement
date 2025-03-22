<template>
  <div class="filter-form">
    <input type="date" v-model="startDate" placeholder="Start Date" />
    <input type="date" v-model="endDate" placeholder="End Date" />
    <select v-model="statusFilter">
      <option value="">All Status</option>
      <option value="open">Open</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
    <button @click="applyFilter" class="button">Filter</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      statusFilter: '',
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter-tasks', this.startDate, this.endDate, this.statusFilter);
    },
  },
};
</script>

<style lang="stylus" scoped>
.filter-form
  display: flex
  justify-content: space-between
  margin-bottom: 20px

.filter-form input, .filter-form select
  padding: 6px 12px
  margin-right: 10px
  border-radius: 4px
  border: 1px solid #ddd

button.button
  padding: 6px 12px
  background-color: #008CBA
  color: white
  border: none
  border-radius: 4px
  cursor: pointer

button.button:hover
  background-color: #005f73
</style>
