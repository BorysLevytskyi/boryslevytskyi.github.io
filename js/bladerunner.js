(function(){
    var audio = document.getElementById('audio');
    var cover = document.querySelector('.bladerunner');
    var photo = document.querySelector('.bladerunner .photo');
    var isOn = false, consoleSpeed = 10;

    window.addEventListener('keypress', function (e) {

        var char = String.fromCharCode(e.charCode);

        if(char.toLowerCase() == 'y' && isOn) {
            stop();
            return;
        }

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
        { text: "Initializing|.|.|.\n" +
        "Initialization completed.\n" +
        "\n" +
        ">| bladerunner|\n" +
        "\n" +
        "Loading bladerunner executable. Please wait|.|.|.\n" +
        "Loading completed\n|" +
        "\n" +
        "Welcome to blade runner console.\n" +
        "\n|" +
        "> search --name Borys Levytskyi\n" +
        "Searching|.|.|.\n" +
        "Search completed. Results found: 1\n|" +
        "\n|" +
        "> show --about\n" +
        "\n|" +
        "Name: Borys Levytskyi\n" +
        "Gender: Male\n" +
        "Location: Kiev, Ukraine\n" +
        "Occupation: Works in Epam Systems as Senior .NET developer\n" +
        "\n" +
        "> show --projects\n" +
        "\n|" +
        "Projects:\n|" +
        "\n" +
        "- http://bitwisecmd.com\n" +
        "Helps better understand how bitwise operations are performed by displaying bytes in a way you can actually see what is going on there during AND, OR, XOR or shift operations.\n" +
        "\n" +
        "- CommandFramework\n" +
        "Nuget package. NET Library that allows to create rich command line interface in a declarative way using attributes.\n" +
        "\n" +
        "To exit blade runner console press Y" +
        "^" }
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
            var text = '', timeout = consoleSpeed;
            switch (symbol) {
                case '\n':
                    text = "<br/>";
                    consoleSpeed = 10;
                    break;
                case '>':
                    timeout += 1000;
                    consoleSpeed = 100;
                    text = symbol;
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

            if(text.length > 0) {

                if(el.innerHTML.length > 1) {
                    el.innerHTML = el.innerHTML.substr(0, el.innerHTML.length-1) + text + "#";
                } else {
                    el.innerHTML = symbol + "#";
                }
            }

            setTimeout(chain.shift(), timeout);
        }
    }

})();