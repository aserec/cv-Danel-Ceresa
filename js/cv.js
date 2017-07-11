(function($) {
    "use strict"; // Start of use strict
    var contestDone=false

    var i18n = window.domI18n({
        selector: '[data-translatable]',
        separator: ' // ',
        languages: ['es-ES', 'en'],
        defaultLanguage: 'es-ES'
    });

    var technologies = [];
    technologies[0]=[
        ['HTML5', 80],
        ['CSS3', 45],
        ['Java', 85],
        ['Grails', 75],
        ['Spring', 65],
        ['Hibernate', 65],
        ['PHP', 20],
        ['MySql/Oracle', 55],
        ['Cordova', 60],
        ['Angular', 25],
        ['Javascript', 70],
        ['Git', 95],
        ['Wordpress', 15]
    ];
    technologies[1]=[
        ['HTML5', 80],
        ['CSS3', 45],
        ['Java', 85],
        ['Grails', 75],
        ['Spring', 65],
        ['Hibernate', 65],
        ['PHP', 20],
        ['MySql/Oracle', 55],
        ['Cordova', 60],
        ['Angular', 25],
        ['Javascript', 70],
        ['Git', 95],
        ['Wordpress', 15]
    ];

    var languages = [];
    languages[0]=[
        ['Euskera', 100],
        ['Ingles', 65],
        ['Catalan', 15],
        ['Italiano', 30]
    ];
    languages[1]=[
        ['Basque', 100],
        ['Spanish', 100],
        ['English', 65],
        ['Catalan', 15],
        ['Italian', 30]
    ];
    var personality = [];
    personality[0]=[
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
    personality[1]=[
        ['Dynamism', 100],
        ['Happyness', 85],
        ['Houmor', 85],
        ['Patience', 70],
        ['Silence', 10],
        ['Imagination', 60],
        ['Respect', 95],
        ['Teamwork', 85],
        ['Summision', 20]
    ];
    var trasnsversals = [];
    trasnsversals[0]=[
        ['Agile', 60],
        ['Tareas administrativas', 20],
        ['Formacion continua', 100],
        ['Disponibilidad movimiento/traslado', 100],
        ['Trato con cliente', 70]
    ];
    trasnsversals[1]=[
        ['Agile', 60],
        ['Administrative tasks', 20],
        ['Continuous formation', 100],
        ['Moving disposition', 100],
        ['Client management', 70]
    ];

    $('.page-scroll a').bind('click', function(event) {
        event.preventDefault();
        if(contestDone){
            slowScroll($(this).attr('href'),event);
        }else{
            i18n.changeLanguage(getNavigatorLanguage());
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
            // $('#wrongAnswer').addClass("hidden");
            // $('#goodAnswer').removeClass("hidden");

            $('#wrongAnswer').hide();
            $('#goodAnswer').hide();
            $('#goodAnswer').fadeIn('slow');
            setTimeout(function () {
                contestDo();
                $('.close-modal').trigger( "click" );
                slowScroll($('#ok-image').data('href'),event);
            },1000);

        }else{
            $('#wrongAnswer').hide();
            $('#goodAnswer').hide();
            $('#wrongAnswer').fadeIn('slow');
            // $('#goodAnswer').addClass("hidden");
            // $('#wrongAnswer').removeClass("hidden");
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
        var abilityArray=getAbilityArrayFromElementId(element[0].id, getLanguageIndex());
        var chart = c3.generate({
            bindto: '#'+element.children('.chartContainer')[0].id,
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

        function getAbilityArrayFromElementId(id, languageId){
            if(id==="other-technologies") {
                return technologies[languageId];
            }else if (id==="other-lang"){
                return languages[languageId];
            }else if(id==="other-transversal"){
                return trasnsversals[languageId];
            }else{
                return personality[languageId];
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
    function getLanguageIndex (){
        if(window.navigator.language === "en-US" || window.navigator.language.indexOf("en") === 0 ){
            return 1
        }else{
            return 0
        }
    }
    function getNavigatorLanguage(){
        return window.navigator.language;
        // return 'en'
    }

})(jQuery); // End of use strict


/*

    */