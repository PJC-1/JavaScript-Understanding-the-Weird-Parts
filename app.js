function buildFunctions2() {
    var arr = [];

    for(var i = 0; i < 3; i++) {
        let j = 1;
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);
                }
            })(i);
        )
    }

    return arr;
}

var fs = buildFunctions2();

fs]0]();
fs]1]();
fs]2]();
