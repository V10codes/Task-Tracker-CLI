#!/usr/bin/env node
import fs from "fs";

const directory_name = "data.json";

if (!fs.existsSync(directory_name)) {
  fs.writeFileSync(directory_name, JSON.stringify([]));
}

// if (!Array.isArray(myObject)) {
//   myObject = [];
// }

const method = process.argv[2];
if (method === "add") {
  try {
    if (process.argv[3]) {
      addTask();
    } else {
      console.log("Add description");
    }
  } catch (error) {
    console.log("Error in adding tasks", error);
  }
} else if (method == "list") {
  const filterParam = process.argv[3];
  try {
    if (!filterParam) {
      listTasks();
    } else {
      if (filterParam == "done") {
        listDoneTasks();
      } else if (filterParam == "todo") {
        listToDoTasks();
      } else if (filterParam == "in-progress") {
        listInProgressTasks();
      }
    }
  } catch (error) {
    console.log("Error in listing tasks", error);
  }
} else if (method == "update") {
  try {
    const id = process.argv[3];
    const newDescription = process.argv[4];
    if (id && newDescription) {
      updateTask(id, newDescription);
    }
  } catch (error) {
    console.log("Error in updating tasks", error);
  }
} else if (method == "delete") {
  try {
    const id = process.argv[3];
    if (id) {
      deleteTask(id);
    }
  } catch (error) {
    console.log("Error in deleting tasks", error);
  }
} else if (method == "mark-in-progress" || method == "mark-done") {
  const id = process.argv[3];
  try {
    if (method == "mark-in-progress") {
      markTaskInProgress(id);
    } else {
      markTaskDone(id);
    }
  } catch (error) {
    console.log("Error in marking tasks", error);
  }
}
function addTask() {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  const description = process.argv[3];
  const task = {
    id: (myObject.length + 1).toString(),
    description: description,
    status: "todo",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  };
  myObject.push(task);
  console.log(`Task added successfully (ID: ${myObject.length})`);
  fs.writeFileSync(directory_name, JSON.stringify(myObject));
}

function listTasks() {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  if (myObject.length === 0) {
    console.log("No tasks");
    return;
  }
  myObject.forEach((element) => {
    element &&
      console.log(
        element.id +
          "|" +
          element.description +
          "|" +
          element.status +
          "|" +
          element.createdAt +
          "|" +
          element.updatedAt
      );
  });
}

function listDoneTasks() {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  if (myObject.length === 0) {
    console.log("No Done tasks");
    return;
  }
  myObject.forEach((element) => {
    element.status == "done" &&
      console.log(
        element.id +
          "|" +
          element.description +
          "|" +
          element.status +
          "|" +
          element.createdAt +
          "|" +
          element.updatedAt
      );
  });
}
function listToDoTasks() {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  if (myObject.length === 0) {
    console.log("No To Do tasks");
    return;
  }
  myObject.forEach((element) => {
    element.status == "todo" &&
      console.log(
        element.id +
          "|" +
          element.description +
          "|" +
          element.status +
          "|" +
          element.createdAt +
          "|" +
          element.updatedAt
      );
  });
}
function listInProgressTasks() {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  if (myObject.length === 0) {
    console.log("No In Progress Tasks");
    return;
  }
  myObject.forEach((element) => {
    element.status == "in-progress" &&
      console.log(
        element.id +
          "|" +
          element.description +
          "|" +
          element.status +
          "|" +
          element.createdAt +
          "|" +
          element.updatedAt
      );
  });
}

function markTaskInProgress(id) {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  let idExists = false;
  myObject.forEach((element) => {
    if (element.id === id) {
      element.status = "in-progress";
      element.updatedAt = new Date().toLocaleDateString();
      idExists = true;
    }
  });
  if (!idExists) {
    console.log("Id dosen't exist in file");
    return;
  }
  fs.writeFileSync(directory_name, JSON.stringify(myObject));
}
function markTaskDone(id) {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  let idExists = false;
  myObject.forEach((element) => {
    if (element.id === id) {
      element.status = "done";
      element.updatedAt = new Date().toLocaleDateString();
      idExists = true;
    }
  });
  if (!idExists) {
    console.log("Id dosen't exist in file");
    return;
  }
  fs.writeFileSync(directory_name, JSON.stringify(myObject));
}

function updateTask(id, newDescription) {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  let idExists = false;
  myObject.forEach((element) => {
    if (element.id === id) {
      element.description = newDescription;
      element.updatedAt = new Date().toLocaleDateString();
      idExists = true;
    }
  });
  if (!idExists) {
    console.log("Id dosen't exist in file");
    return;
  }
  fs.writeFileSync(directory_name, JSON.stringify(myObject));
}

function deleteTask(id) {
  let myObject = JSON.parse(fs.readFileSync(directory_name));
  const exists = myObject.find((element) => element.id === id);
  if (exists) {
    myObject = myObject.filter(function (element) {
      return element.id !== id;
    });
  } else {
    console.log("Task dosen't exist in file");
  }
  fs.writeFileSync(directory_name, JSON.stringify(myObject));
}
