function Message({ comment, user }) {
    const { type, message, url} = comment;
  
    switch (type) {
      case 'text':
        return (
          <div className={`chat-message ${comment.sender === user.id ? 'sent' : 'received'}`}>
            <p>{message}</p>
          </div>
        );
      
      case 'image':
        return (
          <div className={`chat-message media-message ${comment.sender === user.id ? 'sent' : 'received'}`}>
            <img src={url} alt={message} className="message-image" />
            {message && <p>{message}</p>}
          </div>
        );
  
      case 'video':
        return (
          <div className={`chat-message media-message${comment.sender === user.id ? 'sent' : 'received'}`}>
            <video controls poster={comment.thumbnail} className="message-video">
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {message && <p>{message}</p>}
          </div>
        );
  
      case 'pdf':
        return (
          <div className={`chat-message media-message ${comment.sender === user.id ? 'sent' : 'received'}`}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="message-pdf">
                <img src='icons/download-pdf.png' alt={message} />
            </a>
          </div>
        );
  
      default:
        return null;
    }
  }
  
  export default Message;