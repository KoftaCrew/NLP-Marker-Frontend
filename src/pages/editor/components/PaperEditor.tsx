import PaperPage from "./PaperPage";

const PaperEditor = () => {
  return (
    <div className='flex flex-col items-center bg-gray-200 h-full overflow-y-auto'>
      <div>
        <PaperPage />
      </div>
    </div>
  );
};

export default PaperEditor;
