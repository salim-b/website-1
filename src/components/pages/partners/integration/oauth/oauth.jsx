import Image from 'next/image';

import CardItemsList from '../card-items-list';
import appStoreIcon from '../images/app-store.svg';
import bookIcon from '../images/book.svg';
import fileIcon from '../images/file.svg';
import image from '../images/oauth.jpg';

const items = [
  {
    icon: fileIcon,
    title: 'Docs',
    description: 'Learn more about OAuth integration',
    url: '/docs/guides/oauth-integration',
  },
  {
    icon: appStoreIcon,
    title: 'Example app',
    description: 'See an example OAuth app',
    url: 'https://neon-experimental.vercel.app/',
  },
  {
    icon: bookIcon,
    title: 'Blog post',
    description: 'See the integration in action',
    url: '/blog/api-cf-drizzle-neon',
  },
];

const Oauth = () => (
  <div className="oauth mt-[120px] grid w-full grid-cols-10 items-center gap-x-10 xl:mt-24 xl:gap-x-6 lg:mt-8 lg:gap-y-7 md:mt-6 md:gap-y-6">
    <div className="col-span-5 lg:col-span-full">
      <h3 className="text-4xl font-medium leading-tight tracking-tighter xl:text-[32px] lg:text-center lg:text-[28px] md:text-[22px]">
        OAuth
      </h3>
      <p className="mt-5 max-w-[590px] text-lg font-light leading-snug xl:mt-4 xl:text-base lg:mx-auto lg:max-w-[584px] lg:text-center md:mt-2.5">
        The Neon API allows you to manage Neon programmatically. With the Neon API, you can create
        and manage all objects in your&nbsp;Neon account.
      </p>
      <CardItemsList className="lg:hidden" items={items} />
    </div>
    <div className="col-span-5 lg:col-span-full">
      <Image className="rounded-[10px]" src={image} quality={85} alt="Authorize Hasura Cloud" />
    </div>
    <CardItemsList className="col-span-full hidden lg:grid" items={items} ariaHidden />
  </div>
);

export default Oauth;
