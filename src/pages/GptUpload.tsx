import React, { useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const GptUpload: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    // Filter for text, PDF, DOCX files
    const validFiles = newFiles.filter(file => {
      const type = file.type;
      return type === 'text/plain' || 
             type === 'application/pdf' || 
             type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
             type === 'application/msword';
    });
    
    if (validFiles.length !== newFiles.length) {
      toast.error('Only text, PDF, and Word documents are supported');
    }
    
    if (validFiles.length > 0) {
      setFiles([...files, ...validFiles]);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };
  
  // Remove a file
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  // Mock upload function
  const handleUpload = () => {
    if (files.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }
    
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          toast.success('Files uploaded successfully for AI training');
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">GPT Training Data</h1>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Upload Training Documents</h2>
        <p className="text-gray-600 mb-6">
          Upload documents to train the AI on farm-specific knowledge. Supported formats: PDF, DOCX, TXT.
          These documents will be used to improve the chatbot's responses to farmer queries.
        </p>
        
        {/* Upload area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragging ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-300'
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop files here</h3>
          <p className="mt-1 text-xs text-gray-500">or</p>
          
          <div className="mt-2">
            <label htmlFor="file-upload" className="btn btn-primary cursor-pointer">
              <span>Select Files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc,.txt"
              />
            </label>
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            PDF, DOCX, TXT up to 10MB each
          </p>
        </div>
        
        {/* File list */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files</h3>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <File className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900 truncate" title={file.name}>
                      {file.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-error-500 hover:text-error-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Upload progress */}
            {uploadStatus === 'uploading' && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Upload status */}
            {uploadStatus === 'success' && (
              <div className="mt-4 p-3 bg-success-50 text-success-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>All files uploaded successfully! The AI is being trained with your data.</span>
              </div>
            )}
            
            {uploadStatus === 'error' && (
              <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>There was an error uploading your files. Please try again.</span>
              </div>
            )}
            
            {/* Upload button */}
            {uploadStatus !== 'uploading' && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleUpload}
                  className="btn btn-primary"
                  disabled={files.length === 0 || uploadStatus === 'success'}
                >
                  {uploadStatus === 'success' ? 'Uploaded Successfully' : 'Upload Files for Training'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Instructions card */}
      <div className="card bg-primary-50 border border-primary-100">
        <h2 className="text-lg font-bold text-primary-800 mb-4">How GPT Training Works</h2>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3">
              1
            </div>
            <div>
              <h3 className="font-medium text-primary-800">Upload Documents</h3>
              <p className="text-primary-700 mt-1">
                Upload farming guides, crop information, fertilizer manuals, or any other relevant agricultural content.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3">
              2
            </div>
            <div>
              <h3 className="font-medium text-primary-800">AI Processing</h3>
              <p className="text-primary-700 mt-1">
                Our system extracts knowledge from your documents and incorporates it into the AI model.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3">
              3
            </div>
            <div>
              <h3 className="font-medium text-primary-800">Improved Responses</h3>
              <p className="text-primary-700 mt-1">
                The chatbot will now provide more accurate, context-specific responses based on your uploaded content.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mr-3">
              4
            </div>
            <div>
              <h3 className="font-medium text-primary-800">Continuous Learning</h3>
              <p className="text-primary-700 mt-1">
                Add more documents over time to keep expanding the chatbot's knowledge base.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptUpload;