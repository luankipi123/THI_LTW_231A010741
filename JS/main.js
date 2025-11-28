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
document.addEventListener("DOMContentLoaded", () => {

    const seatContainer = document.getElementById("seat-container");
    if (!seatContainer) return; // Không phải trang Booking

    let seatData = [];
    const prices = {
        standard: 50000,
        vip: 80000,
        double: 150000
    };

    let selectedSeats = [];

    function renderSeats() {
        seatContainer.innerHTML = "";

        for (let row = 1; row <= 5; row++) {
            for (let col = 1; col <= 8; col++) {

                let type =
                    row <= 2 ? "standard" :
                        row <= 4 ? "vip" :
                            "double";

                const seatId = `${row}-${col}`;
                const isSold = Math.random() < 0.1; // Random ghế bán

                seatData.push({
                    id: seatId,
                    type,
                    sold: isSold
                });

                const seat = document.createElement("div");
                seat.classList.add("seat", type);
                seat.setAttribute("data-id", seatId);
                seat.setAttribute("data-type", type);

                if (isSold) seat.classList.add("sold");

                seat.addEventListener("click", () => selectSeat(seat));

                seatContainer.appendChild(seat);
            }
        }
    }

    function selectSeat(seat) {
        if (seat.classList.contains("sold")) return;

        const id = seat.getAttribute("data-id");

        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            selectedSeats = selectedSeats.filter(s => s !== id);
        } else {
            if (selectedSeats.length >= 5) {
                alert("Không được chọn quá 5 ghế!");
                return;
            }
            seat.classList.add("selected");
            selectedSeats.push(id);
        }

        updateSummary();
    }

    function updateSummary() {
        document.getElementById("count").textContent = selectedSeats.length;

        let total = 0;
        selectedSeats.forEach(id => {
            const seat = seatData.find(s => s.id === id);
            total += prices[seat.type];
        });

        document.getElementById("total").textContent = total.toLocaleString();
    }

    // Modal
    const modal = document.getElementById("modal");
    const summary = document.getElementById("summary");
    document.getElementById("checkoutBtn").onclick = () => {
        modal.style.display = "flex";
        summary.textContent = `Ghế: ${selectedSeats.join(", ")}`
            + `\nTổng tiền: ${document.getElementById("total").textContent} VND`;
    };

    document.getElementById("closeModal").onclick = () =>
        modal.style.display = "none";

    renderSeats();
});
