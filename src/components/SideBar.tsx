import React from "react";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
const SideBar = () => {
  const dataNewsPost = [
    {
      title: "CÁCH LÀM MẮM HÀNH TÍM NGON NUỐT NƯỚC MIẾNG,CHẤM GÌ CŨNG NGON",
      image:
        "https://i2.wp.com/www.esheepkitchen.com/wp-content/uploads/2020/07/48078613347_20c9067327_k.jpg?resize=263%2C175&ssl=1",
      time: "April 15, 2020",
    },
    {
      title: "CÁCH LÀM CƠM RANG TÔM DỨA THÁI LAN CỰC NGON",
      image:
        "https://i2.wp.com/www.esheepkitchen.com/wp-content/uploads/2022/04/278150166_534874328008241_34805377185892222_n.jpg?resize=263%2C175&ssl=1",
      time: "April 12, 2022",
    },
    {
      title:
        "GIẢI MÃ CÁCH LÀM TRỨNG “OSMANTHUS” (TRỨNG 3 KHÔNG DÍNH) MÀ VUA CÀN LONG CỰC YÊU THÍCH",
      image:
        "https://i2.wp.com/www.esheepkitchen.com/wp-content/uploads/2020/07/48078613347_20c9067327_k.jpg?resize=263%2C175&ssl=1",
      time: "October 29, 2022",
    },
  ];
  const dataVideos = [
    "https://www.youtube.com/embed/S6ECBp-YlFw",
    "https://www.youtube.com/embed/Gxv8LfNDex8",
    "https://www.youtube.com/embed/Gxv8LfNDex8",
  ];
  return (
    <>
      <div className="author">
        <h4 className="widget-title">
          <span className="inner-arrow">AUTHOR</span>
        </h4>
        <div className="author-info">
          <img
            className="author-info-img"
            src="https://www.esheepkitchen.com/wp-content/uploads/2018/04/about-me.jpg"
            alt=""
          />
          <p>
            Căn Bếp nhà Esheep. Góc nhỏ mày mò chia sẻ công thức nấu ăn, làm
            bánh, review đồ bếp. Chia sẻ tình yêu gia đình, bếp, vườn, chụp ảnh,
            du lịch...
          </p>
        </div>
      </div>
      <div className="contact">
        <h4 className="widget-title">
          <span className="inner-arrow">Liên hệ với chúng tôi</span>
        </h4>
        <div className="contact-list">
          <ul className="flex">
            <li className="contact-icon">
              <a href="#">
                <span>FB</span>
                <IoLogoFacebook color="black" size={"2rem"} />
              </a>
            </li>
            <li className="contact-icon">
              <a href="#">
                <span>Instagram</span>
                <IoLogoInstagram color="black" size={"2rem"} />
              </a>
            </li>
            <li className="contact-icon">
              <a href="#">
                <span>gmail</span>
                <BiLogoGmail color="black" size={"2rem"} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="news-post">
        <h4 className="widget-title">
          <span className="inner-arrow">Bài đăng nổi bật</span>
        </h4>
        <div className="news-post-list">
          {dataNewsPost.map((item, index) => {
            return (
              <div key={index} className="flex news-post-list-item">
                <div className="news-post-list-item-title">
                  <h4>
                    <a href="#">{item.title}</a>
                  </h4>
                  <p>{item.time}</p>
                </div>
                <div className="flex news-post-list-item-img">
                  <a href="#">
                    <img src={item.image} alt="" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="news-videos">
        <h4 className="widget-title">
          <span className="inner-arrow">Video mới nhất</span>
        </h4>
        <div className="list-videos">
          {dataVideos.map((video, index) => {
            return (
              <div key={index * Math.random()} className="video-item">
                <iframe
                  width="340"
                  height="191"
                  src={video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
