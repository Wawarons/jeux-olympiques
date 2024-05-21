type Props = {
  errors: string[];
};

/**
 * Renders a list of error messages in a styled component.
 *
 * @param errors - An array of error messages to be displayed.
 * @returns JSX element containing the list of error messages, or an empty fragment if there are no errors.
 */
const Errors = ({ errors }: Props) => {
  return (
    <>
      {errors.length ? (
        <ul className="p-2 bg-red-50 rounded-md font-bold text-md text-red-500 space-y-2">
          {errors.map((error, index) => {
            return (
              <li
                key={`${error}_${index}`}
                className="error first-letter:uppercase"
              >
                {error}
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default Errors;
