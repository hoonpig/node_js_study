//import 구문
var http    = require('http');
var fs      = require('fs');
var url     = require('url');
var qs      = require('querystring');

/*
    - 실행은 해당 디렉토리 이동 이후, node js파일명
    - pm2 설치 이후내용
        : start : pm2 start js명.js
            예 ) pm2 start main.js
        : stop : pm2 stop jsname
            예 ) pm2 stop main
        : 소스 hot loader(즉시반영)은 끝에 --watch 를 붙여준다
            예 ) pm2 start main.js --watch
        : log 확인 : pm2 log
*/

    function templateHTML(title, list, body, control){
        return `
                       <!doctype html>
                       <html>
                       <head>
                         <title>WEB1 - ${title}</title>
                         <meta charset="utf-8">
                       </head>
                       <body>
                         <h1><a href="/">WEB</a></h1>
                           ${list}
                           ${control}
                           ${body}
                       </body>
                       </html>
                       `;
    }

    function templetList(filelist){
        var list ='<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
        }
        list = list + '</ul>';

        return list;
    }

    var app     = http.createServer(function(request, response){
        var _url        = request.url;
        var queryData   = url.parse(_url, true).query;
        var pathname    = url.parse(_url, true).pathname;

        if(pathname === '/'){
            if(queryData.id === undefined){
                fs.readdir('./data', function(error, filelist){
                    var title = 'welcome';
                    var description = 'hello, node js'
                    var list = templetList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
                    response.writeHead(200);
                    response.end(template);
                });
            }else{
                fs.readdir('./data', function(error, filelist){
                    fs.readFile(`./data/${queryData.id}`,'utf8', function(err , description){
                        var title       = queryData.id;
                        var list = templetList(filelist);
                        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
                            `   <a href="/create">create</a>
                                <a href="/update?id=${title}">update</a>
                                <form action="/delete_process" method="post">
                                    <input type = "hidden" name="id" value="${title}">
                                    <input type = "submit" value="delete">
                                </form>
                            `);
                        response.writeHead(200);
                        response.end(template);
                    });
                });
            }
        }else if(pathname === '/create'){
            fs.readdir('./data', function(error, filelist){
                var title = 'web - create';
                var list = templetList(filelist);
                var template = templateHTML(title, list, `
                    <form action="/create_process" method="post">
                        <p>제목 : <input type="text" name = "title" id = "title" placeholder="title"></p>
                        <p>내용 : <textarea name="description" id = "description" placeholder="description"></textarea></p>
                        <p><input type="submit" /></p>
                    </form>
                `,'');
                response.writeHead(200);
                response.end(template);
            });
        }else if(pathname === '/create_process'){
             var body = '';

             request.on('data', function(data){
                body += data;
             });
             request.on("end",function(){
                var post        = qs.parse(body);
                var title       = post.title;
                var description = post.description;
                console.log(post);

                fs.writeFile(`./data/${title}`, description, 'utf8',function(err){
                    response.writeHead(302,{Location:`/?id=${title}`});
                    response.end();
                });
             });
        }else if(pathname === '/create_process'){
               var body = '';

               request.on('data', function(data){
                  body += data;
               });
               request.on("end",function(){
                  var post        = qs.parse(body);
                  var title       = post.title;
                  var description = post.description;
                  console.log(post);

                  fs.writeFile(`./data/${title}`, description, 'utf8',function(err){
                      response.writeHead(302,{Location:`/?id=${title}`});
                      response.end();
                  });
               });
           }else if(pathname === '/update'){
                fs.readdir('./data', function(error, filelist){
                   fs.readFile(`./data/${queryData.id}`,'utf8', function(err , description){
                       var title       = queryData.id;
                       var list = templetList(filelist);
                       var template = templateHTML(title, list,
                            `
                                <form action="/update_process" method="post">
                                    <input type="hidden" name="id" value="${title}">
                                    <p>제목 : <input type="text" name = "title" id = "title" placeholder="title" value="${title}"></p>
                                    <p>내용 : <textarea name="description" id = "description" placeholder="description">${description}</textarea></p>
                                    <p><input type="submit" /></p>
                                </form>
                            `,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                       response.writeHead(200);
                       response.end(template);
                   });
                });
           }else if(pathname ==="/update_process"){
               var body = '';

               request.on('data', function(data){
                  body += data;
               });
               request.on("end",function(){
                  var post        = qs.parse(body);
                  var id          = post.id;
                  var title       = post.title;
                  var description = post.description;
                  fs.rename(`data/${id}`, `data/${title}`, function(err){
                    fs.writeFile(`./data/${title}`, description, 'utf8',function(err){
                        response.writeHead(302,{Location:`/?id=${title}`});
                        response.end();
                    });
                  });
               });
           }else if(pathname === "/delete_process"){
               var body = '';
               request.on('data', function(data){
                  body += data;
               });
               request.on("end",function(){
                  var post        = qs.parse(body);
                  var id          = post.id;

                  fs.unlink(`data/${id}`, function(err){
                    response.writeHead(302,{Location:`/`});
                    response.end();
                  });

               });
           }else{
            response.writeHead(404);
            response.end('NOT FOUND');
        }
    })

app.listen(3000);