import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

function ImgDropZone({ onFileAccepted }) {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file)); // 🖼️ Create preview URL
        onFileAccepted(file);
      }
    },
  });

  // Cleanup the preview URL after unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // 🆕 Function to remove the selected image
  const handleRemoveImage = () => {
    setPreview(null);
    onFileAccepted(null); // Clear the selected file in the parent too (if needed)
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={`border-2 h-[160px] flex items-center justify-center border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:bg-gray-100 transition w-full ${
          preview ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>

      {/* 🖼️ Image Preview with Close (X) Button */}
      {preview && (
        <div className="relative flex flex-col items-center">
          <button
            onClick={handleRemoveImage}
            className="absolute top-[20px] w-[30px] right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-md p-1 hover:bg-red-600 transition"
          >
            &times;
          </button>
          <p className="text-gray-500 text-sm mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="h-32 object-cover rounded-md shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default ImgDropZone;
