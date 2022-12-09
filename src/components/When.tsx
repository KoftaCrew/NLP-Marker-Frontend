interface WhenProps {
  isTrue: boolean;
  children: React.ReactNode;
}

const When = ({ isTrue, children }: WhenProps) => {
  return isTrue ? <>{ children }</> : null;
};

export default When;
