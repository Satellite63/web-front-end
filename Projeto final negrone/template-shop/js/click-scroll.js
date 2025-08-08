// jquery-click-scroll
// by syamsul 'isul' Arifin

// Array que contém números representando as seções do layout
var sectionArray = [1, 2, 3, 4, 5];

// Itera por cada valor do array sectionArray
$.each(sectionArray, function(index, value) {

    // Adiciona um evento de scroll ao documento
    $(document).scroll(function() {
        // Calcula o topo do elemento da seção correspondente
        var offsetSection = $('#' + 'section_' + value).offset().top - 0; // Obtém a posição superior da seção
        var docScroll = $(document).scrollTop(); // Obtém a posição atual do scroll
        var docScroll1 = docScroll + 1; // Adiciona um pequeno ajuste ao cálculo de scroll

        // Verifica se o scroll atual está dentro do alcance da seção
        if (docScroll1 >= offsetSection) {
            // Remove a classe 'active' de todos os links do menu lateral
            $('#sidebarMenu .nav-link').removeClass('active');
            // Adiciona a classe 'inactive' a todos os links do menu lateral
            $('#sidebarMenu .nav-link:link').addClass('inactive');  
            // Adiciona a classe 'active' ao link correspondente à seção atual
            $('#sidebarMenu .nav-item .nav-link').eq(index).addClass('active');
            // Remove a classe 'inactive' do link correspondente à seção atual
            $('#sidebarMenu .nav-item .nav-link').eq(index).removeClass('inactive');
        }
    });

    // Adiciona um evento de clique nos botões com a classe 'click-scroll'
    $('.click-scroll').eq(index).click(function(e) {
        // Calcula a posição superior da seção correspondente ao botão clicado
        var offsetClick = $('#' + 'section_' + value).offset().top - 0;
        e.preventDefault(); // Previne o comportamento padrão do clique
        // Anima o scroll até a posição calculada
        $('html, body').animate({
            'scrollTop': offsetClick
        }, 300); // Duração da animação é 300ms
    });

});

// Executa uma vez o código ao carregar o documento
$(document).ready(function() {
    // Adiciona a classe 'inactive' a todos os links do menu lateral inicialmente
    $('#sidebarMenu .nav-item .nav-link:link').addClass('inactive');    
    // Adiciona a classe 'active' ao primeiro link do menu lateral
    $('#sidebarMenu .nav-item .nav-link').eq(0).addClass('active');
    // Remove a classe 'inactive' do primeiro link do menu lateral
    $('#sidebarMenu .nav-item .nav-link:link').eq(0).removeClass('inactive');
});
