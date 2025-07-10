import React from 'react';
import ProfileCard from '../components/Dashboard/ProfileCard';
import TeamCard from '../components/Dashboard/TeamCard';
import EventCard from '../components/Dashboard/EventCard';
import ScoreCard from '../components/Dashboard/ScoreCard';

const Dashboard = () => {

    const user = {
    name: 'Rajan Singh',
    contact: '9876543210',
    college: 'MMMUT GKP',
    email: 'abcd@gmail.com',
    gradYear: '2028',
  };

   const members = ["Member 1", "Member 2", "Member 3", "Member 4"];

    const events = [
        { name: "ORIENTATION", date: "01/01/2025", status: "Completed" },
        { name: "GAME OF CODES", date: "10/07/2025", status: "Ongoing" },
    ];

    return (
        <div>
            <ProfileCard user={user}/>
            <TeamCard members={members}/>
            <EventCard events={events} />
            <ScoreCard />
        </div>
    );
};

export default Dashboard;
