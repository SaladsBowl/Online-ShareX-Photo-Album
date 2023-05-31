window.addEventListener('DOMContentLoaded', () => {
  const mediaContainer = document.getElementById('media');
  const directory = 'photos'; // Update with your actual directory path
  fetchMediaFromDirectory(directory)
    .then(media => {
      media.forEach(item => {
        const mediaElement = createMediaElement(item);
        mediaContainer.appendChild(mediaElement);
      });
    })
    .catch(error => console.error(error));

  function fetchMediaFromDirectory(directory) {
    return fetch(`get-media.php?directory=${directory}`)
      .then(response => response.json());
  }

  function createMediaElement(item) {
    const mediaElement = document.createElement('div');
    mediaElement.classList.add('media');

    const imageElement = document.createElement('img');
    imageElement.src = item.url;
    imageElement.alt = item.name;
    mediaElement.appendChild(imageElement);

    const mediaActions = document.createElement('div');
    mediaActions.classList.add('media-actions');

    const shareButton = document.createElement('button');
    shareButton.innerHTML = '<i class="fas fa-share-square"></i>';
    shareButton.addEventListener('click', () => {
      copyToClipboard(item.url);
      showPopup('Link copied to clipboard!');
    });
    mediaActions.appendChild(shareButton);

    const downloadButton = document.createElement('button');
    downloadButton.innerHTML = '<i class="fas fa-download"></i>';
    downloadButton.addEventListener('click', () => {
      downloadFile(item.url, item.name);
    });
    mediaActions.appendChild(downloadButton);

    mediaElement.appendChild(mediaActions);

    return mediaElement;
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  function showPopup(message) {
    const popupElement = document.createElement('div');
    popupElement.classList.add('popup');
    popupElement.textContent = message;
    document.body.appendChild(popupElement);

    setTimeout(() => {
      popupElement.classList.add('show');
    }, 10);

    setTimeout(() => {
      popupElement.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(popupElement);
      }, 300);
    }, 2000);
  }

    function downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    showPopup('File download started!');
  }
  
});
