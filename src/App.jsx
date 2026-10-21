import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task.trim()) return;

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: task.trim(), done: false },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="container">
      <h1>React CI/CD Task Tracker</h1>
      <p>Learning GitHub Actions with React + Vite</p>

      <div className="form">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleTask(item.id)}
              />
              <span className={item.done ? "done" : ""}>{item.title}</span>
            </label>

            <button onClick={() => deleteTask(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>
        Completed: {tasks.filter((t) => t.done).length}/{tasks.length}
      </p>
    </main>
  );
}

export default App;
