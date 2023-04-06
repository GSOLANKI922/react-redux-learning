import React, { useState } from "react";

const Status = () => {
  const [person, setPerson] = useState({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });
  const nextArtwork = { ...person.artwork, city: "New Delhi" };
  const nextPerson = { ...person, artwork: nextArtwork };
//   setPerson(nextPerson);
  return <div>Hello</div>;
};

export default Status;


