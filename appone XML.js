boo.start(boo.out.url);

boo.then(function() {
  //lets take a picture of the current page and save its html
  this.pic();
  var html = "<xml>"+this.getHTML()+"</xml>";
    //Echo # of page and add +1 to current page counter
  this.msg("Starting page: "+(++this.out.numpage));
    
  //create page object -- pagejobs => array , have_next_page => false , nextpage => currentpage +1
  var page = {pagejobs:[], have_next_page: false, nextpage: this.out.numpage + 1};

  /*extract-start*/
  //var remap = {};
    //html = $.parseXML( html );
  $("item",html).each(function( index ) {/*loop-start*/
    var job = {};/*init*/
      
    job.title = $(this).find("title").html().split("CDATA[")[1].split("]]>")[0].trim().replace("]]&gt","").split(";")[0];
    var title = $(this).find("title").html().split("CDATA[")[1].split("]]>")[0].trim();
    job.location = title.replace(')','').replace('SCA','Corona').replace('Lake','').replace('FL','Florida');
    
    if (job.location.indexOf('Corona') > -1) {
      job.location = job.location.replace('Corona','Corona, California, United States');
    }
    if (job.location.indexOf('San Diego') > -1) {
      job.location = job.location.replace('San Diego','San Diego, California, United States');
    }
    
    if (job.location.indexOf('(WD') > -1) {
      job.location = job.location.replace(')','').replace('Kros-Wise HQ','').split('(')[2];
      
    }else if (job.location.indexOf('(CTO') > -1) {
      job.location = job.location.replace(')','').split('(')[2];
      
    }else if (job.location.indexOf('(IA') > -1) {
      job.location = job.location.replace(')','').split('(')[2];
      
    }else if (job.location.indexOf('(Kros') > -1) {
      job.location = job.location.replace(')','').split('(Kros-')[1].replace('Wise HQ','');
      
    }else{
      job.location = job.location.replace('Kros-Wise HQ','').split('(')[1];
    }
    job.url = $(this).find('guid').html();
    
    
    job.location = job.location.replace("]]&gt","").split(";")[0];
     job.title =  job.title.split('(')[0].replace('&amp','');
    
   // job.source_empname=$(this).find("company").html().split("CDATA[")[1].split("]]-->")[0].trim();
   // job.source_jobtype=$(this).find("type").html().split("CDATA[")[1].split("]]-->")[0].trim();


     var   date = $(this).find("pubdate").html().replace(/\-/gi,"/");
  
        if(date.length<1){
         var date = "sin info";
           }else{
      var job_date = new Date(date);
      var actual_date = new Date();
      var result_date = actual_date.getTime() - job_date.getTime() ;
      var miliseconds_in_six_months = (1000 * 60 * 60 * 24* 365)/ 2;
      result_date = result_date/miliseconds_in_six_months;
      if (result_date < 1){
        date = "vigente";        
      }else{
        date="";
      }
    }
         job.html = $(this).find("description").html().trim();
    //job.html = boo.removeTextBefore(job.html, "Edad del cliente", false);
    //  job.html = boo.removeTextAfter(job.html, ">", false);
        
    job.temp = 1;
      job.jobdesc = $("<div>"+job.html+"</div>").text();
    job.jobdesc=job.html.split("<!--[CDATA[")[1].replace("]]-->","").replace("]]&gt;","");
 
  //    
    if(job.title.length > 0 && job.location.length > 0 && date.length > 0){
      page.pagejobs.push(job);
    }
    
  });/*loop-end*/
  /*extract-end*/
    
    //Echo # of jobs found
    this.msg("Jobs found: "+page.pagejobs.length);
    //Send jobs to Ghost Process
  this.send_jobs(page.pagejobs);
   
  /*check-nextpage-start*//*check-nextpage-end*/
   
  /*goto-nextpage-start*//*goto-nextpage-end*/
    
}, "extract");
boo.run();

/*nextpage-func-start*//*nextpage-func-start*/