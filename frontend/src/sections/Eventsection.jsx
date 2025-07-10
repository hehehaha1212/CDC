import React , {useState} from 'react';
import EventDetails from '../components/EventDetails';
import eventData from '../data/event';
import EventWheel from '../components/EventWheel';
import '../styles/Event.css';

const Eventsection = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    return(
    <>
                <div className="main-container">
                    <EventWheel
                        events={eventData}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    />
                    <EventDetails event={eventData[currentIndex]} />
                </div>
    </>
    )
}
export default Eventsection;