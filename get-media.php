<?php
$directory = 'photos'; // Update with your actual directory path

// Function to retrieve the list of photos and videos from the directory
function getMediaFromDirectory($directory) {
  $media = [];
  if (is_dir($directory)) {
    $files = scandir($directory);
    foreach ($files as $file) {
      $path = $directory . '/' . $file;
      if (is_file($path) && isMedia($file)) {
        $mediaType = pathinfo($file, PATHINFO_EXTENSION);
        $media[] = [
          'name' => $file,
          'url' => $path,
          'type' => $mediaType
        ];
      }
    }
  }
  return $media;
}

// Function to check if a file has a media extension
function isMedia($file) {
  $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'];
  $extension = pathinfo($file, PATHINFO_EXTENSION);
  return in_array($extension, $allowedExtensions);
}

// Retrieve the media (photos and videos) from the directory
$media = getMediaFromDirectory($directory);

// Return the media as JSON
header('Content-Type: application/json');
echo json_encode($media);
?>
