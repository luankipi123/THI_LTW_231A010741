document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".todo-page")) return;

    const MSSV = "231A010741";
    const lastDigit = parseInt(MSSV[MSSV.length - 1]); // số 1 → lẻ → xanh dương

    const nameInput = document.getElementById("taskName");
    const prioritySelect = document.getElementById("priority");
    const addBtn = document.getElementById("addTask");

    const storageKey = "tasks_231A010741";
    let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

    function renderTasks() {
        [1, 2, 3, 4].forEach(i => {
            document.getElementById("p" + i).innerHTML =
                `<h3>${i} - ${document.querySelector("#p" + i + " h3").innerText.split(" - ")[1]}</h3>`;
        });

        tasks.forEach(t => {
            const div = document.createElement("div");
            div.className = "task";
            div.innerText = t.name;

            if (t.name.length > 10) {
                div.style.color = (lastDigit % 2 === 0) ? "red" : "blue";
            }

            document.getElementById("p" + t.priority).appendChild(div);
        });
    }

    addBtn.onclick = () => {
        const name = nameInput.value.trim();
        const pr = parseInt(prioritySelect.value);

        if (name === "") {
            alert("Nhập tên công việc!");
            return;
        }

        tasks.push({ name, priority: pr });

        localStorage.setItem(storageKey, JSON.stringify(tasks));
        renderTasks();

        nameInput.value = "";
    };

    renderTasks();
});
