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
      isListed:true,
      grade: result.grade,
      link: result.link
    };
  }
}