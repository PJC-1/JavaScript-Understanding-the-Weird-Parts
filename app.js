function buildFunctions() {
    var arr = [];

    for(var i = 0; i < 3; i++) {
        arr.push(
            function() {
                console.log(i);
            }
        )
    }

    return arr;
}

var fs = buildFunctions();

fs]0]();
fs]1]();
fs]2]();


function buildFunctions2() {
    var arr = [];

    for(var i = 0; i < 3; i++) {
        let j = 1;
        arr.push(
            function() {
                console.log(j);
            }
        )
    }

    return arr;
}

var fs = buildFunctions2();

fs]0]();
fs]1]();
fs]2]();
