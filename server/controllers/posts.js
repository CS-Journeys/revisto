export const getPosts = (req, res) => {
  res.status(200).json([
    {
      id: 1234,
      title: "My bf cheated on my gf",
      text: "It's been rough"
    },
    {
      id: 3874,
      title: "My phone doesn't work",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
      id: 9876,
      title: "Kadin did 9/11",
      text: "I will not elaborate"
    }
  ]);
}

export const getPost = (req, res) => {
  res.send(`TODO: get post ${req.params.id}`);
}

export const createPost = (req, res) => {
  res.send('TODO: create post');
}