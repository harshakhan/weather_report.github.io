window.addEventListener('load',()=>{
    let long;
    let lat;

    let temperatureDegree=document.querySelector(".temperature-degree");
    let temperatureDescription=document.querySelector(".temperature-description");
    let locationTimezone=document.querySelector(".location-timezone");
    let degreeSection=document.querySelector(".degree-section");
    let degreeSpan=document.querySelector(".degree-section span");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(positon=>{
            long=positon.coords.longitude;
            lat=positon.coords.latitude;
            const proxy=`https://cors-anywhere.herokuapp.com/`;
            const api=`${proxy}https://api.darksky.net/forecast/d51abbe205d2db838e416a91518e3ae3/${lat},${long}`;
            fetch(api)
                .then(response=>{
                    return response.json();
                })
                .then(data=>{
                   // console.log(data);
                    const {temperature , summary,icon } =data.currently;
                    temperatureDegree.textContent=temperature;
                    temperatureDescription.textContent=summary+"\n"+data.daily.summary;
                    locationTimezone.textContent=data.timezone;
                    //SET ICONS
                    setIcons(icon,document.querySelector(".icons"));

                    degreeSection.addEventListener('click',()=>{
                        if(degreeSpan.textContent==="F")
                        {
                            degreeSpan.textContent="C";
                            temperatureDegree.textContent=Math.floor((temperature-32)*(5/9));
                        }
                        else{
                            degreeSpan.textContent="F";
                            temperatureDegree.textContent=temperature;
                        }
                    });
                });
        });
    }
   function setIcons(icon,iconID)
    {
        const skycons=new Skycons({color:"white"});
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
    
});
