var express = require('express');

var router = express.Router();

var todoItems = [
	{ id: 1, desc: 'foo' },
	{ id: 2, desc: 'bar' },
	{ id: 3, desc: 'baz' }
];

router.get('/', function(req, res){
	//Load data from DB HERE
	res.render('index', {
		title: 'My App',
		items: todoItems
	});
	
});

router.get('/list', function(req, res){
	//Load data from DB HERE
	res.render('list', {
		title: 'List Person',
		items: todoItems
	});
	
});

router.post('/add', function(req, res){
	var newItem = req.body.newItem;
	if( req.body.newItem ){
		todoItems.push({
			id: todoItems.length+1,
			desc: newItem
		});
	}

	res.redirect('/');
});

router.post('/remove', function(req, res){
	console.log(req.body.id);
	var deletedItem = "not_found";
	todoItems.forEach(function(item, index) {
		if(parseInt(req.body.id, 10) === parseInt(item.id, 10)){
			todoItems.splice(index, 1);	
			deletedItem = item.id;
		}  
	});
	var returnValue = JSON.stringify({ 
	    anObject: todoItems, 
	    deletedItem: deletedItem
	  });
	res.end(returnValue);
})

router.post('/modify', function(req, res){
	console.log(req.body.id);
	var modifiedItem = "not_found";
	todoItems.forEach(function(item, index) {
		if(parseInt(req.body.id, 10) === parseInt(item.id, 10)){
			todoItems[index].desc = req.body.desc;	
			modifiedItem = item.id;
		}  
	});
	var returnValue = JSON.stringify({ 
	    anObject: todoItems, 
	    modifiedItem: modifiedItem
	  });
	res.end(returnValue);
})


module.exports = router;
