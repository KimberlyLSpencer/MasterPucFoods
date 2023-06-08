const urlParams = new URLSearchParams(window.location.search);
const idPlace = urlParams.get('id');

if (idPlace) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const foodtruck = response.foodtrucks.find(ft => ft.idPlace === idPlace);

        if (foodtruck) {
          const cardapio = foodtruck.cardapio;
          const endereco = foodtruck.endereco;
          const nomeFoodtruck = foodtruck.nome;
          exibirCardapio(cardapio);
          exibirEndereco(endereco);
          exibirNomeFoodtruck(nomeFoodtruck);
        } else {
          console.log('Food truck não encontrado');
        }
      } else {
        console.log('Erro ao consumir API');
        const cardapio = jsonBackup.foodtrucks[0].cardapio;
        const endereco = jsonBackup.foodtrucks[0].endereco;
        const nomeFoodtruck = jsonBackup.foodtrucks[0].nome;
        exibirCardapio(cardapio);
        exibirEndereco(endereco);
        exibirNomeFoodtruck(nomeFoodtruck);
      }
    }
  };

  xhr.open('GET', 'dados.json');
  xhr.send();

  function exibirCardapio(cardapio) {
    const tbody = document.getElementById('cardapio');
    tbody.classList.add('styled-table');
  
    for (const item of cardapio) {
      const descricao = item.descricao;
      const preco = item.preco;
      const tr = document.createElement('tr');
      const tdItem = document.createElement('td');
      const tdDescricao = document.createElement('td');
      const tdPreco = document.createElement('td');
      const tdComprar = document.createElement('td'); // Criar a coluna para o botão
  
      tdItem.textContent = item.produto;
      tdDescricao.textContent = descricao;
      tdPreco.textContent = preco;
      
      const button = document.createElement('button'); // Criar o botão "Adicionar ao carrinho"
      button.type = 'button';
      button.className = 'btn btn-primary btn-sm';
      button.textContent = 'Adicionar';
      button.addEventListener('click', function () {
        adicionarAoCarrinho(item); // Função que você deseja executar ao clicar no botão
      });
  
      tdComprar.appendChild(button); // Adicionar o botão à coluna
  
      tr.appendChild(tdItem);
      tr.appendChild(tdDescricao);
      tr.appendChild(tdPreco);
      tr.appendChild(tdComprar); // Adicionar a coluna à linha da tabela
  
      tbody.appendChild(tr);
    }
  }
  function exibirEndereco(endereco) {
    const ul = document.getElementById('endereco');
    const liLogradouro = document.createElement('li');
    liLogradouro.textContent = endereco;
    ul.appendChild(liLogradouro);
  }

  function exibirNomeFoodtruck(nomeFoodtruck) {
    const nomeFoodtruckElement = document.getElementById('nomefoodtruck');
    nomeFoodtruckElement.textContent = nomeFoodtruck;
  }
}


