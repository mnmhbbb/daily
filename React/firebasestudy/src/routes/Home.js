import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onAddImg = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearimg = () => setAttachment(null);

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <input type="file" accept="image/*" onChange={onAddImg} />
        <button>등록</button>
        {/* 이미지미리보기 */}
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearimg}>취소</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((v) => (
          <Tweet
            key={v.id}
            tweetObj={v}
            isOwner={v.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
