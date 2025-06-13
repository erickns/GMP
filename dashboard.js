// Variáveis globais
let currentUser = null;
let editingProductId = null;
let editingInsumoId = null;
let editingCalculoId = null;

// Inicialização do dashboard
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard loaded");

  // Verificar se o usuário está logado
  console.log(localStorage.getItem("currentUser"));

  const userData = localStorage.getItem("currentUser");
  if (!userData) {
    console.log("User not logged in, redirecting to login");
    window.location.href = "login.html";
    return;
  }

  currentUser = JSON.parse(userData);
  console.log("User logged in:", currentUser);

  initializeDashboard();
});

function initializeDashboard() {
  // Event listeners
  document.getElementById("logout-btn").addEventListener("click", handleLogout);

  // Event listeners para navegação
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const section = this.getAttribute("data-section");
      showSection(section);
    });
  });

  // Event listeners para formulários
  document
    .getElementById("product-form")
    .addEventListener("submit", handleProductSubmit);
  document
    .getElementById("insumo-form")
    .addEventListener("submit", handleInsumoSubmit);
  document
    .getElementById("calculo-form")
    .addEventListener("submit", handleCalculoSubmit);

  // Event listener para análise de sensibilidade
  document
    .getElementById("calculo-analise")
    .addEventListener("change", showAnalise);

  // Carregar dados iniciais
  loadDashboardData();
  loadProdutosTable();
  loadInsumosTable();
  loadCalculosTable();
  loadCalculoAnaliseOptions();
}

// Autenticação
function handleLogout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Navegação
function showSection(sectionName) {
  // Remover active de todas as seções
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Remover active de todos os botões de navegação
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Ativar seção e botão correspondentes
  document.getElementById(sectionName + "-section").classList.add("active");
  document
    .querySelector(`[data-section="${sectionName}"]`)
    .classList.add("active");

  // Recarregar dados se necessário
  if (sectionName === "dashboard") {
    loadDashboardData();
  } else if (sectionName === "produtos") {
    loadProdutosTable();
  } else if (sectionName === "insumos") {
    loadInsumosTable();
  } else if (sectionName === "calculos") {
    loadCalculosTable();
  }
}

// Dashboard
function loadDashboardData() {
  document.getElementById("total-produtos").textContent =
    mockData.produtos.length;
  document.getElementById("total-insumos").textContent =
    mockData.insumos.length;
  document.getElementById("total-calculos").textContent =
    mockData.calculos.length;

  // Carregar cálculos recentes
  const recentCalculationsTable = document.getElementById(
    "recent-calculations-table"
  );
  const recentCalculations = mockData.calculos.slice(-5).reverse();

  recentCalculationsTable.innerHTML = recentCalculations
    .map(
      (calculo) => `
        <tr>
            <td>${calculo.nome}</td>
            <td>${formatCurrency(calculo.precoCalculado)}</td>
            <td>${formatDate(calculo.data)}</td>
            <td>
                <button class="btn btn-small btn-primary" onclick="viewCalculo(${
                  calculo.id
                })">Ver</button>
                <button class="btn btn-small btn-secondary" onclick="editCalculo(${
                  calculo.id
                })">Editar</button>
            </td>
        </tr>
    `
    )
    .join("");
}

