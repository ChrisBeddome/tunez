import styles from "./SearchBar.module.scss";
import reactStringReplace from "react-string-replace";
import Image from "next/image";

const bands = [
  "Against Me!",
  "Alkaline Trio",
  "All American Rejects",
  "Attack in Black",
  "August Burns Red",
  "Beach Boys",
  "The Beatles",
  "Black Sabbath",
  "Blink 182",
  "Boxcar Racer",
  "Brand New",
  "Brenden Kelly and The Wandering Birds",
  "Buddy Holly",
  "Callahan",
  "Circa Survive",
  "Comeback Kid",
  "Credence Clearwater Revival",
  "Daniel Romano",
  "Dillinger Escape Plan",
  "Dinosaur Jr",
  "The Holly Springs Disaster",
  "Fucked Up",
  "Woody Guthrie",
  "Ladyhawk",
  "Matt Costa",
  "Justin Sane",
  "Right Away, Great Captain",
  "Said the Whale",
  "Thirty Seconds to Mars",
  "Death Cab for Cutie",
  "Brendan Kelly",
  "The Lawrence Arms",
  "Gob",
  "The Reason",
  "Make War",
  "Union Duke",
  "Bad Books",
  "The Strokes",
  "Dave Monks",
  "Every Time I Die",
  "Sum 41",
  "Tigers Jaw",
  "Citizen",
  "Jean-Paul De Roover",
  "Social Distortion",
  "The Lumineers",
  "The Avett Brothers",
  "Motion City Soundtrack",
  "Descendents",
  "Modern Baseball",
  "Streetlight Manifesto",
  "Ramones",
  "Shakey Graves",
  "Woodlock",
  "Sharks",
  "Less Than Jake",
  "The Network",
  "Taking Back Sunday",
  "Title Fight",
  "Grey Kingdom",
  "Set Your Goals",
  "Sunday Night Cruise",
  "Neck Deep",
  "Japandroids",
  "Daniel, Fred and Julie",
  "Heavens",
  "The Honest Heart Collective",
  "Jesse Stewart",
  "Anti-Flag",
  "The Monkees",
  "Good Old War",
  "Sam Russo",
  "Weatherbox",
  'Clarence "Frogman" Henry',
  "Ancient Shapes",
  "Say Anything",
  "Arkells",
  "Travis",
  "Coldplay",
  "Radiohead",
  "Half Moon Run",
  "Pavement",
  "Leftover Crack",
  "Relient K",
  "The Bouncing Souls",
  "Dear Solace",
  "Fake Problems",
  "Toyko Police Club",
];

import { useState, useEffect } from "react";

export default function SearchBar() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(performSearch, [query]);

  function performSearch() {
    if (!query || query.length < 1) {
      setResults([]);
      return;
    }
    const res = bands
      .filter((band) => band.toLowerCase().includes(query.toLowerCase()))
      .sort(
        (a, b) =>
          a.toLowerCase().indexOf(query.toLowerCase()) -
          b.toLowerCase().indexOf(query.toLowerCase())
      )
      .filter((band, i) => i < 15);

    setResults(res);
  }

  const handleInputChange = (val) => {
    setQuery(val);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles["input-container"]}>
        <icon className="material-symbols-outlined">search</icon>
        <input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="search products..."
          type="text"
        />
      </div>
      <ul className={styles.results}>
        {results.map((result) => (
          <li key={result}>
            <div className={styles["result-icon"]}>
              <Image
                src="/icons/categories/acoustic-guitars.svg"
                width={35}
                height={35}
              />
            </div>
            <div className={styles["result-text"]}>
              {reactStringReplace(
                result,
                new RegExp(`(${query})`, "gi"),
                (match) => {
                  return (
                    <span className={styles["highlight-text"]}>{match}</span>
                  );
                }
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
