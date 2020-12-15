/* Includes: */
var http = require('http');
var url = require('url');
var fs = require('fs');

function phoneMain(res) {
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<meta charset=\"utf - 8\"/>");
    res.write("<style type=\"text / css\">");
    res.write("body { background: #FFEEEE; font - size: 125 %; }");
    res.write("table { border: solid 1px #000000; background: #FFDDDD; }");
    res.write("td { border: none; background: white; }");
    res.write("</style>");
    res.write("</head>\n");
    res.write("<body>\n");

    let data = fs.readFileSync('phone.lis');
    // res.write(data);
    let lines = data.toString().split(/\r?\n/);

    for (l of lines) {
        res.write("<tr>");
        let wordlist = l.split(',');
        for (words of wordlist) {
            res.write("<td>" + words + "</td>\n");
        }
        res.write("<tr>");
    }
    

    res.write("<h1>Add to phonelist</h1>");
    res.write("<form action=\"/append\">");
    res.write("<table>");

    res.write("<tr><td>First Name:</td>");
    res.write("<td><input name=\"fornamn\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Last name:</td>");
    res.write("<td><input name=\"efternamn\" type=\"text\"/></td></tr>");
    
    res.write("<tr><td>Adress:</td>");
    res.write("<td> <input name=\"adress\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Email:</td>");
    res.write("<td> <input name=\"email\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Phone:</td>");
    res.write("<td> <input name=\"phone\" type=\"text\"/></td></tr>");

    res.write("<td></td>");
    res.write("<td><input type=\"submit\" value=\"Add!\"/></td></tr>");
    res.write("</table></form>");
    res.write("</body>");
    res.write("</html>");
}

function appendMain(res, query) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("<head>\n");
    res.write("<meta charset=\"utf - 8\"/>");
    res.write("</head>\n");
    res.write("<body>\n");
    var fornamn = query.fornamn;
    var efternamn = query.efternamn;
    var address = query.adress;
    var email = query.email;
    var phone = query.phone;
    res.write("<p>Lade till " +fornamn+ " " +efternamn+ " " +email+ " " +phone+ " på " +address+ "</p>");
    fs.appendFileSync('phone.lis', fornamn +" " +efternamn+ "," +address+ "," +email+ "," +phone+ "\n");
    let data = fs.readFileSync('phone.lis');
    // res.write(data);
    let lines = data.toString().split(/\r?\n/);
    for (l of lines) {
        res.write("<p>" + l + "</p>");
    }
    res.write("  </body>\n");
    res.write("</html>\n");
}
function addNewContact(res, query) {
    res.write("<h1>Add to phonelist</h1>");
    res.write("<form action=\"/append\">");
    res.write("<table>");

    res.write("<tr><td>First Name:</td>");
    res.write("<td><input name=\"fornamn\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Last name:</td>");
    res.write("<td><input name=\"efternamn\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Adress:</td>");
    res.write("<td> <input name=\"adress\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Email:</td>");
    res.write("<td> <input name=\"email\" type=\"text\"/></td></tr>");

    res.write("<tr><td>Phone number:</td>");
    res.write("<td> <input name=\"phone\" type=\"text\"/></td></tr>");

    res.write("<td></td>");
    res.write("<td><input type=\"submit\" value=\"Add!\"/></td></tr>");
    res.write("</table></form>");
    res.write("</body>");
    res.write("</html>");
}
//function showList(res) {
//    let data = fs.readFileSync('phone.lis');
//     res.write(data);
//    let lines = data.toString().split(/\r?\n/);
//    for (l of lines) {
//        res.write("<p>" + l + "</p>");
//    }

//    res.write("<html><head>");
//    res.write("<meta charset=\"utf - 8\"/>");
//    res.write("<style type=\"text/css\">");
//    res.write("<body { background: #FFEEEE; font-size: 125%; }>");
//    res.write("<table { border: solid 1px #000000; background: #FFDDDD; }>");
//    res.write("<td { border: none; background: white; }>");
//    res.write("</style></head>");
//    res.write("<body>");
//    res.write("<table>");
//    res.write("<tr><th>Name</th><th>Address</th><th>Email</th><th>Phone</th></tr>");
//    res.write("<script>");

//    var sortera = data.toString().split(/\r?\n/);
//    for (i in lines) {
//        sortera.push(i);
//    }
//    sortera.sort();
//    res.write(sortera);
//    for (i of sortera) {
//        document.write("<tr><td>" + i + "</td>");
//        document.write("<td>" + lines[i].adress + "</td>");
//        document.write("<td>" + lines[i].telefon + "</td>");
//        document.write("<td>" + lines[i].email + "</td>");
//        document.write("</tr>");
//    }

//    res.write("</script></table></body></html>");
//}
/* Register server: */
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(req.url);
    var q = url.parse(req.url, true);
    var path = q.pathname;

    console.log("Serving " + req.url);
    if (path == "/") {
        phoneMain(res);
    }
    if (path == "/append") {
        appendMain(res, q.query);
    }
    if (path == "/add") {
        addNewContact(res, q.query);
    }
    //if (path == "/show") {
    //    showList(res);
    //}
    res.end();
}).listen(8080);
