import React from "react";

const Status = () => {
  const person = [
    {
      name: "Niki de Saint Phalle",
      artwork: {
        title: "Blue Nana",
        city: "Hamburg",
        image: "https://i.imgur.com/Sd1AgUOm.jpg",
      },
    },
  ];
  const nextArtwork = { ...person.artwork, city: "New Delhi" };
  const nextPerson = { ...person, artwork: nextArtwork };
  //   setPerson(nextPerson);
  console.log(nextPerson.name);
  return (
    <div>
      <h1>{nextPerson.artwork.title}</h1>
      <p>{nextPerson.artwork.city}</p>
    </div>
  );
};

export default Status;
