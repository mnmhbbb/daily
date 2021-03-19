import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner, attachmentURL }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, SetNewTweet] = useState(tweetObj.text);

  const toggleEdit = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    SetNewTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const deleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentURL).delete();
    }
  };

  return (
    <>
      {editing ? (
        <>
          <form>
            <input type="text" required value={newTweet} onChange={onChange} />
          </form>
          <button onClick={onSubmit}>수정</button>
          <button onClick={toggleEdit}>취소</button>
        </>
      ) : (
        <>
          <div>
            <h4>{tweetObj.text}</h4>
            {tweetObj.attachmentURL && (
              <img src={tweetObj.attachmentURL} width="50px" height="50px" />
            )}
            {isOwner && (
              <>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={deleteClick}>Delete</button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Tweet;
