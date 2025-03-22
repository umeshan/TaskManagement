<template>
  <div>
    <h2>Task Manager</h2>

    <!-- Date Range Filters -->
    <FilterForm @filter="applyFilter" />

    <!-- Task Table -->
    <div class="task-table">
      <table>
        <thead>
          <tr>
            <th @click="sortTable('title')">Title <span :class="getSortIconClass('title')"></span></th>
            <th @click="sortTable('status')">Status <span :class="getSortIconClass('status')"></span></th>
            <th @click="sortTable('priority')">Priority <span :class="getSortIconClass('priority')"></span></th>
            <th @click="sortTable('createdDate')">Created Date <span :class="getSortIconClass('createdDate')"></span></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in paginatedTasks" :key="task._id">
            <td>{{ task.title }}</td>
            <td>{{ task.status }}</td>
            <td>{{ task.priority }}</td>
            <td>{{ new Date(task.createdDate).toLocaleDateString() }}</td>
            <td>
              <button @click="deleteTask(task._id)">Delete</button>
              <button @click="updateTask(task._id)">Mark as Completed</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FilterForm from './FilterForm.vue';

export default {
  components: {
    FilterForm,
  },
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      currentPage: 1,
      itemsPerPage: 5,
      sortColumn: '',
      sortOrder: 1, // 1 for ascending, -1 for descending
      startDate: '',
      endDate: '',
      statusFilter: '',
    };
  },
  created() {
    this.fetchTasks();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTasks.slice(start, end);
    },
  },
  methods: {
    // Fetch tasks from the tasks.json (located in public folder)
    async fetchTasks() {
      try {
        const response = await fetch('/tasks.json');
        this.tasks = response.data;
        this.filteredTasks = this.tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    // Apply filter based on date range and status
    applyFilter(startDate, endDate, statusFilter) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.statusFilter = statusFilter;

      this.filteredTasks = this.tasks.filter((task) => {
        const taskDate = new Date(task.createdDate);
        const startDateObj = this.startDate ? new Date(this.startDate) : null;
        const endDateObj = this.endDate ? new Date(this.endDate) : null;
        const matchesDate =
          (!startDateObj || taskDate >= startDateObj) &&
          (!endDateObj || taskDate <= endDateObj);
        const matchesStatus =
          !this.statusFilter || task.status === this.statusFilter;
        return matchesDate && matchesStatus;
      });
      this.sortTasks(); // Re-sort the tasks after filtering
    },

    // Sort the table by column
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortOrder = -this.sortOrder; // Toggle the sorting order
      } else {
        this.sortColumn = column;
        this.sortOrder = 1; // Set default to ascending
      }
      this.sortTasks();
    },

    // Sort the tasks array based on selected column
    sortTasks() {
      this.filteredTasks.sort((a, b) => {
        let aValue = a[this.sortColumn];
        let bValue = b[this.sortColumn];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return -this.sortOrder;
        if (aValue > bValue) return this.sortOrder;
        return 0;
      });
    },

    // Delete a task by ID
    deleteTask(id) {
      this.filteredTasks = this.filteredTasks.filter(task => task._id !== id);
    },

    // Update task status to 'completed'
    updateTask(id) {
      const task = this.filteredTasks.find(task => task._id === id);
      if (task) {
        task.status = 'completed'; // Mark the task as completed
      }
    },

    // Navigate to the next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    // Navigate to the previous page
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    // Get class for the sorting icon based on column and order
    getSortIconClass(column) {
      if (this.sortColumn === column) {
        return this.sortOrder === 1 ? 'asc' : 'desc';
      }
      return '';
    },
  },
};
</script>

<style scoped>
.task-table {
  width: 100%;
  margin-bottom: 20px;
}

.task-table table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.task-table th {
  background-color: #f4f4f4;
  cursor: pointer;
}

.task-table td button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.task-table td button:hover {
  background-color: #0056b3;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #e0e0e0;
}

.pagination span {
  font-size: 16px;
}

.asc::after {
  content: ' ▲';
}

.desc::after {
  content: ' ▼';
}
</style>
