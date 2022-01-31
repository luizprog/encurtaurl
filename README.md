# Service to get some link and make a short link to be easy share the short link generated

This service is write in NODEJS, is necessary use express framework and sqlite database to work with that.

First of all:
download de project, and then run $ node index.js

After running it`s time to run http requests to generate short links and manage existing registers in your branch.

Next is the http documentation to user this service
#
1 - Request to generate short link
POST /encurtar HTTP/1.1
Content-Type: application/json
Host: 127.0.0.1:3000
Content-Length: 35

{
	"myurl": "https://disney.com/"
}

#
2 - Request to get short links is already saved on database between 2 dates
GET /porperiodo HTTP/1.1
Content-Type: application/json
Host: 127.0.0.1:3000
Content-Length: 60

{
	"datainicial": "2022-01-29",
	"datafinal": "2022-01-31"
}

#
3 - Get link data with a id
GET /porid HTTP/1.1
Content-Type: application/json
Host: 127.0.0.1:3000
Content-Length: 14

{
	"id": "2"
}

#
4 - Get link data comparing with some text 
GET /porencurtamento HTTP/1.1
Content-Type: application/json
Host: 127.0.0.1:3000
Content-Length: 31

{
	"encurtamento": "flix.com"
}




## TODO
Change de database service for something more powerful and with scalability