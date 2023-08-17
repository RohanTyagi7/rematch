import './App.css'
import React, { useState, useEffect, useRef } from 'react';
import domtoimage from 'dom-to-image';

export default function App() {
  var [text, setText] = useState((localStorage.getItem('text') == undefined || localStorage.getItem('text') == null)?(""):(localStorage.getItem('text')));
  var [matches, setMatches] = useState((localStorage.getItem('text') == undefined || localStorage.getItem('text') == null)?([{}]):(findMatches()));
  var [matchesShow, setMatchesShow] = useState((localStorage.getItem('text') == undefined || localStorage.getItem('text') == null)?([{}]):(findMatches()));
  var count = 0;
   function findNextMatch(desc){
    var z = 0;
    for(let i = 0; i < matches.length; i++){
      if(matches[i]['Status'] == "200"){
        z++;
      }
    }
    var time = "";
    var err = "";
    var indexTime = 0;
    if(desc.includes('am qual')){
      indexTime = desc.indexOf('am qual')+3;
      time = desc.substring(desc.indexOf('am qual')-6,desc.indexOf('am qual')+2).replace('\n', '').replace('\r', '').trim()
    }
    else if(desc.includes('pm qual')){
      indexTime = desc.indexOf('pm qual')+3;
      time = desc.substring(desc.indexOf('pm qual')-6,desc.indexOf('pm qual')+2).replace('\n', '').replace('\r', '').trim()
    }
    else if(desc.includes('pmi qual')){
      indexTime = desc.indexOf('pmi qual')+3;
      time = desc.substring(desc.indexOf('pmi qual')-7,desc.indexOf('pmi qual')+2).replace('\n', '').replace('\r', '').trim()
    }
    else{
      time = "n/a"
      err += "Probably bad picture, times do not match amount of quals, "
    }
    //desc = desc.replace(/\r/g, " ").replace(/\n/g, " ")
    var index = 0;
    var cl = 0;
    var word = "";
    var teamList = [];
    const txt = (desc.substring(indexTime, indexTime + 200));
    //console.log(txt)
    while(teamList.length < 6){
    while(word.length == 0 || word.includes('a') || word.includes('b') || word.includes('c') || word.includes('d') || word.includes('e') || word.includes('f') || word.includes('g') || word.includes('h') || word.includes('i') || word.includes('j') || word.includes('k') || word.includes('l') || word.includes('m') || word.includes('n') || word.includes('o') || word.includes('p') || word.includes('q') || word.includes('r') || word.includes('s') || word.includes('t') || word.includes('u') || word.includes('v') || word.includes('w') || word.includes('x') || word.includes('y') || word.includes('z')){
    while(txt.substring(index, index + 1) != " " && txt.substring(index, index + 1) != "|" && txt.substring(index, index + 1) != "/" && txt.substring(index, index + 1) != "[" && txt.substring(index, index + 1) != "."){
      word += txt.substring(index, index + 1);
      index++;
      if(z+1 == 29){
        //console.log(word)
      }
      //console.log(word)
      cl++;
      if(cl > 9999){
        return{"Qual": (z + 1), "teamList": teamList, "time": time, "Status": "Oh, this was bad"}
        
      }
    }
    if(((z+1) + "" + (z+1)) != word && (word.length > 2) && (word != ((z + 1) + "")) && txt.substring(index, index + 1) != "/" && txt.substring(index, index + 1) != "[" && !(word.includes('a') || word.includes('b') || word.includes('c') || word.includes('d') || word.includes('e') || word.includes('f') || word.includes('g') || word.includes('h') || word.includes('i') || word.includes('j') || word.includes('k') || word.includes('l') || word.includes('m') || word.includes('n') || word.includes('o') || word.includes('p') || word.includes('q') || word.includes('r') || word.includes('s') || word.includes('t') || word.includes('u') || word.includes('v') || word.includes('w') || word.includes('x') || word.includes('y') || word.includes('z'))){
      if(word.length == 5 && word.substring(0,1) == "1"){
        teamList.push(word.replace('1', '', 1).replace('*', '').replace('/', '').replace(' ', '').replace('(', '').replace(')', '').replace('|', ''))
      }
      else{
        teamList.push(word.replace('*', '').replace('/', '').replace(' ', '').replace('(', '').replace(')', '').replace('|', ''))
      }
      
      word = "";
      index++;
      //console.log("ADDED" + teamList.length)
      if(teamList.length == 6 && (z == 0 || matches[0]["time"] != time)){
        var infoR1 = {}
        var infoR2 = {}
        var infoR3 = {}
        var infoB1 = {}
        var infoB2 = {}
        var infoB3 = {}

         
        return  {"Qual": (z + 1) ,"time": time, "Red1": (teamList[0].length > 4 && teamList[0].includes((z + 1) + "" + "1"))?(parseInt(teamList[0].replace((z + 1) + "" + "1", ""))):((teamList[0].length > 4 && teamList[0].includes((z + 1) + "" + "4"))?(parseInt(teamList[0].replace((z + 1) + "" + "4", ""))):(parseInt(teamList[0]))), "Red2": parseInt(teamList[1]), "Red3": parseInt(teamList[2]), "Blue1": parseInt(teamList[3]), "Blue2": parseInt(teamList[4]), "Blue3": parseInt(teamList[5]), "Status": (err == "")?("200"):(err), "infoRed1": infoR1, "infoRed2": infoR2, "infoRed3": infoR3, "infoBlue1": infoB1, "infoBlue2": infoB2, "infoBlue3": infoB3}
      }
      else if((z > 1 && matches[0]["time"] == time)){
        
        return {"Status": "repeat"}
      }

    }
    else{
      word = ""
    index++;
    }
    
  }
}
    

    
  }

  function hasNextMatch(desc){
    return desc.includes('qual');
  }
  function findMatches(){
    count = 0;
    matches = []
    text = localStorage.getItem('text')
    while(hasNextMatch(text)){
      var x = findNextMatch(text);
      //console.log(text.indexOf('pm qual'))
        count++;
        text = text.replace('qual', '', 1)

        if(count != 1){
          matches = JSON.parse(JSON.stringify(matches).substring(0,JSON.stringify(matches).length-1) + "," + JSON.stringify(x) + "]")
        }
        else{
          matches = JSON.parse("[" + JSON.stringify(x) + "]")
        }
        //console.log(text)
        //console.log(x)
        
        
      
      
      
      
    }
    //console.log((matches))
    sessionStorage.setItem('matches', JSON.stringify(matches))
  }
  async function findText(url){
    console.log("clicked")
    var myHeaders = new Headers();
    myHeaders.append("apikey", "K83768811188957");

    var formdata = new FormData();
    formdata.append("language", "eng");
    formdata.append("isOverlayRequired", "false");
    formdata.append("base64Image", url);
    formdata.append("iscreatesearchablepdf", "false");
    formdata.append("issearchablepdfhidetextlayer", "false");
    formdata.append("OCREngine", "3");
    formdata.append("isTable", "false");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    console.log('located url')
    await fetch("https://api.ocr.space/parse/image", requestOptions)
      .then(response => response.json())
      .then(data => {
        const texts =  data['ParsedResults'][0]['ParsedText'].toLowerCase().replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g," ");
       console.log(data['ParsedResults'][0])
       console.log('set Texts')
      //console.log(texts)
      setText(texts);
      localStorage.setItem('text', texts)
      if(text.includes('qualification match schedule')){
        text = text.replace('qualification match schedule', '', 1)
      }
      findMatches();
      //console.log(matches)
    })
      .catch(error => console.log('error', error));
    
  }
  useEffect(() => {
    doit();
    async function doit(){
    
    await console.log(sessionStorage.getItem('matches'))
    
    var m = await JSON.parse(sessionStorage.getItem('matches'));
    
    for(let i = 0; i < 1; i++){
    var infoR1 = {}
    var infoR2 = {}
    var infoR3 = {}
    var infoB1 = {}
    var infoB2 = {}
    var infoB3 = {}
    console.log(m[i]['Qual'])
    var year = "2023"
    await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Red1'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoR1 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Red2'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoR2 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Red3'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoR3 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Blue1'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoB1 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Blue2'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoB2 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Blue3'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoB3 = data)
    m[i]['infoRed1'] = await infoR1;
    m[i]['infoRed2'] = await infoR2;
    m[i]['infoRed3'] = await infoR3;
    m[i]['infoBlue1'] = await infoB1;
    m[i]['infoBlue2'] = await infoB2;
    m[i]['infoBlue3'] = await infoB3;
    }
    //console.log(JSON.parse(sessionStorage.getItem('allInfo'))[0])
    //console.log(m[0])
    //console.log(JSON.parse(sessionStorage.getItem('allInfo'))[0] === m[0])
    if(sessionStorage.getItem('allInfo') != null && JSON.parse(sessionStorage.getItem('allInfo'))[0]['Red1'] === m[0]['Red1'] && JSON.parse(sessionStorage.getItem('allInfo'))[0]['Qual'] === m[0]['Qual'] && JSON.parse(sessionStorage.getItem('allInfo'))[0]['time'] === m[0]['time'] && JSON.parse(sessionStorage.getItem('allInfo'))[0]['Red3'] === m[0]['Red3'] && JSON.parse(sessionStorage.getItem('allInfo'))[0]['Blue1'] === m[0]['Blue1']){
      await console.log("HELLO")
      await console.log(JSON.parse(sessionStorage.getItem('allInfo')))
    await setMatches(JSON.parse(sessionStorage.getItem('allInfo')))
    await setMatchesShow(JSON.parse(sessionStorage.getItem('allInfo')))
    }
    else{
      var m = await JSON.parse(sessionStorage.getItem('matches'));
    
    for(let i = 0; i < matches.length; i++){
    var infoR1 = {}
    var infoR2 = {}
    var infoR3 = {}
    var infoB1 = {}
    var infoB2 = {}
    var infoB3 = {}
    console.log(m[i]['Qual'])
    var year = "2023"
    await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Red1'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoR1 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Red2'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoR2 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Red3'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoR3 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Blue1'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoB1 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Blue2'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoB2 = data)
      await fetch('https://api.statbotics.io/v2/team_year/' + m[i]['Blue3'] + '/' + year)
    .then((response)=>response.json())
    .then((data)=>infoB3 = data)
    m[i]['infoRed1'] = await infoR1;
    m[i]['infoRed2'] = await infoR2;
    m[i]['infoRed3'] = await infoR3;
    m[i]['infoBlue1'] = await infoB1;
    m[i]['infoBlue2'] = await infoB2;
    m[i]['infoBlue3'] = await infoB3;
    }
      await console.log(m)
    await setMatches(m)
    await setMatchesShow(m)
    await sessionStorage.setItem('allInfo', JSON.stringify(m))
    }
    
    
}}, [sessionStorage.getItem('matches')])
const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64Image(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  useEffect(()=>{
    console.log(base64Image)
  },[base64Image])


  const componentRef = useRef(null);

  

  const handleCapture = () => {
    const node = componentRef.current;

    domtoimage.toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'REMatch.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error capturing screenshot:', error);
      });
  };
  
  var c = 1;
  var none = true;
  return (
    <div>
      
      <label className="infile">
      Upload File
      <input type="file" id="mimg" onChange={handleImageChange}></input>
      </label>
      <button onClick={(e)=>{findText(base64Image)}}>Figure it out</button>
      <button onClick={(e)=>{findMatches()}}>Find Matches</button>
      <button onClick={handleCapture}>Capture Screenshot</button>
      <input type="number" placeholder="Search for a team..." id="search"></input>
      <button onClick={(e)=>{
        var temp = []
        var num = document.getElementById('search').value
         
        for(let i = 0; i < matches.length; i++){
          if(num == "" || matches[i]['Red1'] == num || matches[i]['Red2'] == num || matches[i]['Red3'] == num || matches[i]['Blue1'] == num || matches[i]['Blue2'] == num || matches[i]['Blue3'] == num){
            temp.push(JSON.parse(sessionStorage.getItem('allInfo'))[i])
          }
        }
        console.log(temp)
        setMatchesShow(temp)
      }}>Find</button>
      <br></br>
      <div ref={componentRef}>
      {base64Image && <img src={base64Image} alt="Uploaded" className="dispimg"/>}
      <br></br>
      {matchesShow?.map(({ Qual, time, Red1, Red2, Red3, Blue1, Blue2, Blue3, Status, infoBlue1, infoBlue2, infoBlue3, infoRed1, infoRed2, infoRed3 }) => (
        (Status == "200")?
          (<div key={Qual} className="card" style={{backgroundColor: (Red1 == 4828 || Red2 == 4828 || Red3 == 4828 || Blue1 == 4828 || Blue2 == 4828 || Blue3 == 4828)?("yellow"):("")}}>
            <h3 className="title">Qualification Match {Qual}: {time}</h3>
            <table style={{textAlign: "center", width: "100%"}}>
              <tr><th style={{color: "#ee4219"}}>Red Alliance</th><th style={{color: "#4219ee"}}>Blue Alliance</th></tr>
              <tr><td>{Red1}: {(infoRed1.name)?(infoRed1.name):((""))}</td><td>{Blue1}: {(infoBlue1.name)?(infoBlue1.name):((""))}</td></tr>
              <tr><td>{Red2}: {(infoRed2.name)?(infoRed2.name):((""))}</td><td>{Blue2}: {(infoBlue2.name)?(infoBlue2.name):((""))}</td></tr>
              <tr><td>{Red3}: {(infoRed3.name)?(infoRed3.name):((""))}</td><td>{Blue3}: {(infoBlue3.name)?(infoBlue3.name):((""))}</td></tr>
              <tr><td></td><td></td></tr>
              {(none)?(<tr><td><b>= {parseInt(10000*((infoRed1.epa_mean+infoRed2.epa_mean+infoRed3.epa_mean)/((infoRed1.epa_mean+infoRed2.epa_mean+infoRed3.epa_mean)+(infoBlue1.epa_mean+infoBlue2.epa_mean+infoBlue3.epa_mean))))/100}%</b></td><td><b>= {parseInt(10000*((infoBlue1.epa_mean+infoBlue2.epa_mean+infoBlue3.epa_mean)/((infoRed1.epa_mean+infoRed2.epa_mean+infoRed3.epa_mean)+(infoBlue1.epa_mean+infoBlue2.epa_mean+infoBlue3.epa_mean))))/100}%</b></td></tr>):("")}
            </table>
          </div>):
          (<p></p>)
        
      
      ))}
      </div>
    </div>
  )
}
