(function(){
    console.log('Press b to activate blade runner mode.')

    var audio = document.getElementById('audio');
    var cover = document.querySelector('.bladerunner');
    var photo = document.querySelector('.bladerunner .photo');
    var isOn = false, consoleSpeed = 10;

    window.addEventListener('keypress', function (e) {

        var char = String.fromCharCode(e.charCode);

        if((e.keyCode == 13 || e.keyCode == 27) && isOn) {
            stop();
            return;
        }

        if(!isOn && char.toLocaleLowerCase() == 'b') {
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
                photo.classList.add('on50');
                setTimeout(startConsole, 10000);
            }, 5000)
        }, 100);

        audio.play();

    }

    function stop() {
        isOn = false;
        cover.style.display = 'none';
        cover.classList.remove('on');
        photo.classList.remove('on50');
        document.querySelector('.console').innerHTML = '';
        audio.pause();
    }

    var consoleText =
        "*** Blade runner mode activated ***\n" +
        "\n" +
        "" +
        "Initializing shell|.|.|.\n" +
        "Initialization completed.\n" +
        "\n" +
        "Login:\n" +
        ">r.deckard\n" +
        "Password:\n" +
        ">***********\n" +
        "|\n" +
        "Connecting to the server|.|.|.\n" +
        "Connected.\n" +
        "\n" +
        "Welcome, officer Deckard.\n" +
        "Ready.\n" +
        "\n" +
        ">seatyj<<<rch Borys Levytskyi\n" +
        "Searching|.|.|.\n" +
        "Search completed. Results found: 1\n" +
        "\n" +
        ">profile\n" +
        "\n|" +
        "Name: Borys Levytskyi\n" +
        "Gender: Male\n" +
        "Location: Kiev, Ukraine\n" +
        "Occupation: Works in Epam Systems as a Senior .NET developer\n" +
        "GitHub: https://github.com/BorysLevytskyi\n" +
        "LinkedIn Profile: https://www.linkedin.com/in/blevitsky\n" +
        "\n" +
        "Ready.\n" +
        "\n" +
        ">show projects\n" +
        "\n" +
        "Projects:\n" +
        "\n" +
        "- http://bitwisecmd.com\n" +
        "Helps better understand how bitwise operations are performed by displaying bytes in a way you can actually see what is going on there during AND, OR, XOR or shift operations.\n" +
        "\n" +
        "- CommandFramework\n" +
        "Nuget package. NET Library that allows to create rich command line interface in a declarative way using attributes.\n" +
        "\n" +
        "Ready.\n" +
        "\n" +
        "> question \"am i a human or a replicant?|...|||" +
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" +
        "exit\n" +
        "\n" +
        "Press [Enter] to exit. ^";


    function startConsole() {
        var c = document.querySelector('.console');
        var el = document.createElement('p');
        c.appendChild(el);
        var text = [];
        typeText(consoleText, el);
    }

    function typeText(text, el) {
        var symbols = Array.prototype.slice.call(text),
            char, chain = [];

        console.log(symbols);

        while(typeof (char = symbols.shift()) !== "undefined")
        {
            chain.push(sendChar(char, el, chain));
        }

        setTimeout(chain.shift(), 50);
    }

    function sendChar(symbol, consoleElement, chain) {
        return function (){
            var text = '', timeout = consoleSpeed;
            var html = consoleElement.innerHTML;
            html = html.replace(/\#$/, '');

                switch (symbol) {
                    case '\n':
                        html += "<br/>";
                        consoleSpeed = 10;
                        break;
                    case '>':
                        timeout += 500;
                        consoleSpeed = 100;
                        html += '> ';
                        break;
                    case '|':
                        timeout += 1000;
                        break;
                    case '<':
                        html = html.substr(0, html.length-1);
                        break;
                    case '^':
                        return;
                    default:
                        html += symbol;
                        break;
                }

                html += '#';
                consoleElement.innerHTML = html;

            setTimeout(chain.shift(), timeout);
        }
    }

})();