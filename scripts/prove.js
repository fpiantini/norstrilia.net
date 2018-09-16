function pf_alert()
{
   alert("This is an alert box");
}

function pf_confirm()
{
   var ret;   
   ret = confirm("This is a confirm box");
   return ret;
}

function pf_prompt(msg, def_val)
{
   var ret;   
   ret = prompt(msg, def_val);
   return ret;
}


function pf_some_arithmetic()
{
   var x=1;
   var y=2;

   write_par("x vale: " + x);
   write_par("y vale: " + y);
   write_par("x+y vale: " + (x+y));
}



/* ---------------------------------------------------- */
/* funzioni private */
function write_par(str)
{
   document.write("<p>");
   document.write(str);
   document.write("</p>");
}


