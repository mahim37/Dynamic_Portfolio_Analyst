import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Card,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Collapse,
} from '@material-tailwind/react';
import sky from './assets/images/sky.svg';
import watercolor from './assets/images/watercolor.svg';

const profileMenuItems = [
  {
    label: 'My Profile',
  },
  {
    label: 'Edit Profile',
  },
  {
    label: 'Inbox',
  },
  {
    label: 'Help',
  },
  {
    label: 'Sign Out',
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Button
        size="sm"
        variant="gradient"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className=" hidden bg-blue-600 lg:inline-block"
      >
        <span>Get Started</span>
      </Button>

      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2 lg:ml-auto"
          >
            {/* <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          /> */}
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                    : ''
                }`}
              >
                {/* {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })} */}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? 'red' : 'inherit'}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
}

export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navbarOpacity = scrollPosition > 0 ? 0.7 : 1;

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:my-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="https://google.com" className="flex items-center">
          CarPool
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="https://google.com" className="flex items-center">
          Bus
        </a>
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar
        className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
        style={{ backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})` }}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="https://google.com"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Quick Car
          </Typography>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                label="Type here..."
                className="pr-20"
                containerProps={{
                  className: 'min-w-[288px]',
                }}
              />
              <Button size="sm" className="!absolute right-1 top-1 rounded">
                Search
              </Button>
            </div>
            {/* <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Buy Now</span>
            </Button> */}

            <ProfileMenu />

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        <Collapse open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" className="mb-2">
            <span>Get Started</span>
          </Button>
        </Collapse>
      </Navbar>
      <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src={watercolor}
          />
        </Card>
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src={sky}
          />
        </Card>
      </div>
    </>
  );
}
