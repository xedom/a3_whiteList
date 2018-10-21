function reqGList(cb,comp) {
	$.ajax({url:APIURI}).done(x => {
		x.forEach(el => {
			cb(comp,el.name,el.uid)
		});
	});
};

function reqDList(uid,comp) {
	$.ajax({url:APIURI,
		type:'DELETE',
		data: {uid}
	}).done(x => {
		Array.from(comp.children).forEach(el => {
			if(el.id == uid) {
				comp.removeChild(el);
			};
		})
	});
};

function reqPList(data,comp) {
	$.ajax({url:APIURI,
		type:'POST',data
	}).done(x => { 
		compRen(comp,x.name,x.uid);
		
		const body = ADDMODAL.getElementsByClassName('modal-body')[0];
		const al = document.createElement('div');
		al.classList.add('alert','alert-success');
		al.innerText = `Aggiunto: ${x.name} (${x.uid})`;

		body.insertBefore(al,body.childNodes[0]);

		NAMEINP.value = '';
		UIDINP.value = '';

		setTimeout(function(){ ADDMODAL.getElementsByClassName('modal-body')[0].removeChild(ADDMODAL.getElementsByClassName('modal-body')[0].children[0]); },5000);
	}).fail(x => {
		const body = ADDMODAL.getElementsByClassName('modal-body')[0];
		const al = document.createElement('div');
		al.classList.add('alert','alert-danger');
		al.innerText = x.responseJSON.error;

		body.insertBefore(al,body.childNodes[0]);

		setTimeout(function(){ ADDMODAL.getElementsByClassName('modal-body')[0].removeChild(ADDMODAL.getElementsByClassName('modal-body')[0].children[0]); },5000);
	});
};