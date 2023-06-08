//transferência de tela ---> foodtrucks para foodtruck específico
function redirecionarProdPag(idPlace) {
  window.location.href = `cardapio.html?id=${idPlace}`;
}

//DA TELA HOME
//TELA HOME - APRESENTAÇÃO DO CARD COM INFORMAÇÕES DO JSON
fetch('dados.json')
  .then(response => response.json())
  .then(data => {
    let str = '';
    const foodtrucks = data.foodtrucks;
    for (let i = 0; i < 9 && i < foodtrucks.length; i++) {
      const foodtruck = foodtrucks[i];
      str += `<div class="col" id=${foodtruck.idPlace}>
        <a class="card-link expand-card" style="text-decoration: none;" href="#${foodtruck.idPlace}">
          <div class="card h-100">
            <img src="${foodtruck.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-dark">${foodtruck.nome}</h5>
              <p style="color: grey;">${foodtruck.descricaolocal}</p>
              <p class="additional-info" style="display: none;">Endereço: ${foodtruck.endereco}</p>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" onclick="redirecionarProdPag('${foodtruck.idPlace}')">Fazer Pedido</button>
            </div>
          </div>
        </a>
      </div>`;
    }
    document.getElementById('cardsAPI').innerHTML = str;

    const cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      card.addEventListener('mouseenter', function () {
        card.querySelector('.additional-info').style.display = 'block';
      });
      card.addEventListener('mouseleave', function () {
        card.querySelector('.additional-info').style.display = 'none';
      });
    }

    // Verificar se a tela é menor que a tela de um computador
    if (window.innerWidth < 600) {
      const additionalInfos = document.getElementsByClassName('additional-info');
      for (let i = 0; i < additionalInfos.length; i++) {
        additionalInfos[i].style.display = 'none';
      }
    }
  });
//FIM


//TELA HOME - PESQUISA POR PRODUTO INDIVIDUAL
fetch('dados.json')
  .then(response => response.json())
  .then(data => {
    const foodtrucks = data.foodtrucks;
    const campoPesquisa = document.querySelector('input[type="search"]');
    const botaoPesquisa = document.getElementById('pesquisaProduto');
    const searchResult = document.getElementById('searchResult');

    botaoPesquisa.addEventListener('click', function (event) {
      event.preventDefault();

      const produtoBuscado = campoPesquisa.value.toLowerCase();
      const foodtrucksComProduto = [];

      // Busca de produto no cardapio de cada estabelecimento
      foodtrucks.forEach(foodtruck => {
        const cardapio = foodtruck.cardapio;
        cardapio.forEach(item => {
          if (item.produto.toLowerCase() === produtoBuscado) {
            foodtrucksComProduto.push(foodtruck.nome);
          }
        });
      });

      if (foodtrucksComProduto.length > 0) {
        searchResult.textContent = `O produto ${campoPesquisa.value} está disponível nos seguintes foodtrucks: ${foodtrucksComProduto.join(', ')}`;
      } else {
        searchResult.textContent = `O produto ${campoPesquisa.value} não pode ser encontrado em nenhum foodtruck.`;
      }

      // Mostrar o pop-up
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    });
  });
//FIM