// Produtos
function loadProdutosTable() {
  const produtosTable = document.getElementById("produtos-table");
  produtosTable.innerHTML = mockData.produtos
    .map(
      (produto) => `
        <tr>
            <td>${produto.nome}</td>
            <td>${produto.tipo === "produto" ? "Produto" : "Serviço"}</td>
            <td>${produto.categoria}</td>
            <td>
                <button class="btn btn-small btn-secondary" onclick="editProduct(${
                  produto.id
                })">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteProduct(${
                  produto.id
                })">Excluir</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function showProductForm() {
  editingProductId = null;
  document.getElementById("product-modal-title").textContent =
    "Novo Produto/Serviço";
  document.getElementById("product-form").reset();
  document.getElementById("product-modal").style.display = "block";
}

function editProduct(id) {
  const produto = mockData.produtos.find((p) => p.id === id);
  if (produto) {
    editingProductId = id;
    document.getElementById("product-modal-title").textContent =
      "Editar Produto/Serviço";
    document.getElementById("product-name").value = produto.nome;
    document.getElementById("product-type").value = produto.tipo;
    document.getElementById("product-category").value = produto.categoria;
    document.getElementById("product-modal").style.display = "block";
  }
}

function deleteProduct(id) {
  if (confirm("Tem certeza que deseja excluir este produto/serviço?")) {
    mockData.produtos = mockData.produtos.filter((p) => p.id !== id);
    loadProdutosTable();
    loadDashboardData();
  }
}

function closeProductModal() {
  document.getElementById("product-modal").style.display = "none";
}

function handleProductSubmit(e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("product-name").value,
    tipo: document.getElementById("product-type").value,
    categoria: document.getElementById("product-category").value,
  };

  // Simular chamada ao backend
  setTimeout(() => {
    if (editingProductId) {
      // Editar produto existente
      const index = mockData.produtos.findIndex(
        (p) => p.id === editingProductId
      );
      if (index !== -1) {
        mockData.produtos[index] = { ...mockData.produtos[index], ...formData };
      }
    } else {
      // Criar novo produto
      const newId = Math.max(...mockData.produtos.map((p) => p.id)) + 1;
      mockData.produtos.push({ id: newId, ...formData });
    }

    loadProdutosTable();
    loadDashboardData();
    closeProductModal();
  }, 300);
}

// Insumos
function loadInsumosTable() {
  const insumosTable = document.getElementById("insumos-table");
  insumosTable.innerHTML = mockData.insumos
    .map(
      (insumo) => `
        <tr>
            <td>${insumo.nome}</td>
            <td>${formatCurrency(insumo.custo)}</td>
            <td>${insumo.unidade}</td>
            <td>
                <button class="btn btn-small btn-secondary" onclick="editInsumo(${
                  insumo.id
                })">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteInsumo(${
                  insumo.id
                })">Excluir</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function showInsumoForm() {
  editingInsumoId = null;
  document.getElementById("insumo-modal-title").textContent = "Novo Insumo";
  document.getElementById("insumo-form").reset();
  document.getElementById("insumo-modal").style.display = "block";
}

function editInsumo(id) {
  const insumo = mockData.insumos.find((i) => i.id === id);
  if (insumo) {
    editingInsumoId = id;
    document.getElementById("insumo-modal-title").textContent = "Editar Insumo";
    document.getElementById("insumo-name").value = insumo.nome;
    document.getElementById("insumo-cost").value = insumo.custo;
    document.getElementById("insumo-unit").value = insumo.unidade;
    document.getElementById("insumo-modal").style.display = "block";
  }
}

function deleteInsumo(id) {
  if (confirm("Tem certeza que deseja excluir este insumo?")) {
    mockData.insumos = mockData.insumos.filter((i) => i.id !== id);
    loadInsumosTable();
    loadDashboardData();
    updateInsumoSelects();
  }
}

function closeInsumoModal() {
  document.getElementById("insumo-modal").style.display = "none";
}

function handleInsumoSubmit(e) {
  e.preventDefault();

  const formData = {
    nome: document.getElementById("insumo-name").value,
    custo: parseFloat(document.getElementById("insumo-cost").value),
    unidade: document.getElementById("insumo-unit").value,
  };

  // Simular chamada ao backend
  setTimeout(() => {
    if (editingInsumoId) {
      // Editar insumo existente
      const index = mockData.insumos.findIndex((i) => i.id === editingInsumoId);
      if (index !== -1) {
        mockData.insumos[index] = { ...mockData.insumos[index], ...formData };
      }
    } else {
      // Criar novo insumo
      const newId = Math.max(...mockData.insumos.map((i) => i.id)) + 1;
      mockData.insumos.push({ id: newId, ...formData });
    }

    loadInsumosTable();
    loadDashboardData();
    updateInsumoSelects();
    closeInsumoModal();
  }, 300);
}

