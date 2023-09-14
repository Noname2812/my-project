import { Col, Row } from "antd";
import {
  AiFillHome,
  AiFillPhone,
  AiFillInstagram,
  AiFillYoutube,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Row>
          <Col span={8}>
            <h4>ESHEEP KITCHEN</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              maiores nostrum est voluptatum iure autem dolores eum quisquam
              natus repellendus officia culpa nam, velit, et possimus cupiditate
              blanditiis odit dolore!
            </p>
          </Col>
          <Col span={4}>
            <h4>PRODUCTS</h4>
            <ul>
              <li>
                <a href="#">Popular Recipe</a>
              </li>
              <li>
                <a href="#">Decilous Recipe</a>
              </li>
              <li>
                <a href="#">Hight Rates Recipe</a>
              </li>
              <li>
                <a href="#">Booking</a>
              </li>
            </ul>
          </Col>
          <Col span={4}>
            <h4>USERFULL LINKS</h4>
            <ul>
              <li>
                <a href="#">Your Account</a>
              </li>
              <li>
                <a href="#">Become an Affillate</a>
              </li>
              <li>
                <a href="#">Shipping Rates</a>
              </li>
              <li>
                <a href="#">Helps</a>
              </li>
            </ul>
          </Col>
          <Col span={8}>
            <h4>CONTACT</h4>
            <ul>
              <li>
                <a href="#">
                  <AiFillHome />
                  <span>180 Cao Lo, P4, Q8, TP.HCM</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <IoMdMail />
                  <span>vietthang11012002@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillPhone />
                  <span>+84 66137207</span>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <span className="line"></span>
      <div className="container">
        <Row align={"middle"}>
          <Col span={12}>
            <p>
              @2018 - Esheep Kitchen. All Right Reserved. Designed and Developed
              by Suu Buu
            </p>
          </Col>
          <Col span={12}>
            <ul className="flex list-social">
              <li>
                <a href="#">
                  <AiFillYoutube />
                  <span>Youtube</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillFacebook />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillTwitterSquare />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillInstagram />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
