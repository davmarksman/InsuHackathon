import json from './listed.json'


export default function(searchTerm){
  console.log("Searching for... ", searchTerm);
  const result = json.find(listing => listing.Name.includes(searchTerm.street));
  console.log("result", result);
  
  if(result == null ){
    return {
      isListed: false,
    };
  }else{
    return {
      // result props are upper case
      isListed:true,
      grade: result.Grade,
      link: result.Link
    };
  }
}