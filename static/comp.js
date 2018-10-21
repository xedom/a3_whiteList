function compRen(comp,n,i) {
	const row = document.createElement('div');
	row.classList.add('row','bg-light','p-2','m-1');
	row.id = i;
	row.addEventListener('click',compDel);
	
	const nome = document.createElement('div');
	nome.classList.add('col-5');
	nome.innerText = n;

	const id = document.createElement('div');
	id.classList.add('col-5');
	id.innerText = i;

	const del = document.createElement('div');
	del.classList.add('col-2');
	const del2 = document.createElement('div');
	del2.classList.add('text-danger','text-right', 'rmElLs');
	del2.setAttribute('data-toggle','modal');
	del2.innerText = 'Rimuovi';
	del.append(del2);

	row.append(nome,id,del);
	comp.append(row)
};

function compDel ({target}) {
	if(Array.from(target.classList).includes('rmElLs')) {
		const delID = target.parentElement.parentElement.id;
		reqDList(delID,LISTA);
	};
};

function compAdd (n,i) {
	const newUser = {name:n.value,uid:i.value};
	reqPList(newUser,LISTA);
};