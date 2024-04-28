import { Link } from 'react-router-dom';
import arrowRight from '@/assets/icon/arrow-right.svg';

interface ProfileLinkContainerProp {
  path: string;
  title: string;
  discription: string;
}

const LinkContainer = ({
  path,
  title,
  discription,
}: ProfileLinkContainerProp) => {
  return (
    <section className="flex flex-col items-start hover:scale-110 duration-200">
      <Link to={path} className="text-custom text-3xl">
        <div className="flex items-center">
          <div>{title}</div>
          <img src={arrowRight} alt="arrow-right" width="32px" height="32px" />
        </div>
      </Link>
      <div className="text-sm text-gray-400">{discription}</div>
    </section>
  );
};

export default LinkContainer;
