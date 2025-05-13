let tarefas = [
    { id: 1, titulo: "Estudar para a prova", concluida: false },
    { id: 2, titulo: "Fazer um projeto de arte", concluida: true },
    { id: 3, titulo: "Ler um livro", concluida: false },
    { id: 4, titulo: "Arrumar o quarto", concluida: true },
    { id: 5, titulo: "Fazer exercício físico", concluida: false }
  ];
  
  function gerarId() {
    if (tarefas.length > 0) {
      return Math.max(...tarefas.map(t => t.id)) + 1;
    } else {
      return 1;
    }
  }
  
  function adicionarTarefa() {
    const input = document.getElementById("novaTarefa");
    const titulo = input.value.trim();
  
    if (titulo !== "") {
      const nova = {
        id: gerarId(),
        titulo: titulo,
        concluida: false
      };
      tarefas.push(nova);
      input.value = "";
      renderizarTarefas(document.getElementById("filtro").value);
    } else {
      alert("Digite uma tarefa válida.");
    }
  }
  
  function alternarTarefa(id) {
    tarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          concluida: !tarefa.concluida
        };
      } else {
        return tarefa;
      }
    });
  
    renderizarTarefas(document.getElementById("filtro").value);
  }
  
  function apagarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    renderizarTarefas(document.getElementById("filtro").value);
  }
  
  function renderizarTarefas(filtro = "todas") {
    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";
  
    let filtradas = tarefas;
  
    if (filtro === "concluidas") {
      filtradas = tarefas.filter(t => t.concluida);
    } else if (filtro === "pendentes") {
      filtradas = tarefas.filter(t => !t.concluida);
    }
  
    filtradas.forEach(tarefa => {
      const li = document.createElement("li");
      li.className = tarefa.concluida ? "concluida" : "";
  
      li.innerHTML = `
        <span>${tarefa.titulo}</span>
        <div>
          <input type="checkbox" ${tarefa.concluida ? "checked" : ""} onchange="alternarTarefa(${tarefa.id})">
          <button onclick="apagarTarefa(${tarefa.id})">🗑️</button>
        </div>
      `;
  
      lista.appendChild(li);
    });
  }
  
  document.getElementById("filtro").addEventListener("change", function(e) {
    renderizarTarefas(e.target.value);
  });
  
  renderizarTarefas();
  