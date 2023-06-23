import InsightsViewer from "../components/InsightsViewer/InsightsViewer";

const Home = () => {
  return(
    <>
      <div> this is a simple react page</div>
      <InsightsViewer studTokens={["first", "text"]} modelTokens={["second", "text"]}></InsightsViewer>
    </>
  );
};

export default Home;
