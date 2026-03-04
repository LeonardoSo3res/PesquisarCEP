
async function buscarCEP() {
    const cep = document.getElementById("cep").value;
    const resultado = document.getElementById("resultado");

    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        resultado.innerHTML = "CEP inválido!";
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML = "CEP não encontrado.";
            document.getElementById("cep").value = "";
            return;
        }

        resultado.innerHTML = `
            <strong>Rua:</strong> ${dados.logradouro} <br>
            <strong>Bairro:</strong> ${dados.bairro} <br>
            <strong>Cidade:</strong> ${dados.localidade} <br>
            <strong>Estado:</strong> ${dados.uf}
        `;

    } catch (erro) {
        resultado.innerHTML = "Erro ao buscar o CEP.";
        console.error(erro);
    }
}