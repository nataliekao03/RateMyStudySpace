import ProtectedRoute from "@/components/ProtectedRoute";
import Form from "next/form";

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <h1 className="text-4xl font-bold text-center mt-10">
          Review & Rating
        </h1>

        {/* Star Rating (mandatory)*/}
        <h2 className="text-2xl font-bold mt-10">
          How would you rate this Space?
        </h2>

        {/* <Rating onClick={(rating) => console.log(rating)}/>  */}

        {/* Select tags - What do u like about it */}
        <h2 className="text-2xl font-bold mt-10">What do you like about it?</h2>
        <button
          type="submit"
          className="border border-gray-300 px-4 py-2 rounded"
        >
          Wifi
        </button>
        <button
          type="submit"
          className="border border-gray-300 px-4 py-2 rounded"
        >
          Outlets
        </button>
        <button
          type="submit"
          className="border border-gray-300 px-4 py-2 rounded"
        >
          Clean
        </button>

        <Form>
          {/* Add photos (optional, max 5 photos) */}
          <h2 className="text-2xl font-bold  mt-10">Upload Photos</h2>
          <input type="file" accept="image/*" multiple className="mb-4" />

          {/* Comments about Study space */}
          <h2 className="text-2xl font-bold mt-10">Write a Review</h2>
          <input
            name="review"
            type="text"
            placeholder="Write your review here..."
            required
            className="border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-4 px-8 rounded"
          ></button>
        </Form>

        {/* Submit button */}
      </ProtectedRoute>
    </div>
  );
}
