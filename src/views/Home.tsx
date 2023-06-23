import InsightsViewer from "../components/InsightsViewer/InsightsViewer";

const Home = () => {
  return(
    <>
      <div> this is a simple react page</div>
      <InsightsViewer
        studTokens={["first", "text"]} modelTokens={["second", "text"]}
        adjModel={[[0, 1]]} adjStud={[[0], [0]]}></InsightsViewer>
    </>
  );
};

export default Home;
