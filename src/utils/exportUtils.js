export function exportToCSV(tasks) {
  const header = ["ID", "Title", "Status", "Priority", "Created Date"];
  const rows = tasks.map((task) => [
    task._id,
    task.title,
    task.status,
    task.priority,
    task.createdDate
  ]);

  let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n";
  rows.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });

  // Create a download link for the CSV
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "tasks.csv");
  document.body.appendChild(link);
  link.click();
}
