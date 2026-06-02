const form = document.getElementById("addForm");
const list = document.getElementById("list");

let editId = null;
let editType = null;

function getAPI(type) {
    return `http://localhost:3001/${type}`;
}

/* ADD / UPDATE */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.getElementById("type").value;

    const newItem = {
        title: document.getElementById("title").value,
        short: document.getElementById("short").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value
    };

    // UPDATE
    if (editId !== null) {
        fetch(`${getAPI(editType)}/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        })
        .then(() => {
            alert("Updated Successfully!");
            editId = null;
            editType = null;
            form.reset();
            loadAll();
        });

        return;
    }

    // ADD
    fetch(getAPI(type), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
    })
    .then(() => {
        alert("Added Successfully!");
        form.reset();
        loadAll();
    });
});

/* LOAD ALL DATA */
function loadAll() {

    const sections = ["places", "foods", "hotels", "restaurants"];

    list.innerHTML = "";

    sections.forEach(section => {

        fetch(getAPI(section))
        .then(res => res.json())
        .then(data => {

            list.innerHTML += `
                <div class="sectionBox">
                    <h2>${section.toUpperCase()}</h2>
                </div>
            `;

            data.forEach(item => {

                list.innerHTML += `
                    <div class="adminCard"
                         data-type="${section}"
                         data-id="${item.id}">

                        <div class="cardLeft">
                            <h4>${item.title}</h4>
                            <p>${item.short}</p>
                        </div>

                        <div class="cardRight">
                            <button class="editBtn">✏️ Edit</button>
                            <button class="deleteBtn">🗑 Delete</button>
                        </div>

                    </div>
                `;
            });

        })
        .catch(err => console.log(err));

    });
}

/* EDIT + DELETE */
list.addEventListener("click", (e) => {

    const card = e.target.closest(".adminCard");

    if (!card) return;

    const type = card.dataset.type;
    const id = card.dataset.id;

    // DELETE
    if (e.target.classList.contains("deleteBtn")) {

        if (!confirm("Delete this item?")) return;

        fetch(`${getAPI(type)}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            loadAll();
        });
    }

    // EDIT
    if (e.target.classList.contains("editBtn")) {

        fetch(`${getAPI(type)}/${id}`)
        .then(res => res.json())
        .then(item => {

            document.getElementById("type").value = type;
            document.getElementById("title").value = item.title;
            document.getElementById("short").value = item.short;
            document.getElementById("description").value = item.description;
            document.getElementById("image").value = item.image;

            editId = item.id;
            editType = type;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});

/* INIT */
loadAll();