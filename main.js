 function fetchAndDecode(url,type){
      return fetch(url).then(response => {
        if(type=='blob')
          return response.blob();
        else if(type=='text')
          return response.text();
      }).catch(e=> {console.log("there is an error: "+e.message);});
      
    }