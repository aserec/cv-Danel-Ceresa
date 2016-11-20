// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

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
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
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


    $('#other-lang, #other-transversal, #other-technologies').one('click', function() {
        showChart($(this));
    });

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