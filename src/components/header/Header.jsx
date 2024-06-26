import "./header.css";

export default function Header() {
  return (
    <div className="header">
      {/* <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div> */}
      <div className="headerImgContainer">
        <img
          src="https://images.unsplash.com/photo-1445445202798-d2d86bd125df?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="headerImg"
        />
      </div>
      <div className="headerText">
        SocialBlog is a generic blog that covers a wide range of topics,
        including but not limited to lifestyle, technology, health, and
        entertainment. Our goal is to provide informative and engaging content
        to our readers, catering to a diverse audience with varying interests.
      </div>
    </div>
  );
}
