import json from './listed.json'


export default function(searchTerm){
  const result = json.find(listing => listing.Name.includes(searchTerm));
  console.log("result", result);
  return result;
}