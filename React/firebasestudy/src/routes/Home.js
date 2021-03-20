import Tweet from "components/Tweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <TweetFactory userObj={userObj} />
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
