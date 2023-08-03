import React from 'react';

import { useQuery, } from '@apollo/client';
import { Container, } from 'react-bootstrap';


// This imports the two queries in use on the page.
import { QUERY_ALL_STATS } from '../utils/queries';

// Auth function uses the token to identify the "me" user.
function Leaderboard() {
  const { loading, error, data } = useQuery(QUERY_ALL_STATS, {
    fetchPolicy: "no-cache"
  });
  const statList = data?.allStats || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const sortedStatList = data.allStats.sort(
    (a, b) => (b.strength + b.agility + b.stamina) - (a.strength + a.agility + a.stamina)
  );


  const topUsers = sortedStatList.slice(0, 10);
  return (
    <Container>
      <h1 className="logofitquest">Leaderboard</h1>
      <div clasName="">
        {topUsers.map((statList) => (
          <div key={statList.id} className="row pt-3 pb-3 rpgui-container framed-golden">
            <div className="user-name">{statList.user_id.username}</div>
            <div className="stat-list col text-info text-center rpgui-container framed-golden">Strength: {statList.strength}</div>
            <div className="stat-list col text-info text-center rpgui-container framed-golden">Agility: {statList.agility}</div>
            <div className="stat-list col text-info text-center rpgui-container framed-golden">Stamina: {statList.stamina}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}


export default Leaderboard;