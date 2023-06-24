import InsightsViewer from "../components/InsightsViewer/InsightsViewer";

const Home = () => {
  return (
    <>
      <InsightsViewer
        studTokens={["first lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "tany modal"]}
        modelTokens={["second lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum", "awel modal"]} //static data fix by impelementing service
        adj={[[0], [0]]}
      ></InsightsViewer>
    </>
  );
};

export default Home;
