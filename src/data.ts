import AvatarPic from "@/../public/img/nick.jpg";
import SamplePostImg from "@/../public/img/sample.jpg";

/**
 * A simple and reusable object with user profile type information
 */
export const STATIC_USER = {
  name: "Nick Frostbutter",
  username: "nickfrosty",
  image: AvatarPic,
  bio: "Nick is a self taught developer and submariner. He spends his free time writing docs and technical articles, as well as building side projects. He strives to one day make a living online from those projects.",
};

/**
 * A simple and reusable object of a post
 */
export const STATIC_POST = {
  href: "/nickfrosty/example-post-slug",
  slug: "example-post-slug",
  title: "An example of a post title",
  description:
    "This example post is useful to be able to display the standard information associated with a single post. Especially when creating the UI.",
  date: new Date().toDateString(),
  image: SamplePostImg,
  author: STATIC_USER,
};
