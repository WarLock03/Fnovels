# FNovels
A free & open source custom api server for novel collection. Collect novel data and it's volumes/chapters for free.

` This service was for entertainment purposes only. We do not owned any files that provided. `

# How to use?
Copy api url
```
https://warlock03.github.io/Fnovels/api/collection.json
```
##### Fetch data
``` js
fetch('https://warlock03.github.io/Fnovels/api/collection.json')
.then(response => {
  if(!response.ok){
    throw new Error('Failed to fetch data!');
  }
  return response.json();
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.log(error);
});
```
##### Response Code
``` json
[
  {
    "id": "",
    "title_english": "",
    "title": "",
    "currentVolume": {
      "volume": "",
      "cover": ""
    },
    "status": "",
    "type": "",
    "translationGroup": "",
    "translationType": "",
    "author": "",
    "artist": "",
    "release": {
      "start": "",
      "end": ""
    },
    "genres": [],
    "synopsis": "",
    "volumes": [
      {
        "volume": "",
        "cover": "",
        "link": ""
      }
    ]
  }
]
```
##### Search data by title
``` js
const apiUrl = 'https://warlock03.github.io/Fnovels/api/collection.json';

function searchData(data, searchValue){
  return data.find(item => item.title === searchValue);
}

// Example search Private Tutor
const results = searchData(apiUrl, 'Private Tutor');
if(results){
  console.log('Data found');
}else{
  console.log('No data found!');
}
```
> This would give a result for Private tutor to the dukes daugther along with it's available volumes
