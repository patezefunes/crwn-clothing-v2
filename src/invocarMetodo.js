let texto='Me estoy ejecutando';
function metodo1(objeto){
    return console.log(objeto);
}

function invocarMetodo(objeto, metodo){
    metodo(objeto);
}

invocarMetodo(texto, metodo1);