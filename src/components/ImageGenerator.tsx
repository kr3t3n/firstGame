// import { useState } from 'react';
// import { usePrompt } from '../hooks/usePrompt';
// import { useImagePrompt } from '../hooks/useImagePrompt';
// import { useGeneratedImageUrl } from '../hooks/useGeneratedImageUrl';
// import { useError } from '../hooks/useError';
// import { useIsLoading } from '../hooks/useIsLoading';

// const ImageGenerator = () => {
//   const [prompt, setPrompt] = usePrompt();
//   const [imagePrompt, setImagePrompt] = useImagePrompt();
//   const [generatedImageUrl, setGeneratedImageUrl] = useGeneratedImageUrl();
//   const [error, setError] = useError();
//   const [isLoading, setIsLoading] = useIsLoading();

//   const generateImage = async () => {
//     setIsLoading(true);
//     setError(null);  // Clear previous errors
//     try {
//       const response = await fetch('/api/openai/image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt: imagePrompt }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setGeneratedImageUrl(data.image_url);
//     } catch (error) {
//       console.error('Error generating image:', error);
//       setError(error.message || 'Failed to generate image. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Your component code here */}
//     </div>
//   );
// };

// export default ImageGenerator;
export {};