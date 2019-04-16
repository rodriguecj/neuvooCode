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
  $("job",html).each(function( index ) {/*loop-start*/
    var job = {};/*init*/
      
    job.title = $(this).find("title").html().split("CDATA[")[1].split("]]>")[0].trim().replace("]]&gt","").split(";")[0];

        var loc1 = $(this).find("city").html().split("CDATA[")[1].split("]]-->")[0].trim();
        var loc2 = $(this).find("state").html().split("CDATA[")[1].split("]]-->")[0].trim();
        var loc3 = $(this).find("country").html().split("CDATA[")[1].split("]]-->")[0].trim();

        if(loc1.length>1){
          job.location = loc1;
          if(loc2.length>1){
            job.location = job.location+", "+loc2;
            if(loc3.length>1){
              job.location = job.location+", "+loc3; 
            }
          }else{
            if(loc3.length>1){
              job.location = job.location+", "+loc3; 
            }
          }
        }else{
          if(loc2.length>1){
            job.location = loc2;
            if(loc3.length>1){
              job.location = job.location+", "+loc3; 
            }
          }else{
            if(loc3.length>1){
              job.location = loc3; 
            }
          }
        }
    
    job.source_empname=$(this).find("company").html().split("CDATA[")[1].split("]]-->")[0].trim();
    job.source_jobtype=$(this).find("type").html().split("CDATA[")[1].split("]]-->")[0].trim();
    job.url = $(this).find("url").html().trim().split("CDATA[")[1].split("]]-->")[0].trim();

    
    

        date = $(this).find("date").html().split("CDATA[")[1].split("]]-->")[0].replace(/\-/gi,"/");
    
        if(date.length<1){
          date = "sin info";
        }else{
      var day=date.split("/")[2];
      var month=date.split("/")[1];
      var year=date.split("/")[0];
      date = month+"/"+day+"/"+year;
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
        //job.html = boo.removeTextAfter(job.html, ">", false);
        
    job.temp = 2;

      //job.jobdesc = $("<div>"+job.html+"</div>").text();
    job.jobdesc=job.html.split("<!--[CDATA[")[1].replace("]]-->","");
 
      
    if(job.title.length > 0 && job.location.length > 0){
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