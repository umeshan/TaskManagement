<template>
  <div id="task-manager">
    <div id="task-table">
      <h2>Task Manager</h2>
      <div class="container">
        <div class="filters">
          <div class="date-filters">
            <div class="date-inputs">
              <input
                type="date"
                v-model="startDate"
                placeholder="Start Date"
                @change="validateDates"
              />
              <input
                type="date"
                v-model="endDate"
                placeholder="End Date"
                :min="startDate"
                @change="validateDates"
              />
            </div>
            <p v-if="dateError" class="filter error-message">{{ dateError }}</p>
            <p v-else class="error-placeholder"></p>
          </div>
          <div class="filter-actions">
            <select v-model="statusFilter">
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              @click="applyFilter"
              class="filter-button"
              :disabled="dateError"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <div class="container-second-line">
        <div class="records-per-page">
          <label for="itemsPerPage">Records per page:</label>
          <select v-model="itemsPerPage" @change="applyFilter">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div class="add-task">
          <button @click="showModal" class="button add-button">Add Task</button>
        </div>
        <div class="bulk-update">
          <button
            @click="bulkUpdate"
            :disabled="!selectAll"
            class="button bulk-update-button"
          >
            Bulk Update
          </button>
        </div>
      </div>
      <table class="task-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                v-model="selectAll"
                @change="toggleSelectAll"
              />
            </th>
            <th @click="sortTable('title')">
              Title <span :class="getSortIconClass('title')"></span>
            </th>
            <th @click="sortTable('status')">
              Status <span :class="getSortIconClass('status')"></span>
            </th>
            <th @click="sortTable('priority')">
              Priority <span :class="getSortIconClass('priority')"></span>
            </th>
            <th @click="sortTable('createdDate')">
              Created Date
              <span :class="getSortIconClass('createdDate')"></span>
            </th>
            <th style="width: 200px">Actions</th>
            <!-- Set a fixed width for actions column -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in paginatedTasks" :key="task._id">
            <td>
              <input
                type="checkbox"
                v-model="selectedTasks"
                :value="task._id"
              />
            </td>
            <td>{{ task.title }}</td>
            <td>
              <select
                v-model="task.status"
                @change="updateTask(task._id, 'status', task.status)"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </td>
            <td>
              <select
                v-model="task.priority"
                @change="updateTask(task._id, 'priority', task.priority)"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </td>
            <td>{{ formatDate(task.createdDate) }}</td>
            <td class="actions-column">
              <button
                v-if="!selectAll && selectedTasks.includes(task._id)"
                @click="updateTask(task._id)"
                class="update-button"
              >
                Update
              </button>
              <button
                v-if="!selectAll && selectedTasks.includes(task._id)"
                @click="deleteTask(task._id)"
                class="delete-button"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button
          @click="goToFirstPage"
          :disabled="currentPage === 1"
          class="page-button"
        >
          First
        </button>
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="page-button"
        >
          Previous
        </button>
        <span class="page-info"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="page-button"
        >
          Next
        </button>
        <button
          @click="goToLastPage"
          :disabled="currentPage === totalPages"
          class="page-button"
        >
          Last
        </button>
      </div>

      <!-- Add Task Modal -->
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal">
          <span class="close" @click="closeModal">&times;</span>
          <h3>Add New Task</h3>
          <form @submit.prevent="submitForm" class="modal-form">
            <label for="title">Title</label>
            <input
              type="text"
              v-model="newTask.title"
              id="title"
              :class="{ 'input-error': formErrors.title }"
              placeholder="Enter task title"
              @blur="removeError('title')"
            />
            <span v-if="formErrors.title" class="model error-message"
              >Title is required</span
            >
            <span v-else class="model error-placeholder"></span>

            <label for="status">Status</label>
            <select
              v-model="newTask.status"
              id="status"
              :class="{ 'input-error': formErrors.status }"
              @blur="removeError('status')"
            >
              <option value="">Select Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <span v-if="formErrors.status" class="model error-message"
              >Status is required</span
            >
            <span v-else class="model error-placeholder"></span>

            <label for="priority">Priority</label>
            <select
              v-model="newTask.priority"
              id="priority"
              :class="{ 'input-error': formErrors.priority }"
              @blur="removeError('priority')"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <span v-if="formErrors.priority" class="model error-message"
              >Priority is required</span
            >
            <span v-else class="model error-placeholder"></span>

            <div class="modal-actions">
              <button type="submit" class="submit-button">Submit</button>
              <button type="button" @click="closeModal" class="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      startDate: "",
      endDate: "",
      statusFilter: "",
      currentPage: 1,
      itemsPerPage: 5,
      sortColumn: "",
      sortOrder: 1,
      isModalVisible: false,
      newTask: {
        title: "",
        status: "",
        priority: "",
      },
      formErrors: {
        title: false,
        status: false,
        priority: false,
      },
      selectAll: false,
      selectedTasks: [],
      editedTasks: {},
      dateError: null,
    };
  },
  created() {
    this.getTasks();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.filteredTasks.slice(start, end);
    },
  },
  methods: {
    async getTasks() {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/tasks`);
        this.tasks = response.data;
        this.applyFilter();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    validateDates() {
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;

      if (startDate && endDate && startDate > endDate) {
        this.dateError = "Start date cannot be greater than end date.";
      } else {
        this.dateError = null;
      }
    },

    applyFilter() {
      this.filteredTasks = this.tasks.filter((task) => {
        const taskDate = new Date(task.createdDate);
        const startDate = this.startDate ? new Date(this.startDate) : null;
        const endDate = this.endDate ? new Date(this.endDate) : null;
        const matchesDate =
          (!startDate || taskDate >= startDate) &&
          (!endDate || taskDate <= endDate);
        const matchesStatus =
          !this.statusFilter || task.status === this.statusFilter;
        return matchesDate && matchesStatus;
      });
      this.sortTasks(); // Sort filtered tasks
      this.applyPagination();
    },

    // Update the filtered tasks based on pagination
    applyPagination() {
      if (!Array.isArray(this.filteredTasks)) {
        this.filteredTasks = []; // Ensure it's an array to prevent errors
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // Slice the tasks to show only the current page tasks
      this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
      this.selectedTasks = []; // Clear selected tasks when changing the page
      this.selectAll = false; // Uncheck the selectAll checkbox when changing the page
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortOrder = -this.sortOrder;
      } else {
        this.sortColumn = column;
        this.sortOrder = 1;
      }
      this.sortTasks();
    },

    sortTasks() {
      this.filteredTasks.sort((a, b) => {
        let aValue = a[this.sortColumn];
        let bValue = b[this.sortColumn];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return -this.sortOrder;
        if (aValue > bValue) return this.sortOrder;
        return 0;
      });
    },

    async deleteTask(id) {
      try {
        await axios.delete(`${config.API_BASE_URL}/tasks/${id}`);
        this.getTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async updateTask(id, field = null, value = null) {
      try {
        if (field && value) {
          const updatedData = {
            [field]: value,
          };
          await axios.put(`${config.API_BASE_URL}/tasks/${id}`, updatedData);
        } else {
          //await axios.put(`${config.API_BASE_URL}/tasks/${id}`, { status: "completed" });
        }
        this.getTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },

    formatDate(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString();
    },

    goToFirstPage() {
      this.currentPage = 1;
    },

    goToLastPage() {
      this.currentPage = this.totalPages;
    },

    nextPage() {
      if (
        this.currentPage <
        Math.ceil(this.filteredTasks.length / this.itemsPerPage)
      ) {
        this.currentPage++;
        this.applyPagination();
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.applyPagination();
      }
    },

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedTasks = this.filteredTasks.map((task) => task._id);
      } else {
        this.selectedTasks = [];
      }
    },

    getSortIconClass(column) {
      if (this.sortColumn === column) {
        return this.sortOrder === 1 ? "asc" : "desc";
      }
      return "";
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    },

    resetForm() {
      this.newTask = {
        title: "",
        status: "",
        priority: "",
      };
      this.formErrors = {
        title: false,
        status: false,
        priority: false,
      };
    },

    removeError(field) {
      this.formErrors[field] = false;
    },

    submitForm() {
      let isValid = true;
      if (!this.newTask.title) {
        this.formErrors.title = true;
        isValid = false;
      }
      if (!this.newTask.status) {
        this.formErrors.status = true;
        isValid = false;
      }
      if (!this.newTask.priority) {
        this.formErrors.priority = true;
        isValid = false;
      }

      if (isValid) {
        this.addTask();
      }
    },

    async addTask() {
      const newTask = {
        _id: Date.now().toString(),
        title: this.newTask.title,
        status: this.newTask.status,
        priority: this.newTask.priority,
        createdDate: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          `${config.API_BASE_URL}/tasks`,
          newTask
        );
        this.tasks.push(response.data);
        this.applyFilter();
        this.closeModal();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

#task-manager {
  height: 77.28vh; 
  overflow-y: auto;
}
#task-table {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.filters input,
.filters select {
  padding: 8px 14px;
  border-radius: 20px; 
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: 400;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.filters input:focus,
.filters select:focus {
  border-color: #2196f3; 
  box-shadow: 0 0 6px rgba(33, 150, 243, 0.4); 
}

.filters input::placeholder,
.filters select {
  color: #8a8a8a; 
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
  align-items: flex-start; 
}

.filter-button {
  background-color: #2196f3; 
  color: #ffffff;
  padding: 6px 18px;
  border: none;
  border-radius: 20px; 
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.filter-button:hover {
  background-color: #1976d2; 
  box-shadow: 0 6px 12px rgba(25, 118, 210, 0.4); 
}

.filter-button:active {
  background-color: #1565c0;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.5); 
}

.filter-button:disabled {
  background-color: #bbdefb;
  color: #90caf9;
  cursor: not-allowed;
  box-shadow: none;
}

.records-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.records-per-page label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.records-per-page select {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: 400;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.records-per-page select:focus {
  border-color: #2196f3; 
  box-shadow: 0 0 6px rgba(33, 150, 243, 0.4); 
}

.records-per-page select {
  color: #8a8a8a; 
}

.records-per-page select option {
  color: #333;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.container-second-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px; 
}

.date-inputs {
  display: flex;
  gap: 10px; 
}

.date-filters {
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  min-width: 200px; 
}

.records-per-page,
.add-task {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filters input,
.filters select,
.filters button {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filters input:focus,
.filters select:focus,
.filters button:focus {
  outline: none;
  border-color: #007bff;
}

.filters input,
.filters select {
  width: 180px;
}

.filters button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.filters button:hover {
  background-color: #0056b3;
}

.filter-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.records-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-task {
  display: flex;
  align-items: center;
}

.bulk-update {
  display: flex;
  align-items: center;
}

.records-per-page select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  width: 130px;
}

.records-per-page label {
  font-size: 14px;
  color: #333;
}

.add-task button,
.bulk-update button {
  padding: 12px 18px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
}

.bulk-update {
  display: flex;
  justify-content: flex-start;
}

.bulk-update button {
  padding: 12px 18px;
  background-color: #007bff; 
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
}

.bulk-update button:disabled {
  background-color: #ccc; 
  cursor: not-allowed; 
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: stretch;
  }

  .container-second-line {
    flex-direction: column;
    gap: 15px;
  }

  .filters input,
  .filters select,
  .filters button,
  .records-per-page select,
  .add-task button,
  .bulk-update button {
    width: 100%;
  }
  .records-per-page,
  .add-task,
  .bulk-update {
    width: 100%;
    justify-content: space-between;
  }

  .records-per-page select,
  .add-task button,
  .bulk-update button {
    width: auto;
  }
}

.task-table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

td {
  vertical-align: middle;
}

select {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input[type="checkbox"] {
  margin: 0;
}

.update-button,
.delete-button {
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  margin-right: 10px;
}

.update-button {
  background-color: #2196f3;
}

.delete-button {
  background-color: #f44336;
}

.update-button:hover {
  background-color: #1976d2;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  margin: 0 6px;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.page-button:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

.page-button:disabled {
  background-color: #b3e6b3;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  margin: 0 15px;
  font-size: 16px;
  color: #555;
}

.page-button:first-child {
  background-color: #03a9f4;
}

.page-button:first-child:hover {
  background-color: #0288d1;
}

.page-button:last-child {
  background-color: #ff5722;
}

.page-button:last-child:hover {
  background-color: #e64a19;
}

.page-button.prev,
.page-button.next {
  background-color: #8bc34a;
}

.page-button.prev:hover,
.page-button.next:hover {
  background-color: #7cb342;
}

.page-info {
  margin: 0 10px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close {
  font-size: 28px;
  color: #000;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.modal h3 {
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-form input,
.modal-form select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.error-message {
  color: red;
  font-size: 12px;
}

.error-message,
.error-placeholder {
  color: red;
  font-size: 14px;
  min-height: 18px;
}

.error-placeholder {
  visibility: hidden;
}

.model.error-message,
.model.error-placeholder {
  margin-top: -10px;
  min-height: 16px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button {
  background-color: #2196f3;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.submit-button:hover {
  background-color: #1976d2;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.cancel-button:hover {
  background-color: #d32f2f;
}

select-all-checkbox {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
