/**
 * Functional component representing an article card.
 *
 * This component renders an article card with an image, title, and description.
 *
 * @returns JSX.Element
 */
const Article = () => {
  return (
    <div className="article w-72 h-72 mx-4 overflow-hidden shadow-lg rounded-lg border-gray-400 flex flex-col">
      <div className="relative">
        <div className="h-[20%] overflow-hidden">
          <img
            src="https://i.ibb.co/W5Ww9nD/ceremonie-paris-2024.jpg"
            alt="image"
            aria-label="img-article"
            className=""
          />
        </div>
        <div className="p-2 bg-white">
          <h3 className="text-2xl my-2">Lorem ipsum</h3>

          <p className="text-md h-auto w-fit">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            eveniet voluptatibus temporibus excepturi est perspiciatis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
