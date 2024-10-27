// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";

// const ImageUpload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const uploadImage = async () => {
//     if (!file) return alert("Please select a file to upload.");

//     try {
//       setUploading(true);

//       const { data, error } = await supabase.storage
//         .from("Craken")
//         .upload(`images/${file.name}`, file, {
//           cacheControl: "3600",
//           upsert: true,
//         });

//       if (error) throw error;

//       alert("Image uploaded successfully!");
//       console.log("Uploaded file:", data);
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Failed to upload image.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Input 
//         type="file" 
//         onChange={handleFileChange} 
//         className="w-64" 
//       />

//       <Button 
//         onClick={uploadImage} 
//         disabled={uploading || !file} 
//         className="w-64"
//       >
//         {uploading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Uploading...
//           </>
//         ) : (
//           "Upload Image"
//         )}
//       </Button>
//     </div>
//   );
// };

// export default ImageUpload;
// https://api.cloudinary.com/v1_1/dprc07xle/image/upload

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile?.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
      } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile?.type)) {
        setError("Only JPEG, PNG, and GIF images are allowed");
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const uploadImage = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Kraken'); 
      formData.append('cloud_name', 'dprc07xle');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dprc07xle/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onImageUpload(data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Input
        type="file"
        onChange={handleFileChange}
        className="w-64"
        accept="image/jpeg,image/png,image/gif"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        onClick={uploadImage}
        disabled={uploading || !file || !!error}
        className="w-64"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload Image"
        )}
      </Button>
    </div>
  );
};

export default ImageUpload;