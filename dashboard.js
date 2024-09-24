let occupationData = {
    Janeiro: [70, 70, 70, 70, 67, 67, 67, 70, 80, 77, 77, 80, 80, 80, 77, 77, 77, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
    Fevereiro: [79, 79, 79, 79, 79, 79, 79, 83, 86, 86, 86, 86, 86, 86, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 90, 90],
    Março: [90, 90, 86, 86, 86, 86, 90, 90, 90, 86, 90, 86, 90, 90, 90, 90, 90, 79, 79, 86, 86, 83, 83, 83, 86, 79, 79, 76, 76],
    Abril: [88, 88, 85, 85, 85, 77, 77, 88, 88, 88, 92, 92, 92, 92, 96, 96, 96, 96, 92, 96, 96, 96, 88, 92, 92, 92, 92, 92, 92, 92],
    Maio: [92, 92, 92, 92, 92, 85, 85, 92, 92, 92, 92, 92, 92, 88, 88, 96, 96, 96, 96, 96, 96, 100, 92, 96, 96, 96, 96, 96, 96, 96, 96],
    Junho: [92, 85, 88, 88, 96, 100, 100, 100, 100, 96, 96, 96, 88, 88, 88, 88, 88, 96, 96, 96, 96, 96, 96, 96, 88, 88, 88, 92, 92, 92],
    Julho: [88, 88, 92, 92, 92, 92, 92, 88, 88, 88, 88, 88, 88, 81, 88, 88, 92, 92, 96, 100, 100, 88, 96, 96, 96, 88, 88, 88, 88, 88, 91],
    Agosto: [86, 77, 77, 77, 90, 90, 97, 97, 97, 90, 90, 93, 93, 90, 90, 79, 79, 79, 91, 94, 94, 97, 94, 94, 85, 88, 88, 91, 91, 91],
    Setembro: [91, 88, 94, 94, 94, 94, 97, 94, 94, 94, 94, 94, 94, 97, 97, 97, 97, 97, 97, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
};

// Função para autenticação com senha simples
function checkPassword() {
    const password = document.getElementById("password").value;

    if (password === "admin123") { // Defina sua senha aqui
        document.getElementById("adminSection").style.display = "block"; // Mostra a seção de administração
        document.getElementById("loginForm").style.display = "none"; // Esconde o formulário de login
    } else {
        alert("Senha incorreta.");
    }
}

// Função para adicionar ocupação diária
function addDailyOccupation() {
    const month = document.getElementById("futureMonthInput").value;
    const day = document.getElementById("futureDayInput").value;
    const occupationValue = document.getElementById("occupationInput").value;

    if (!occupationData[month]) {
        occupationData[month] = [];
    }

    // Atualizar ou adicionar ocupação para o dia específico
    occupationData[month][day - 1] = parseInt(occupationValue, 10); // Subtrai 1 para alinhar com o índice do array

    // Confirmação de sucesso
    alert(`Ocupação do dia ${day} de ${month} atualizada para ${occupationValue}%!`);
}

// Função para obter a ocupação para um mês e dia específico
function getOccupationForDate(month, day) {
    if (occupationData[month] && occupationData[month][day - 1] !== undefined) {
        return occupationData[month][day - 1] + "%";
    } else {
        return "No data available";
    }
}

// Função para calcular a ocupação média de um mês
function calculateMonthlyOccupation(month) {
    const data = occupationData[month];
    if (data && data.length > 0) {
        const total = data.reduce((acc, val) => acc + val, 0); // Soma todos os valores do mês
        const average = (total / data.length).toFixed(2); // Calcula a média e formata para duas casas decimais
        return average + "%";
    } else {
        return "No data available";
    }
}

// Função para exibir a data atual
function displayCurrentDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById("currentDate").textContent = formattedDate;
}

// Função para atualizar a ocupação em tempo real
function updateOccupationInfo() {
    const today = new Date();
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentMonth = monthNames[today.getMonth()];
    const day = today.getDate();

    const occupationRate = getOccupationForDate(currentMonth, day);
    const occupationDisplay = document.getElementById("occupationRate");
    const errorMessage = document.getElementById("errorMessage");

    console.log(`Mês atual: ${currentMonth}, Dia: ${day}, Ocupação: ${occupationRate}`);

    if (occupationRate === "No data available") {
        occupationDisplay.style.display = "none";
        errorMessage.textContent = occupationRate;
    } else {
        occupationDisplay.style.display = "block";
        occupationDisplay.textContent = occupationRate;
        errorMessage.textContent = "";
    }
}

// Função para mostrar a ocupação para o mês e dia selecionados
function showOccupationForSelectedDate() {
    const monthSelect = document.getElementById("monthSelect").value;
    const dayInput = document.getElementById("dayInput").value;

    const occupationRate = getOccupationForDate(monthSelect, dayInput);
    const occupationDisplay = document.getElementById("occupationRate");
    const errorMessage = document.getElementById("errorMessage");

    if (occupationRate === "No data available") {
        occupationDisplay.style.display = "none";
        errorMessage.textContent = occupationRate;
    } else {
        occupationDisplay.style.display = "block";
        occupationDisplay.textContent = occupationRate;
        errorMessage.textContent = "";
    }
}

// Função para exibir a ocupação mensal
function showMonthlyOccupation() {
    const monthSelect = document.getElementById("monthSelect").value;
    const monthlyRate = calculateMonthlyOccupation(monthSelect);
    document.getElementById("monthlyRate").textContent = monthlyRate;
}

// Chama a função para exibir a data atual e a ocupação ao carregar a página
window.onload = function() {
    displayCurrentDate();
    updateOccupationInfo();

    // Atualiza a ocupação em tempo real a cada minuto
    setInterval(updateOccupationInfo, 60000);
};
