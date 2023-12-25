import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import MyPostCard from "../../components/post/MyPostCard";
import { useAuth } from "../../context/Auth";
import { firestore } from "../../firebase";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { currentUser } = useAuth();

  const fetchMyPosts = useCallback(async () => {
    try {
      const q = query(
        collection(firestore, "posts"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      posts.sort((a, b) => b.timestamp - a.timestamp);
      setMyPosts(posts);
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  }, [currentUser.uid]);

  const deletePost = async (id) => {
    await deleteDoc(doc(firestore, "posts", id))
      .then(() => {
        const updatedPost = myPosts.filter((item) => item.id !== id);
        setMyPosts(updatedPost);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  return (
    <section className="py-4">
      <Container>
        <h4>My Posts</h4>
        <Stack gap={2}>
          {myPosts.map((item) => {
            return (
              <MyPostCard key={item.id} item={item} deletePost={deletePost} />
            );
          })}
        </Stack>
      </Container>
    </section>
  );
};
export default MyPosts;
