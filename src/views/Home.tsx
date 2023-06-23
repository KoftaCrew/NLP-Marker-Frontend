import InsightsViewer from "../components/InsightsViewer/InsightsViewer";

const Home = () => {
  return (
    <>
      <InsightsViewer
        studTokens={["first lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "text"]} modelTokens={["second lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "text"]} //static data fix by impelementing service
        adjModel={[[0, 1]]} adjStud={[[0], [0]]}
      ></InsightsViewer>
    </>
  );
};

export default Home;
