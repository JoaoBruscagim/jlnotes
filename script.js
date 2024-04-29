const notesForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openNoteFormBtn = document.getElementById("open-task-form-btn");
const closeNoteFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateNotesBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const notesContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");

const notesData = JSON.parse(localStorage.getItem("data")) || [];
let currentNote = {};

const addOrUpdateNotes = () => {
    addOrUpdateNotesBtn.innerText = "Add Note";
    const dataArrIndex = notesData.findIndex((item) => item.id === currentNote.id);
    const noteObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dataAtual(),
        description: descriptionInput.value,
    };

    if (dataArrIndex === -1) {
        notesData.unshift(noteObj);
    } else {
        notesData[dataArrIndex] = noteObj;
    }

    localStorage.setItem("data", JSON.stringify(notesData));
    updateNotesContainer()
    reset()
};

const updateNotesContainer = () => {
    notesContainer.innerHTML = "";

    notesData.forEach(
        ({ id, title, date, description }) => {
            (notesContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Título:</strong> ${title}</p>
          <p><strong>Data:</strong> ${date}</p>
          <p><strong>Anotações:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Editar</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Excluir</button> 
        </div>
      `)
        }
    );
};


const deleteTask = (buttonEl) => {
    const dataArrIndex = notesData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    buttonEl.parentElement.remove();
    notesData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(notesData));
    checkNotes();
}

const editTask = (buttonEl) => {
    const dataArrIndex = notesData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    currentNote = notesData[dataArrIndex];

    titleInput.value = currentNote.title;
    descriptionInput.value = currentNote.description;

    addOrUpdateNotesBtn.innerText = "Atualizar nota";

    notesForm.classList.toggle("hidden");
}

const reset = () => {
    titleInput.value = "";
    descriptionInput.value = "";
    notesForm.classList.toggle("hidden");
    currentNote = {};
}

const dataAtual = () => {
        var dataHoraAtual = new Date();
      
        // Obtém os componentes da data e hora
        var dia = dataHoraAtual.getDate();
        var mes = dataHoraAtual.getMonth() + 1; // Mês é indexado a partir de zero, então adicionamos 1
        var ano = dataHoraAtual.getFullYear();
        var horas = dataHoraAtual.getHours();
        var minutos = dataHoraAtual.getMinutes();
      
        // Formata a data e hora para exibição
        var dataFormatada = `${dia}/${mes}/${ano}`;
        var horaFormatada = `${horas}:${minutos}`
      
        // Retorna a data e hora formatadas
        return `${dataFormatada},${horaFormatada}`
}

const checkNotes = () => {
    var notes = JSON.parse(localStorage.getItem("data"))

    if(notes.length > 0){
        updateNotesContainer()
        console.log('sim')
    }else{
        notesContainer.innerHTML = 
        `<div id="empty">Poxa, nenhuma anotação... 😢</div>`
    }
}



openNoteFormBtn.addEventListener("click", () =>
    notesForm.classList.toggle("hidden")
);

window.addEventListener("load", () => {
    checkNotes();
})

closeNoteFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentNote.title || descriptionInput.value !== currentNote.description;

    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal();
    } else {
        reset();
    }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset()
});

notesForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addOrUpdateNotes();
});