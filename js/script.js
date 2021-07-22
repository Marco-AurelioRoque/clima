document.querySelector(".busca").addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if(input !== ""){
        clearInfo()
        showWarning("Carregando...")
    } else{
        clearInfo()
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9685070b9a64703991f72b0ae6a87b43&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if(json.cod == 200){
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            tempIcon: json.weather[0].icon,
            tempDesc: json.weather[0].description,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        });
    } else{
        clearInfo()
        showWarning("Localização não encontrada...");
    };

    console.log(json)
});

function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.descricao').innerHTML = `${json.tempDesc}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.tempInfoMax').innerHTML = `<span>Max:</span> ${json.tempMax} <sup>º</sup>`
    document.querySelector('.tempInfoMin').innerHTML = `<span>Min:</span> ${json.tempMin} <sup>º</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = "block";
};

function clearInfo(){
    showWarning('')     
    document.querySelector('.resultado').style.display = "none";    
}

function showWarning(msg){
    document.querySelector(".aviso").innerHTML = msg;
};