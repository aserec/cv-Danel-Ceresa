// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict
    var contestDone=false
    var technologies=[
        ['HTML5', 90],
        ['CSS3', 50],
        ['Java', 85],
        ['Grails', 75],
        ['Spring', 65],
        ['Hibernate', 70],
        ['PHP', 20],
        ['MySql/Oracle', 55],
        ['Cordova', 60],
        ['Angular', 25],
        ['Javascript', 75],
        ['Git', 95],
        ['Wordpress', 15]
    ];
    var languages=[
        ['Euskera', 100],
        ['Ingles', 65],
        ['Catalan', 15],
        ['Italiano', 30]
    ];
    var personality=[
        ['Dinamismo', 100],
        ['Alegria', 85],
        ['Humor', 85],
        ['Paciencia', 70],
        ['Silencio', 10],
        ['Imaginacion', 60],
        ['Respeto', 95],
        ['Trabajo en equipo', 70],
        ['Sumision', 20]
    ];
    var trasnsversals=[
        ['Agile', 60],
        ['Tareas administrativas', 20],
        ['Formacion continua', 100],
        ['Disponibilidad movimiento', 70],
        ['Trato con cliente', 65]
    ];

    $('.page-scroll a').bind('click', function(event) {
        event.preventDefault();
        if(contestDone){
            slowScroll($(this),event);
        }else{
            askForContest($(this),event);
        }
    });

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
    $('#ok-image').click(function(){
        $('#contestModalLink').trigger( "click" );
    });
    $('#ko-image').click(function(){
        slowScroll($(this).data('href'),event);
    });


    $('#other-lang, #other-transversal, #other-technologies, #other-personality').one('click', function() {
        showChart($(this));
    });

    function doContest(element,event){
        //slowScroll(element,event);
    }

    function askForContest(element,event){
        $('#contestModalLink').trigger( "click" );
        $('#ok-image').data('href',element.attr('href'));
        $('#ko-image').data('href',element.attr('href'));
        //slowScroll(element,event);
    }
    function slowScroll(href,event){
        $('html, body').stop().animate({
            scrollTop: ($(href).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        if(event!=null){event.preventDefault()};
    }

    function showChart(element){
        var abilityArray=getAbilityArrayFromElementId(element[0].id);
        var chart = c3.generate({
            bindto: '#'+element[0].id,
            data: {
                columns: [
                    abilityArray[0]
                ],
                type: 'bar',
                width: {
                    ratio: 1.5
                }
            }
        });

        setTimeout(function () {
            _recursiveChart(1,abilityArray)
        }, 1000);

        function getAbilityArrayFromElementId(id){
            if(id==="other-technologies") {
                return technologies;
            }else if (id==="other-lang"){
                return languages;
            }else if(id==="other-transversal"){
                return trasnsversals;
            }else{
                return personality;
            }
        }

        function _recursiveChart(index, abilityArray){
            if(abilityArray[index]==null){
                return false
            }
            chart.flow({
                columns: [
                    abilityArray[index]
                ],
                duration: 500,
                done: function () {
                    index++;
                    _recursiveChart(index, abilityArray)
                }
            });
        }
    }

})(jQuery); // End of use strict


/*

    */