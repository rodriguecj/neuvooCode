boo.start();
var number_job_now = 0;
var now = new Date().setHours(0,0,0,0);
//---------------------------Función para abrir el jobsiteurl------------------------------------------------------------------

boo.then(function() {
  boo.open(boo.out.url);
  boo.pushThen(['wait-for-page-load']);
}, "go-to-page");

//--------------------------Función para esperar por la informacion de la página---------------------------------------------------------

boo.saveThen(function() {
  boo.waitForSelector('div', function success( ){
    boo.msg('[I]Pagina cargada');
       boo.pushThen(['extract']);
  },function fail(){
    boo.msg('[W]La pagina no cargó');
  },5000);
},"wait-for-page-load");

//---------------------------------------------------------------------------------------------
//Funcion para extraer los jobs
  boo.saveThen(function() {
  html = this.takeHTML();
  boo.msg("Starting page: "+(++boo.out.numpage));
  page = {pagejobs:[], have_next_page: false, nextpage: boo.out.numpage + 1};

//------------------------------------Extract-Start-------------------------------------------------
  /*extract-start*/
  $("#items_biens li",html).each(function( index ) {/*loop-start*/
    var job = {};/*init*/
    
	job.title = $(this).find("div.row div.col-xs-8.titre_annonces").text();
    //job.location = $(this).find("span.jobLocation").text();
    //job.location = $(this).html().split("").pop().split("-").shift();
    // job.location = boo.cleanLoc(job.location, '', remap); 
    // job.multilocation = "";
    job.url = ("http://www.1001interimair.fr/" + $(this).find("div.lien_annonces a").attr("href"));
    // job.logo = $(this).find("").attr("src");
    // job.source_apply_email = $(this).find("").text();
    // job.source_empname = $(this).find("").text();
    // job.source_jobtype = $(this).find("").text();
    // job.source_salary = $(this).find("").text();
    var get_date = $(this).find("div.date_annonces").text().split(":")[1].trim();
    
    job.temp = 1;
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var job_date = new Date(get_date.split("/")[2],get_date.split("/")[1],get_date.split("/")[0]); //(new Date().getTime() - Date.parse(get_date))/years;
    //boo.msg("[W] Date: "+ job_date);
    if (now < job_date){
       if(job.title.length > 0){
       //boo.msg("[I] Date: "+ job_date);
         page.pagejobs.push(job);
       }
    }
    
  });/*loop-end*/
  /*extract-end*/


//-------------------------------------Extract-End-------------------------------------------------------    
    //Echo # of jobs found
    boo.msg("Jobs found: "+page.pagejobs.length);
    boo.send_jobs(page.pagejobs); 
    var number_job_update = page.pagejobs.length;
    var number_job_update_int = parseInt(number_job_update,10);
    number_job_now = number_job_now +number_job_update_int;
    boo.msg("[Y]Number jobs now: "+ number_job_now);
    boo.pushThen(['have-next-page']);
}, "extract");

/*--------------------------- ----Check-nextpage-start--------------------------------------------------------------------*/

boo.saveThen(function() {
  if($("div.pagination a:contains("+page.nextpage+")", html).length > 0){
      boo.msg('[I]CHECK OK');      
      boo.pushThen(['go-to-next-page']);
   } 
}, "have-next-page"); 

/*----------------------------------Goto-nextpage-start-----------------------------------------------------------*/

boo.saveThen(function() {
  boo.clickSelector("div.pagination a:contains("+page.nextpage+")");
  boo.waitForSelectorTextChange("table#searchresults", 
  function success(){      
       boo.pushThen(['extract']);
  },
  function fail(){
       boo.msg('[W] No pagina');
  },15000
 );
  
}, "go-to-next-page");


/*------------------------------------Goto-nextpage-end-------------------------------------------------*/

boo.run();