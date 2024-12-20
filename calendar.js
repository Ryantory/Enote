let nav = 0;
let clicked = null;
let events= localStorage.getItem('events')? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

const admin = false;
function openModal(date){
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    // determine which modal to show. if event exists show delete option; otherwise show add option
    if (eventForDay){
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }else{
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}   
function load(){
    const dt = new Date();

    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    
    const firstDayOfMonth = new Date(year, month,1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    console.log(daysInMonth);

    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday:'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',    
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    
    // current month on top left corner
    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us',{ month: 'long' })} ${year}`;
    
    calendar.innerHTML = '';// clean up html before reload
        for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        
        const dayString = `${month+1}/${i-paddingDays}/${year}`;
        
        if(i > paddingDays){
            daySquare.innerText = i- paddingDays;
            daySquare.style.color = "black";          // Set the text color
            daySquare.style.fontSize = "50px";       // Set the font size
            daySquare.style.fontWeight = "bold";     // Set the font weight
            daySquare.style.border= "1px solid black"; /* Black border */ 
            // daySquare.style.backgroundColor = "#f0f0f0"; // Set the background color
            
            const eventForDay = events.find(e => e.date === dayString );
            
            if( i - paddingDays === day && nav === 0){
                daySquare.id = 'currentDay';
            }
            // creat div and put it into day square (modify to fetch cloud data)
            if(eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            // manual input
            if(admin)
            {
                daySquare.addEventListener('click', () => openModal(dayString));
            }
            else{
                daySquare.addEventListener('click', () => {
                window.location.href = 'OnClick.html';
            });
            }
        } else{
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }


}

function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');
        
        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else{
        eventTitleInput.claassList.add('error');
    }
}

function deleteEvent(){
    // remove/filter out the event that date is equal to clicked date
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}
function initButtons(){
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}


  
initButtons();
load();