boo.start(boo.out.url);
var url = boo.out.url;
var aux;

boo.then(function(){
  
	aux = boo.evaluate(function(url_) {
  
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url_, false);
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
	
    var hola = "";
    xhrrequest.onreadystatechange = function() {
        //return xhrrequest.status;
        //hola = "[Y]-> " + xhrrequest.status;
        if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
          //console.log(xhrrequest.responseText);
          {
            //console.log(xhrrequest.responseText);
            hola = xhrrequest.responseText;
          }
    };
	
    xhrrequest.send(); 
    return hola;
}, url);

      //Aqui vemos el json
      //boo.msg('[Y] ' + aux);

      var job = {};

      /*job-data-start*/

      var json = JSON.parse(aux);
      //job.html = json.openGraphAttributes.description;
      job.html = json.body.children[1].children[0].children[2].text;

      // job.location = $("", html).find("").text();
      // job.logo = $("", html).find("").attr("src");
      // job.source_apply_email = $("", html).find("").text();
      // job.source_empname = $("", html).find("").text();
      // job.source_jobtype = $("", html).find("").text();
      // job.source_salary = $("", html).find("").text();

      //	job.html = boo.removeTextBefore(job.html, "", false);
      //	job.html = boo.removeTextAfter(job.html, "", true);
      job.html = boo.cleanHTML(job.html);


      /*job-data-end*/
      this.updateJob(job);
  
});

boo.run();