var fs = require('fs');

var modifiers, types 
intializeKeywords();
var textToConvert = fs.readFileSync('target.txt', 'utf8');
var linesOfText = textToConvert.split('\n');
linesOfText = processLines(linesOfText);
linesOfText.forEach(line => console.log(convertLineToTypescript(line)+'\n'));

function convertLineToTypescript(line) {
    let words = line.split(' ');
    let name = (words[2]).replace(';','');
    let type = types.get(words[1]);
    if(!type) 
        return arrayProtocol(name, words[1]);
    else if(typeof words[4] !== 'undefined')
        return generateTypescriptDeclaration(name, type, words[4].replace(';',''));
    else
        return generateTypescriptDeclaration(name,type);
    
}

function arrayProtocol(name, arrayType){
    let type = arrayType.substring(arrayType.lastIndexOf("<") + 1, arrayType.lastIndexOf(">"));
    let temp = types.get(type);
    if(temp){
        type = temp;
        let arrayType = "Array<" + type + ">";
        return generateTypescriptDeclaration(name,arrayType);
    }
    else {
        type = type.replace(/dto/gi, "");
        let arrayType = "Array<" + type + ">";
        return generateTypescriptDeclaration(name,arrayType);
    }

}

function generateTypescriptDeclaration(name,type,value) {
    if(!value)
        return name + " : " + type  + ";";
    else
    return name + " : " + type  + " = " + value + ";";
}

function processLines(lines){
    lines.forEach( (line, index) => lines[index] = line.replace(/[\t\n\r]/gm,'').trim() );
    lines = lines.filter(line => line !== '');
    lines = lines.filter(line => line[0] != '@');
    return lines;
}

function intializeKeywords() {
    modifiers = new Map([["private", ""], ["public", ""], ["protected",""]]);
    types = new Map([["Long", "number"], ["long", "number"], ["Integer", "number"], ["int","number"], 
    ["Double", "number"], ["double", "number"], ["String", "string"], ["Boolean", "boolean"], ["boolean","boolean"]]);
}



//line by line, parse and classify word or character