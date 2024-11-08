import { useNavigate } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { deletePost, fetchBlogById } from "@/api/api";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const userId = useSelector((state) => state.auth?.user?.id ?? "guest");
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogDetails = async () => {
      const data = await fetchBlogById(id);
      setBlog(data.data);
    };
    getBlogDetails();
  }, [id]);

  const { title, image, content, createdAt, user } = blog;

  const date = createdAt
    ? moment(createdAt).format("DD MMM, YYYY")
    : "Loading...";

  // Navigate to edit page
  const handleEdit = () => {
    navigate(`/edit/${id}`, { state: { blog } });
  };

  // Handle Delete Post
  const handleDelete = async () => {
    try {
      await deletePost(id); // Call the delete API
      navigate("/"); // Navigate back to home after deletion
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  return (
    <div className="mt-16 p-8 h-full bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title || "Loading..."}</h1>

        {user && user._id === userId && (
          <div className="flex gap-4">
            {/* Edit Button */}
            <MdEdit
              size={25}
              className="text-yellow-500 text-lg cursor-pointer hover:scale-150"
              onClick={handleEdit} // Navigate to the edit page
            />

            {/* Delete Button */}
            <MdDeleteForever
              size={25}
              className="text-red-500 text-lg cursor-pointer hover:scale-150"
              onClick={() => {
                console.log("Delete button clicked");
                setShowModal(true);
                console.log("showModal after click:", showModal);
              }}
            />
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-blue-600 mb-8">{date}</h3>

      {image && (
        <img
          src={image}
          className="h-2/5 w-full rounded-md object-cover mb-8"
          alt="Blog cover"
        />
      )}

      <p
        dangerouslySetInnerHTML={{ __html: content || "Loading content..." }}
      />

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex gap-12">
              <button
                onClick={handleDelete} // Call delete function if "Yes"
                className="bg-red-600 w-1/2 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)} // Close modal if "No"
                className="bg-gray-300 text-black px-4 py-2 w-1/2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
