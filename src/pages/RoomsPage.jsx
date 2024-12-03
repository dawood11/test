import { useState } from "react";
import RoomOverview from "../components/RoomOverview";

function RoomsPage() {
  const [isLoggedIn] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      {isLoggedIn ? (
        <>
          <RoomOverview isLoggedIn={isLoggedIn} />
        </>
      ) : (
        <p>Du må være logget inn for å få tilgang til denne siden.</p>
      )}
    </div>
  );
}

export default RoomsPage;
