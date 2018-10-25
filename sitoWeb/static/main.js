const LISTA = document.querySelector('#lista');
const NAMEINP = document.querySelector('#aggGioNome');
const UIDINP = document.querySelector('#aggGioUID');
const KEYINP = document.querySelector('#keyLoginSys');
const ADDMODAL = document.querySelector('#aggiuntaGiocatore');
const LOGMODAL = document.querySelector('#loginModal');
const LOGLAB = document.querySelector('.login');
const APIURI = 'http://82.60.168.170/';

reqGList(compRen,LISTA);

function alertBox(element, elText, color = 'success') {
    const body = element;
    const al = document.createElement('div');
    al.classList.add('alert','alert-'+color);
    al.innerText = elText;

    body.insertBefore(al,body.childNodes[0]);
    
    setTimeout(function(){ element.removeChild(element.children[0]); },5000);
};

function loginSimpleSystem(e) {
    if(LOGLAB.getAttribute('typlog') === 'login') {
        reqPLoginSS(e);
    } else if (LOGLAB.getAttribute('typlog') === 'logout') {
        window.localStorage.removeItem('token');
        LOGLAB.setAttribute('typlog','login');
		LOGLAB.innerText = 'Login';
    }
};

LOGLAB.addEventListener('click', (e) => {
    if (LOGLAB.getAttribute('typlog') === 'logout') {
        window.localStorage.removeItem('token');
        LOGLAB.setAttribute('typlog','login');
		LOGLAB.innerText = 'Login';
    }
});

if (window.localStorage.getItem('token') === null) {
    window.localStorage.removeItem('token');
    LOGLAB.setAttribute('typlog','login');
    LOGLAB.innerText = 'Login';
} else {
    reqPLoginSS({value: window.localStorage.getItem('token')});
}