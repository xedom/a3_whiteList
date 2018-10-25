function reqGList(cb,comp) {
	$.ajax({url:APIURI+'api'}).done(x => {
		x.forEach(el => {
			cb(comp,el.name,el.uid)
		});
	});
};

function reqDList(uid,comp) {
	$.ajax({url:APIURI+'api',
		type:'DELETE',
		data: {uid},
		headers: {
			"token":window.localStorage.getItem('token') || null
		}
	}).done(x => {
		Array.from(comp.children).forEach(el => {
			if(el.id == uid) {
				comp.removeChild(el);
			};
		})
	}).fail(x => alert(x.responseJSON.error));
};

function reqPList(data,comp) {
	$.ajax({url:APIURI+'api',
		type:'POST',data,
		headers: {
			"token":window.localStorage.getItem('token') || null
		}
	}).done(x => { 
		compRen(comp,x.name,x.uid);

		alertBox(
			ADDMODAL.getElementsByClassName('modal-body')[0],
			`Aggiunto: ${x.name} (${x.uid})`,
			'success'
		);

		NAMEINP.value = '';
		UIDINP.value = '';
	}).fail(x => {
		alertBox(
			ADDMODAL.getElementsByClassName('modal-body')[0],
			x.responseJSON.error,
			'danger'
		);
	});
};


function reqPLoginSS(key) {
	$.ajax({url:APIURI+'login',
		type:'POST',
		data: { token: key.value }
	}).done(x => {
		alertBox(
			LOGMODAL.getElementsByClassName('modal-body')[0],
			'Accesso effettuato con successo',
			'success'
		);
		
		window.localStorage.setItem('token',x.token);
		LOGLAB.setAttribute('typlog','logout');
		LOGLAB.innerText = 'Logout';

		key.value = '';
	}).fail(x => {
		alertBox(
			LOGMODAL.getElementsByClassName('modal-body')[0],
			'Chiave invalida',
			'danger'
		);
        window.localStorage.removeItem('token');
        LOGLAB.setAttribute('typlog','login');
		LOGLAB.innerText = 'Login';
	});
};