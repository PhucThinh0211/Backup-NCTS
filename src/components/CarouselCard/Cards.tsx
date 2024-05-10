import {
    CalendarOutlined,
    UserOutlined
} from '@ant-design/icons'
import '@/pages/Home/HomeStyle.css' 


type Props = {
  img: string;
  date: string;
  author: string;
  title: string;
  desc: string;
  
};

const CardNews = ({ 
  img, date, author ,title, desc }: Props) => {
  return (
    <div className="cardNews shadow" >
        <div className="cardImg">
            <img src={img} alt={title}  />
        </div>
        <div className="d-flex flex-row gap-5">
            <div className="d-flex flex-row gap-1"> <CalendarOutlined /> {date} </div>
            <div className="d-flex flex-row gap-1" > <UserOutlined /> {author} </div>
        </div>
        <div>
            <h5 className="cardTitle">{title}</h5>
            <p className="cardDesc">{desc}</p>
        </div>
    </div>
  );
};

export default CardNews
