var val = '<div class ="s1"><p class = "hO yo"><span class = "hO11"></span></p></div>';
var expectedReturn = '<View><Text><Text></Text></Text></View>';
var html = '';
var bracketCount = 0;
var styleArray = [];

console.log(val);

var replacement = function (x) {
    //class converter 
    if (html[x - 1] != '/') {
        classToStyle(x);
    }

    //div converter starts
    if (html[x + 1] == 'd' && html[x + 2] == 'i' && html[x + 3] == 'v') {
        html.splice(x + 1, 3, 'View');

    }

    //paragraph converter starts
    if (html[x + 1] == 'p') {
        html.splice(x + 1, 1, 'Text');
    }


    //span converter starts
    if (html[x + 1] == 's' && html[x + 2] == 'p' && html[x + 3] == 'a' && html[x + 4] == 'n') {
        html.splice(x + 1, 4, 'Text');


    }


}

var identifyStyles = function (x) {

    var brac = html[x];
    var style = [];
    
    for (var i = x + 1; html[i] != brac; i++) {
        style.push(html[i]);
    }
    
    style = style.join('');
    styleArray.push(style);

}

var classToStyle = function (y) {
    for (var i = y; html[i] != '>'; i++) {


        // this converts class
        if (html[i] == 'c' && html[i + 1] == 'l' && html[i + 2] == 'a') {
            html.splice(i, 5, 'style');

        }

        // this converts styles
        if (html[i] == '=') {
            html.splice(i, 1, '= {styles.');
            if (html[i + 1] == ' ') {
                html.splice(i + 1, 1, '');
            }



        }
        // this converts " & '
        if (html[i] == '"' || html[i] == "'") {

            bracketCount++;
            if (bracketCount == '1') {
                cleanSpaces(i);
                identifyStyles(i);
                html.splice(i, 1, '');
            } else {
                bracketCount = 0;
                html.splice(i, 1, '}');
            }


        }

    }
}

var cleanSpaces = function (z) {
    var brac = html[z];

    for (var i = z + 1; html[i] != brac; i++)
        if (html[i] == " ") {
            html.splice(i, 1, '');
        }


}


var rnGrind = function (htmlVal) {

    html = htmlVal.split('');

    for (var i = 0; i < html.length; i++) {
        if (html[i] == '<') {
            //Triggers replacement function
            replacement(i);
            //Finds closing functions
            replacement(i + 1)
        }

    }

    html = html.join('');

    cleanArray();
    return (html)


}


var cleanArray = function(){
var result = [];
styleArray.forEach(function(item) {
     if(result.indexOf(item) < 0) {
         result.push(item);
     }
});
styleArray = result;

}




//identifyStyles(rnGrind(val));
