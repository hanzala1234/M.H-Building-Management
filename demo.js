

var items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic', value: 13 },
    { name: 'Zeros', value: 37 }
  ];
  var myarr=[45,-12,13,21,37,37]
 var result=[];
 
 myarr.forEach(function(key){
  for(var i=0;i<items.length;i++){
    
      if(items[i].value==key) {result.push(items[i]); break;}
  }}); 

  console.log(result);