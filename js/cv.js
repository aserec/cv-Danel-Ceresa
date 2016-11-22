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
            slowScroll($(this).attr('href'),event);
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
        $('.close-modal').trigger( "click" );
        setTimeout(function () {
            $('#contestModalLinkOk').trigger( "click" );
        },500);

    });

    $('#ko-image').click(function(){
        contestDo();
        $('.close-modal').trigger( "click" );
        slowScroll($(this).data('href'),event);
    });
    $('.fakeAnswer').click(function(){
        $('#fakeQuestion').hide('slow');
        $('#contestQuestion').removeClass('hidden');
    });
    $('#resolveBtn').click(function(){
        var cousins= [$('#cousin1'),$('#cousin2'),$('#cousin3')];
        if(validateForm(cousins)){
            contestDo();
            $('#wrongAnswer').addClass("hidden");
            $('#goodAnswer').removeClass("hidden");
            setTimeout(function () {
                $('.close-modal').trigger( "click" );
                slowScroll($('#ok-image').data('href'),event);
            },1000);

        }else{
            $('#goodAnswer').addClass("hidden");
            $('#wrongAnswer').removeClass("hidden");
        }
    });


    $('#other-lang, #other-transversal, #other-technologies, #other-personality').one('click', function() {
        showChart($(this));
    });

    function validateForm(cousins){
        if(cousins[0].val()==2 && cousins[1].val()==11 && cousins[2].val()==17){
            return true
        }
    }

    function askForContest(element,event){
        $('#contestModalLink').trigger( "click" );
        $('#ok-image').data('href',element.attr('href'));
        $('#ko-image').data('href',element.attr('href'));

    }
    function contestDo(){
        window.scrollTo(0, 0);
        $('#secret').show();
        contestDone=true;
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