import { Link } from 'react-router-dom';

type Props = {
  img: string;
  url: string;
  title: string;
};

export const ServiceCard = ({ img, url, title }: Props) => {
  return (
    <Link className="service-card mt-3" to={url}>
      <div className="service-img shadow-sm">
        <img src={img} alt={title} />
      </div>
      <h4 className="">{title}</h4>
    </Link>
  );
};
