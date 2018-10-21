const LISTA = document.querySelector('#lista');
const NAMEINP = document.querySelector('#aggGioNome');
const UIDINP = document.querySelector('#aggGioUID');
const KEYINP = document.querySelector('#keyLoginSys');
const ADDMODAL = document.querySelector('#aggiuntaGiocatore');

const APIURI = 'http://95.89.230.39/api';
reqGList(compRen,LISTA);

function loginSimpleSystem(key) {
    console.log(key.value)
};