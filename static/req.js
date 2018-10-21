function reqGList(cb,comp) {
	$.ajax({url: "http://127.0.0.1:8000/api"}).done(x => {
		x.forEach(el => {
			cb(comp,el.name,el.uid)
		});
	});
};

function reqDList(uid,comp) {
	$.ajax({url:'http://127.0.0.1:8000/api',
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
	$.ajax({url:'http://127.0.0.1:8000/api',
		type:'POST',data
	}).done(x => { 
		compRen(comp,x.name,x.uid);
	});
};