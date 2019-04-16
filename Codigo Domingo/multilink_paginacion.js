boo.start();

//Funcion para abrir el jobsiteurl
boo.then(function(){
	boo.open(boo.out.url);
	boo.waitForSelector('div.categories_icons', function success(){
		boo.multilink_set({selector:"div.categories_icons a.w-inline-block"});
		boo.pushThen(['go-to-page']);
	},function fail(){
		boo.msg("[E] La pagina NO cargo!");
	},3000);
}, 'multilink_set');

boo.saveThen(function() {
	boo.multilink_open('wait-for-page-load');
}, "go-to-page");

//funcion para esperar por la informacion de la pagina
boo.saveThen(function() {
	boo.waitForSelector('ul.w-list-unstyled', 
	function success(){
      boo.pushThen(['extract']);
	},
	function fail(){
      boo.msg('[W]Text never changed!');
	},3000
);	
},"wait-for-page-load");

//Funcion para extraer los jobs
boo.saveThen(function() {
	html = this.takeHTML();
  	boo.noti('Entrando a pagina!');
	boo.noti( boo.getCurrentUrl() , "info");

	//Echo # of page and add +1 to current page counter
	boo.msg("Starting page: "+(++boo.out.numpage));
		
	//create page object -- pagejobs => array , have_next_page => false , nextpage => currentpage +1
	page = {pagejobs:[], have_next_page: false, nextpage: boo.out.numpage + 1};

	/*extract-start*/
	//var remap = {};
	$("ul.w-list-unstyled li.job_short",html).each(function( index ) {/*loop-start*/
		var job = {};/*init*/
      
      	var title = $(this).find("h3.post_title_h3").text().trim();
      	if(title!=""){
          job.title = title;
          var location = $(this).parent().parent().find("h1.gt_h1").text().split(" in ").pop().trim();
          if(location=="USA"){
          	job.location = "New York, NY, United States";  
          }else if(location=="UK"){
          	job.location = "London, United Kingdom";  
          }else if(location=="Russia"){
            job.location = "Moscow, Russia";
          }else if(location=="Israel"){
            job.location = "Tel-Aviv, Israel";
          }else{
            job.location = "Tel-Aviv, Israel";
          }
          
          job.url = $(this).find("a.w-clearfix.w-inline-block.link_to_post").attr("href");

          job.temp = "temp_3";

          page.pagejobs.push(job);  
        }
		

		
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
	
	/* Si existe el elemento*/
	if($("a:contains(next page »)", html).length > 0){
    	have_next_page = true;    
    } 
    
  
	/* Paginación por números
    $("div#reg5_div1 a", html).each(function(){
        if($(this).text().trim() == page.nextpage){
            have_next_page = true;
        }
    });*/
	

	if(have_next_page) boo.pushThen(['go-to-next-page']);
  	else boo.pushThen(["go-to-page"]);
}, "have-next-page"); 

boo.saveThen(function() {
	/*Haciendo click en un elemento*/
	boo.clickSelector("a:contains(next page »)");
	boo.waitForSelectorTextChange("ul.w-list-unstyled", 
	function success(){
      boo.pushThen(['extract']);
	},
	function fail(){
      boo.msg('[W] text never changed ...');
	},3000
);
	 
  	
	/* Abriendo un link en la página
	boo.multilink_set({urls:[""]});
	boo.multilink_open('wait-for-page-load');
	*/
}, "go-to-next-page");

boo.run();