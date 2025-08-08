(function ($) {
  "use strict"; // Modo estrito para garantir melhores práticas de codificação

  // MENU
  // Adiciona um evento de clique aos links do menu lateral (#sidebarMenu)
  $('#sidebarMenu .nav-link').on('click', function() {
    // Fecha o menu lateral ao clicar em qualquer link
    $("#sidebarMenu").collapse('hide');
  });

  // CUSTOM LINK
  // Adiciona funcionalidade de rolagem suave para links com a classe 'smoothscroll'
  $('.smoothscroll').click(function() {
    var el = $(this).attr('href'); // Obtém o valor do atributo 'href' do link clicado (destino da rolagem)
    var elWrapped = $(el); // Seleciona o elemento alvo baseado no atributo 'href'
    var header_height = $('.navbar').height(); // Calcula a altura da barra de navegação (header)

    // Chama a função scrollToDiv para rolar até o elemento alvo
    scrollToDiv(elWrapped, header_height);
    return false; // Previne o comportamento padrão do link

    // Função para realizar a rolagem suave
    function scrollToDiv(element, navheight) {
      var offset = element.offset(); // Obtém a posição do elemento alvo
      var offsetTop = offset.top; // Obtém a distância do topo do elemento em relação à página
      var totalScroll = offsetTop - navheight; // Calcula a posição final do scroll ajustada pela altura da barra de navegação

      // Anima o scroll até a posição calculada
      $('body,html').animate({
        scrollTop: totalScroll
      }, 300); // Duração da animação é 300ms
    }
  });

})(window.jQuery); // Autoexecução da função utilizando jQuery como argumento
