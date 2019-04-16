boo.start();

//Funcion para abrir el jobsiteurl
boo.then(function() {
	boo.open(boo.out.url);
	boo.pushThen(['extract']);
}, "go-to-page");

//maxPage => numero paginas maximo , nextPage => proxima pagina , actualPage => pagina actual
var num = {maxPage: 0, nextPage:0, actualPage:0, aux: true};
//num.aux = false;

//Funcion para extraer los jobs
boo.saveThen(function() {
	html = this.getHTML();

	//Echo # of page and add +1 to current page counter
	boo.msg("Starting page: "+(++boo.out.numpage));

	//create page object -- pagejobs => array , have_next_page => false , nextpage => currentpage +1
	page = {pagejobs:[], have_next_page: false, nextpage: boo.out.numpage + 1};

	var json = JSON.parse(this.getPageContent());

	//Extrae el numero de paginas existentes, para luego paginar
    if(num.aux){
      num.maxPage = parseInt(json.body.children[0].facetContainer.paginationCount.value);
      num.aux = false;
    }
  boo.msg("[Y] Total páginas: "+ num.maxPage); 
  boo.msg("[Y] Página actual: "+ num.actualPage); 

  //Extrae la lista de jobs del json
  var jobs = json.body.children[0].children[0].listItems;/*loop item*/

	/*extract-start*/
	//var remap = {};
	jobs.forEach(function( jobs ) {/*loop-start*/
		var job = {};/*init*/

		job.title = jobs.title.instances[0].text;

       // job.title =jobs.title.replace("â€“","");
        job.location = jobs.subtitles[0].instances[0].text.replace(", More...","").replace("- REMOTE","").replace("CZ - KouÅ™im","CZ - Kouřim");
		
        if(job.title){
            if(job.title.search(':')>-1){
              job.title = job.title.split(':')[1];
            }
        }
      
      if(job.title){
        var sub = job.title.substring(0,5);
        if(sub.indexOf('LM')>-1){
          job.title = job.title.replace(sub.trim(),'');
          boo.msg('[Y]'+job.title);
        } 
       }
      
     // job.title = job.title.split(':')[1];
      
      job.location = job.location.split('/').pop();
      var trash = job.location.substring(0,4);
      //boo.msg('[Y]'+trash);
      job.location = job.location.replace(trash.trim(),'');
      
              if(job.location.indexOf('TAPO I')>-1){
          job.location = 'Ciudad de México, MX';
        }

        function functionFilter(fredy) {
          var temps = ["Ã€", "Ã‚", "Ãƒ", "Ã„", "Ã…", "Ã†", "Ã‡", "Ãˆ", "Ã‰", "ÃŠ", "Ã‹",
                       "ÃŒ", "ÃŽ", "Ã‘", "Ã’", "Ã“", "Ã”", "Ã•", "Ã–", "Ã—", "Ã˜",
                       "Ã™", "Ãš", "Ã›", "Ãœ", "Ãž", "ÃŸ", "Ã¡", "Ã¢", "Ã£", "Ã¤", "Ã¥",
                       "Ã¦", "Ã§", "Ã¨", "Ã©", "Ãª", "Ã«", "Ã¬", "Ã®", "Ã°", "Ã±", "Ã²",
                       "Ã³", "Ã´", "Ãµ", "Ã¶", "Ã•", "Ã¸", "Ã¹", "Ãº", "Ã»", "Ã¼", "Ã½", 
                       "Ã¾", "Ã¿","â€“","Â"
                      ];

          var aux = ["À", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì",
                     "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û",
                     "Ü", "Þ", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é",
                     "ê", "ë", "ì", "î", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷",
                     "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"
                    ];

          temps.some(function (temp, i) {
            if (job[fredy].indexOf(temp) > -1) {
              job[fredy] = job[fredy].replace(new RegExp(temp, 'g'), aux[i]);   
              return true;
            }
          });
        }

        functionFilter('title');
        functionFilter('location');
        // job.multilocation = "";
        job.url = "https://nyp.wd1.myworkdayjobs.com" + jobs.title.commandLink;
		// job.logo = jobs.;
		// job.source_apply_email = jobs.;
		// job.source_empname = jobs.;
		// job.source_jobtype = jobs.;
		// job.source_salary = jobs.;
		job.temp = 64;

		page.pagejobs.push(job);

	});/*loop-end*/
	/*extract-end*/

    //Echo # of jobs found
    boo.msg("Jobs found: "+page.pagejobs.length);
	//Send jobs to Ghost Process
	boo.send_jobs(page.pagejobs);

		boo.pushThen(['have-next-page']);
}, "extract");

boo.saveThen(function() {
	var have_next_page = false;

  if(parseInt(num.actualPage) < parseInt(num.maxPage)){
    num.actualPage = num.actualPage + 50;
		have_next_page = true;
	}

	if(have_next_page) boo.pushThen(['go-to-next-page']);
}, "have-next-page");

boo.saveThen(function() {

	num.nextPage = num.nextPage+50;
    var nexturl = "https://nyp.wd1.myworkdayjobs.com/nypcareers/24/searchPagination/318c8bb6f553100021d223d9780d30be/"+num.nextPage+"?clientRequestID=f8123e06056e49559a1902cefdfb2a1a";
	this.thenOpen(nexturl, function() {  
		this.pushThen(["extract"]);
	});

}, "go-to-next-page");

boo.run();
