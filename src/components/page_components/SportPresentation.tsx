type SportPresentationProps = { title: string; description: string };

const SportPresentation = ({ title, description }: SportPresentationProps) => {
  return (
    <div className="">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default SportPresentation;
