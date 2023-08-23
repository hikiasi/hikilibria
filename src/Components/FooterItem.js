import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as TelegramSVG } from "../img/telegram.svg";

const FooterItem = () => {
  return (
    <Footer>
      <div className="footerLeft">
        <div className="footerLeftTop">
          <HomeLink to={`/`}>Hikilibria</HomeLink>
          <p>© Copyright Hikilibria 2023</p>
          <DevelopedByLink to={`https://github.com/hikiasi`} target="_blank">
            Developed by: Hikiasi
          </DevelopedByLink>
        </div>
        <div className="footerLeftBottom">
          <TelegramLink
            to={`https://t.me/hikiasi`}
            target="_blank"
            rel="noreferrer"
          >
            <TelegramSVG />
          </TelegramLink>
        </div>
      </div>
      <div className="footerRight">
        <h3>Права</h3>
        <p>
          Весь материал на сайте представлен исключительно для бесплатного
          домашнего ознакомительного просмотра.
        </p>
      </div>
    </Footer>
  );
};

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1d1d1dcc;
  margin: 10px;
  border-radius: 20px;
  padding: 25px;
  font-size: 20px;
  .footerLeft {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .footerLeftTop {
    margin-bottom: 65px;
  }
  .footerLeftTop p {
    color: #acacac;
    margin: 0;
    padding-bottom: 5px;
  }
  .footerLeftBottom {
    display: flex;
  }
  .footerRight {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
  .footerRight h3 {
    color: #fff;
    font-size: 32px;
    margin: 0;
    font-weight: 100;
    padding-bottom: 10px;
  }
  .footerRight p {
    color: #4e4e4e;
    line-height: 1.5;
    margin: 0;
  }
`;

const HomeLink = styled(Link)`
  text-decoration: inherit;
  width: 151px;
  height: 50px;
  color: #fff;
  font-size: 42px;
  font-weight: 700;
`;

const DevelopedByLink = styled(Link)`
  color: #acacac;
  margin: 0;
  &:hover {
    color: #ff005c;
    transition-duration: 0.3s;
    text-decoration: inherit;
  }
`;

const TelegramLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
  width: 60px;
  height: 30px;
  margin-right: 30px;
  text-decoration: inherit;
`;

export default FooterItem;