// Cálculos
function loadCalculosTable() {
  const calculosTable = document.getElementById("calculos-table");
  calculosTable.innerHTML = mockData.calculos
    .map(
      (calculo) => `
        <tr>
            <td>${calculo.nome}</td>
            <td>${calculo.tipo === "produto" ? "Produto" : "Serviço"}</td>
            <td>${formatCurrency(calculo.precoCalculado)}</td>
            <td>${formatDate(calculo.data)}</td>
            <td>
                <button class="btn btn-small btn-primary" onclick="viewCalculo(${
                  calculo.id
                })">Ver</button>
                <button class="btn btn-small btn-secondary" onclick="editCalculo(${
                  calculo.id
                })">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteCalculo(${
                  calculo.id
                })">Excluir</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function showCalculoForm() {
  editingCalculoId = null;
  document.getElementById("calculo-modal-title").textContent =
    "Novo Cálculo de Preço";
  document.getElementById("calculo-form").reset();
  document.getElementById("resultado-calculo").style.display = "none";
  document.getElementById("salvar-calculo-btn").style.display = "none";
  updateInsumoSelects();
  document.getElementById("calculo-modal").style.display = "block";
}

function editCalculo(id) {
  const calculo = mockData.calculos.find((c) => c.id === id);
  if (calculo) {
    editingCalculoId = id;
    document.getElementById("calculo-modal-title").textContent =
      "Editar Cálculo de Preço";
    document.getElementById("calculo-name").value = calculo.nome;
    document.getElementById("calculo-type").value = calculo.tipo;
    toggleCalculoType();

    // Simular preenchimento dos campos (simplificado para o protótipo)
    document.getElementById("margem-lucro").value = "30";

    updateInsumoSelects();
    document.getElementById("calculo-modal").style.display = "block";
  }
}

function viewCalculo(id) {
  const calculo = mockData.calculos.find((c) => c.id === id);
  if (calculo) {
    editingCalculoId = id;
    document.getElementById("calculo-modal-title").textContent =
      "Visualizar Cálculo";
    document.getElementById("calculo-name").value = calculo.nome;
    document.getElementById("calculo-type").value = calculo.tipo;
    toggleCalculoType();

    // Mostrar resultado
    showCalculoResult(calculo);

    updateInsumoSelects();
    document.getElementById("calculo-modal").style.display = "block";
  }
}

function deleteCalculo(id) {
  if (confirm("Tem certeza que deseja excluir este cálculo?")) {
    mockData.calculos = mockData.calculos.filter((c) => c.id !== id);
    loadCalculosTable();
    loadDashboardData();
    loadCalculoAnaliseOptions();
  }
}

function closeCalculoModal() {
  document.getElementById("calculo-modal").style.display = "none";
}

function toggleCalculoType() {
  const tipo = document.getElementById("calculo-type").value;
  const produtoSection = document.getElementById("produto-calculo");
  const servicoSection = document.getElementById("servico-calculo");

  if (tipo === "produto") {
    produtoSection.style.display = "block";
    servicoSection.style.display = "none";
  } else if (tipo === "servico") {
    produtoSection.style.display = "none";
    servicoSection.style.display = "block";
  } else {
    produtoSection.style.display = "none";
    servicoSection.style.display = "none";
  }
}

function updateInsumoSelects() {
  const selects = document.querySelectorAll(".insumo-select");
  const options = mockData.insumos
    .map(
      (insumo) =>
        `<option value="${insumo.id}">${insumo.nome} (${formatCurrency(
          insumo.custo
        )}/${insumo.unidade})</option>`
    )
    .join("");

  selects.forEach((select) => {
    const currentValue = select.value;
    select.innerHTML =
      '<option value="">Selecione um insumo...</option>' + options;
    select.value = currentValue;
  });
}

function addInsumo() {
  const container = document.getElementById("receita-insumos");
  const newInsumo = document.createElement("div");
  newInsumo.className = "insumo-item";
  newInsumo.innerHTML = `
        <select class="insumo-select">
            <option value="">Selecione um insumo...</option>
            ${mockData.insumos
              .map(
                (insumo) =>
                  `<option value="${insumo.id}">${
                    insumo.nome
                  } (${formatCurrency(insumo.custo)}/${
                    insumo.unidade
                  })</option>`
              )
              .join("")}
        </select>
        <input type="number" class="insumo-quantidade" placeholder="Quantidade" step="0.01">
        <button type="button" class="btn btn-small btn-danger" onclick="removeInsumo(this)">Remover</button>
    `;
  container.appendChild(newInsumo);
}

function removeInsumo(button) {
  button.parentElement.remove();
}

function calcularPreco() {
  const tipo = document.getElementById("calculo-type").value;
  let custoTotal = 0;

  if (tipo === "produto") {
    custoTotal =
      parseFloat(document.getElementById("custo-aquisicao").value) || 0;
  } else if (tipo === "servico") {
    // Calcular custo dos insumos
    const insumoItems = document.querySelectorAll(".insumo-item");
    insumoItems.forEach((item) => {
      const insumoId = parseInt(item.querySelector(".insumo-select").value);
      const quantidade =
        parseFloat(item.querySelector(".insumo-quantidade").value) || 0;

      if (insumoId && quantidade > 0) {
        const insumo = mockData.insumos.find((i) => i.id === insumoId);
        if (insumo) {
          custoTotal += insumo.custo * quantidade;
        }
      }
    });

    // Adicionar custos adicionais
    custoTotal +=
      parseFloat(document.getElementById("custo-mao-obra").value) || 0;
    custoTotal +=
      parseFloat(document.getElementById("custo-embalagem").value) || 0;
  }

  const impostosPercentual =
    parseFloat(document.getElementById("impostos-percentual").value) || 0;
  const encargosFix =
    parseFloat(document.getElementById("encargos-fixos").value) || 0;
  const margemLucro =
    parseFloat(document.getElementById("margem-lucro").value) || 0;

  // Cálculo simplificado
  const impostos = custoTotal * (impostosPercentual / 100);
  const custoComImpostos = custoTotal + impostos + encargosFix;
  const precoFinal = custoComImpostos / (1 - margemLucro / 100);
  const lucro = precoFinal - custoComImpostos;

  const resultado = {
    custoTotal: custoTotal,
    impostos: impostos,
    encargos: encargosFix,
    lucro: lucro,
    precoCalculado: precoFinal,
  };

  showCalculoResult(resultado);
}

function showCalculoResult(resultado) {
  document.getElementById("preco-final-valor").textContent = formatCurrency(
    resultado.precoCalculado
  );
  document.getElementById("composicao-custo").textContent = formatCurrency(
    resultado.custoTotal
  );
  document.getElementById("composicao-impostos").textContent = formatCurrency(
    resultado.impostos
  );
  document.getElementById("composicao-encargos").textContent = formatCurrency(
    resultado.encargos
  );
  document.getElementById("composicao-lucro").textContent = formatCurrency(
    resultado.lucro
  );

  document.getElementById("resultado-calculo").style.display = "block";
  document.getElementById("salvar-calculo-btn").style.display = "inline-block";
}

function handleCalculoSubmit(e) {
  e.preventDefault();

  const nome = document.getElementById("calculo-name").value;
  const tipo = document.getElementById("calculo-type").value;

  // Pegar dados do resultado atual
  const precoText = document.getElementById("preco-final-valor").textContent;
  const precoCalculado = parseFloat(
    precoText.replace("R$", "").replace(".", "").replace(",", ".").trim()
  );

  const custoText = document.getElementById("composicao-custo").textContent;
  const custoTotal = parseFloat(
    custoText.replace("R$", "").replace(".", "").replace(",", ".").trim()
  );

  const impostosText = document.getElementById(
    "composicao-impostos"
  ).textContent;
  const impostos = parseFloat(
    impostosText.replace("R$", "").replace(".", "").replace(",", ".").trim()
  );

  const encargosText = document.getElementById(
    "composicao-encargos"
  ).textContent;
  const encargos = parseFloat(
    encargosText.replace("R$", "").replace(".", "").replace(",", ".").trim()
  );

  const lucroText = document.getElementById("composicao-lucro").textContent;
  const lucro = parseFloat(
    lucroText.replace("R$", "").replace(".", "").replace(",", ".").trim()
  );

  const calculoData = {
    nome: nome,
    tipo: tipo,
    precoCalculado: precoCalculado,
    data: new Date().toISOString().split("T")[0],
    custoTotal: custoTotal,
    impostos: impostos,
    encargos: encargos,
    lucro: lucro,
  };

  // Simular chamada ao backend
  setTimeout(() => {
    if (editingCalculoId) {
      // Editar cálculo existente
      const index = mockData.calculos.findIndex(
        (c) => c.id === editingCalculoId
      );
      if (index !== -1) {
        mockData.calculos[index] = {
          ...mockData.calculos[index],
          ...calculoData,
        };
      }
    } else {
      // Criar novo cálculo
      const newId = Math.max(...mockData.calculos.map((c) => c.id)) + 1;
      mockData.calculos.push({ id: newId, ...calculoData });
    }

    loadCalculosTable();
    loadDashboardData();
    loadCalculoAnaliseOptions();
    closeCalculoModal();
  }, 300);
}

// Relatórios
function loadCalculoAnaliseOptions() {
  const select = document.getElementById("calculo-analise");
  select.innerHTML =
    '<option value="">Selecione um cálculo...</option>' +
    mockData.calculos
      .map(
        (calculo) => `<option value="${calculo.id}">${calculo.nome}</option>`
      )
      .join("");
}

function showAnalise() {
  const calculoId = parseInt(document.getElementById("calculo-analise").value);
  const resultadoDiv = document.getElementById("resultado-analise");

  if (calculoId) {
    resultadoDiv.style.display = "block";
  } else {
    resultadoDiv.style.display = "none";
  }
}

// Event listeners para fechar modais clicando fora
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
