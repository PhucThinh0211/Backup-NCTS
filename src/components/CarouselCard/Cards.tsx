import React from "react";
import '@/pages/Home/HomeStyle.css' 


type Props = {
  img: string;
  date: string;
  author: string;
  title: string;
  desc: string;
  
};

const CardNews = ({ 
  img, 
  title, desc }: Props) => {
  return (
    <div className="card p-3" >
        <img src={img}  />
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default CardNews
