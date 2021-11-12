var today, currentTime, alarms;

// array for storing alarms
alarms = [];

var setAlarm = document.querySelector('.setAlarm');

var audio = new Audio('http://www.cooperfulleon.com/sites/cooperfulleon.com/files/sounder_tones/standard/cooper_fulleon_sounder_tone_2.wav');
// function for ringing the alarm
function ringAlarm() {
    audio.play();
    // alert('Alarm is Ringing!!!!!!');
    console.log('Alarm is Ringing !!!!!!');
}


// event to pause the alarm audio
var stopbtn = document.getElementById('stop-alarm');
stopbtn.addEventListener('click', () => {
    audio.pause();
    console.log('playing audio stopped');
});


// update the time each second
var update = setInterval(function() {
    today = new Date();
    currentTime = format(today.getHours()) + ':' + format(today.getMinutes()) + ':' + format(today.getSeconds());
    document.querySelector('#timebox').innerHTML = currentTime;
    if(alarms.includes(currentTime)) {
        //alert to show in the browser
        // alert('Alarm is Ringing!!!!!!');
        ringAlarm();
    }

}, 1000);


function format(mytime) {
    if(mytime < 10) {
        mytime %= 10;
        return '0'+mytime;
    }
    else return mytime;
}

// event to add Alarm after submission of form
setAlarm.addEventListener('submit', (event) => {
    // if the form data is invalid, it will prevent form submitting
    event.preventDefault();

    // retrieving data from the form
    let newHour = format(setAlarm.hours.value);
    let newMin = format(setAlarm.minutes.value);
    let newSec = format(setAlarm.seconds.value);

    const newAlarm = `${newHour}:${newMin}:${newSec}`;
    // const newAlarm = newHour + ':' + newMin + ':' + newSec;
    if(!alarms.includes(newAlarm)) {
        alarms.push(newAlarm);
        console.log(alarms);
        showAlarm(newAlarm);
        setAlarm.reset();
    } else {
        alert('The current new Alarm has already been setup');
    }
            
});

// display newAlarm
const alarmsList = document.getElementById('alarms-list');
function showAlarm(newAlarm) {
    const html =`<li> ${newAlarm} 
                    <button class="btn btn-danger" id="dlt-button" value='${newAlarm}' onclick= 'remove(this.value)'>Delete Alarm</button>
                </li>`;
    alarmsList.innerHTML += html;
}


// delete the selected alarm from the page 
alarmsList.addEventListener('click', (event) => {
    event.target.parentElement.remove();
});

// also need to delete the alarm from the array
function remove(value) {
    alarms.filter((time) => {
        return value != time;
    });
    console.log('successfully removed from the array');
    console.log(alarms);
}



 
