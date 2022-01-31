const express = require('express')
const app = express()
app.use(express.json())

const port = 3000
var isgd = require('isgd');

const sqlite3 = require('sqlite3').verbose();

const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
// open the database
let db = new sqlite3.Database('C:/Users/luizteclastf5/github/encurtaurl/db/link.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the link database.');
});

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS link(ID INTEGER PRIMARY KEY AUTOINCREMENT,linkorigem text, linkcurto text, data text)');
});

//TODO write documentation to swagger on swagger.json
app.use(
	'/api-docs',
	swaggerUi.serve, 
	swaggerUi.setup(swaggerDocument)
);

app.post('/encurtar', (req, res) => {
	var endereco = req.body.myurl
	var dataatual = new Date()	
		isgd.shorten(endereco, async function(res2) {
		db.run('INSERT INTO link(linkorigem, linkcurto, data) '+
		'VALUES(?,?,?)',[endereco,res2,dataatual.toISOString()])
  .each('SELECT linkorigem FROM link', (err, row) => {
		if (err){
	  		throw err;
		}
		console.log(row.message);
  		});
    	res.send(res2);
	});
})

app.get('/porperiodo',async (req, res) => {
	var datainicial = req.body.datainicial
	var datafinal = req.body.datafinal

	let sql = ' SELECT linkorigem as linkorigem, ' +
  			' linkcurto as linkcurto, ' +
  			' data as data ' +
			' FROM link ' +
			' WHERE date(data) between ? and   ?'
			' ORDER BY data ';	
	db.all(sql,[datainicial,datafinal] ,function (err, json) {
		res.send(json)		// "[{"foo": 2}, {"foo": 3}]"
	});		
})

app.get('/porid',async (req, res) => {
	var ID = req.body.id
    let sql = ' SELECT linkorigem as linkorigem, ' +
  			' linkcurto as linkcurto, ' +
  			' data as data ' +
			' FROM link ' +
			' WHERE id =   ?'
			' ORDER BY data ';
	
	db.all(sql,[ID] ,function (err, json) {
		res.send(json)		// "[{"foo": 2}, {"foo": 3}]"
	});	
})

app.get('/porencurtamento',async (req, res) => {
	var linkorigem = req.body.encurtamento
	linkorigem = '%'+linkorigem+'%'
  let sql = " SELECT linkorigem as linkorigem, " +
  			" linkcurto as linkcurto, " +
  			" data as data " +
			" FROM link " +
			" WHERE linkorigem like ?  OR linkcurto like  ?  "+
			" ORDER BY data ";
	 db.all(sql,[linkorigem,linkorigem] ,function (err, json) {
		res.send(json)		// "[{"foo": 2}, {"foo": 3}]"
	});
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})