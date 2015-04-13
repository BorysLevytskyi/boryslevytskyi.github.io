(function(){
    var audio = document.getElementById('audio');
    var cover = document.querySelector('.bladerunner');
    var photo = document.querySelector('.bladerunner .photo');
    var isOn = false;

    window.addEventListener('click', function() {
        if(isOn) {
            stop();
        }
    });

    window.addEventListener('keypress', function (e) {

        var char = String.fromCharCode(e.charCode);

        if(char.toLocaleLowerCase() == 'b') {
            bladeRunner();
        }

    });

    function bladeRunner() {
        isOn = true;

        console.log('BLADERUNNER')

        cover.style.display = '';

        setTimeout(function() {
            cover.classList.add('on');
            setTimeout(function() {
                photo.classList.add('on');
            }, 5000)
        }, 100);

        audio.play();

        setTimeout(startConsole, 5000);
    }

    function stop() {
        isOn = false;
        cover.style.display = 'none';
        cover.classList.remove('on');
        photo.classList.remove('on')
        document.querySelector('.console').innerHTML = '';
        audio.pause();
    }

    var consoleText = [
        { text: "> search --name Borys Levytskyi\n" +
        "Searhing|.|.|.\n" +
        "Search completed\n|" +
        "Results found: 1\n|" +
        "\n|" +
        "> show --about\n" +
        "\n|" +
        "Borys Levytsky: Full Stack .NET Developer|\n" +
        "Works in Epam Systems as Senior .NET developer\n" +
        "> show --project\n" +
        "\n|" +
        "\n|" +
        "Projects:\n|" +
        "\n" +
        "http://biwtwisecmd.com\n" +
        "Helps better understand how bitwise operations are pefromed by displaying bytes in a way you can actually see what is going on there during AND, OR, XOR or shift operations.\n" +
        "\n" +
        "CommandFramework\n" +
        ".NET Library that allows to create rich command line interface in a declarative way using attributes.\n" +
        "\n" +
        "> clear^" }
    ];

    function startConsole() {
        var c = document.querySelector('.console');
        for(var i=0; i<consoleText.length; i++) {
            var el = document.createElement('p');
            c.appendChild(el);
            var text = [];
            typeText(consoleText[i].text, el);
        }
    }

    function typeText(text, el) {
        var symbols = Array.prototype.slice.call(text),
            char, chain = [];

        console.log(symbols);

        while(typeof (char = symbols.shift()) !== "undefined")
        {
            chain.push(type(char, el, chain));
        }

        setTimeout(chain.shift(), 50);
    }

    function type(symbol, el, chain) {
        return function (){
            var text = '', timeout = 50;
            switch (symbol) {
                case '\n':
                    text = "<br/>";
                    break;
                case '|':
                    timeout += 1000;
                    break;
                case '^':
                    el.innerHTML = el.innerHTML.replace(/\#$/, '');
                    return;
                default:
                    text = symbol;
                    break;
            }
            if(el.innerHTML.length > 1) {
                el.innerHTML = el.innerHTML.substr(0, el.innerHTML.length-1) + text + "#";
            } else {
                el.innerHTML = symbol + "#";
            }

            setTimeout(chain.shift(), timeout);
        }
    }

})();