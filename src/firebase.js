// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseconfig";
import { getDatabase, ref, onValue, set, get, remove } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

const taskIdRef = ref(database, "taskId");
var currentTaskId;
onValue(taskIdRef, (snapshot) => {
    currentTaskId = snapshot.val();
});

export function newTaskId() {
    const value = currentTaskId;
    set(taskIdRef, value + 1);
    return value;
}

export function dbWriteTask(task) {
    set(ref(database, "tasks/" + task.taskId), task);
}

export function dbDeleteTask(task) {
    remove(ref(database, "tasks/" + task.taskId));
}

export async function dbGetTasks() {
    return get(ref(database, "tasks"));
}
