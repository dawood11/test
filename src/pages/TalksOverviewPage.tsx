import TalkList from "../components/talks/TalkList";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import AddTalk from "../components/talks/AddTalks";
import { useAuth } from "../context/AuthContext";

const TalksOverviewPage = () => {
  const { isAuthenticated } = useAuth();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { isLoading } = context;

  return (
    <>
      <h1>Talks</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <TalkList />
          {isAuthenticated && <AddTalk />}
        </div>
      )}
    </>
  );
};

export default TalksOverviewPage;
