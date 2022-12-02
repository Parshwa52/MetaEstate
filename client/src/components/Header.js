
import React, { useEffect, useState, useContext } from "react";
import BlockchainContext from "../contexts/BlockchainContext";
const Header = () => {

  const { web3, accounts, propNFTContract, morterContract, auctionContract, propNFTContractAddress, morterContractAddress, auctionContractAddress } = useContext(BlockchainContext);
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {

    console.log({ web3, accounts, propNFTContract, morterContract, auctionContract, propNFTContractAddress, morterContractAddress, auctionContractAddress });
    const init = async () => {
      const accountsNow = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accountsNow[0]);
    }
    init();

    const listener = (accs) => {
      setCurrentAccount(accs[0]);
    };

    window.ethereum.on("accountsChanged", listener);


  }, []);
  return (
    <>
      <div className="min-h-[100px]" style={{ backgroundColor: "#11468F" }}>
        <header
          id="sticky-header"
          className="relative bg-[#EEEEE] lg:py-[30px] z-[25] secondary-sticky"
        // style={{ backgroundColor: "#3AB4F2" }}
        >
          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div className="flex flex-wrap items-center justify-between">
                  <a
                    href="/"
                    className="text-black transition-all hover:text-secondary"
                    style={{
                      fontSize: "32px",
                      fontFamily: "Georgia",
                      fontWeight: "700",
                    }}
                  >
                    HomeLand
                  </a>
                  <nav
                    className="flex flex-wrap items-center"
                    style={{
                      fontSize: "22px",
                      fontFamily: "Georgia",
                      fontWeight: "700",
                    }}
                  >
                    <ul className="hidden lg:flex flex-wrap items-center font-lora  leading-none text-black">
                      <li className="mr-7 xl:mr-[40px] relative group py-[20px]">
                        <a
                          href="/"
                          className="transition-all hover:text-secondary"
                        >
                          Home
                        </a>
                      </li>

                      <li className="mr-7 xl:mr-[40px] relative group py-[20px]">
                        <a
                          href="/listings"
                          className="transition-all hover:text-secondary"
                        >
                          Properties
                        </a>
                      </li>
                      <li className="mr-7 xl:mr-[40px] relative group py-[20px]">
                        <a
                          href="/about"
                          className="transition-all hover:text-secondary"
                        >
                          About
                        </a>
                      </li>
                      <li className="mr-7 xl:mr-[40px] relative group py-[20px]">
                        <a
                          href="/dashboard"
                          className="transition-all hover:text-secondary"
                        >
                          Dashboard
                        </a>
                      </li>
                    </ul>

                    <ul
                      className="flex flex-wrap items-center"
                      style={{
                        fontSize: "22px",
                        fontFamily: "Georgia",
                        fontWeight: "700",
                      }}
                    >
                      <li>
                        <a
                          href="/#"
                          className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white hidden sm:block  relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
                        >
                          {currentAccount ? currentAccount : "Connect Wallet"}
                        </a>
                      </li>
                      <li className="ml-2 sm:ml-5 lg:hidden">
                        <a
                          href="#offcanvas-mobile-menu"
                          className="offcanvas-toggle flex text-[#016450] hover:text-secondary"
                        >
                          <svg
                            width="24"
                            height="24"
                            className="fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="offcanvas-overlay hidden fixed inset-0 bg-black opacity-50 z-50"></div>

      <div
        id="offcanvas-mobile-menu"
        className="offcanvas left-0 transform -translate-x-full fixed font-normal text-sm top-0 z-50 h-screen xs:w-[300px] lg:w-[380px] transition-all ease-in-out duration-300 bg-white"
      >
        <div className="py-12 pr-5 h-[100vh] overflow-y-auto">
          {/* <!-- close button start --> */}
          <button
            className="offcanvas-close text-primary text-[25px] w-10 h-10 absolute right-0 top-0 z-[1]"
            aria-label="offcanvas"
          >
            x
          </button>
          {/* <!-- close button end -->

        <!-- offcanvas-menu start --> */}

          <nav className="offcanvas-menu mr-[20px]">
            <ul>
              <li className="relative block border-b-primary border-b first:border-t first:border-t-primary">
                <a
                  href="/"
                  className="block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  Home
                </a>
              </li>
              <li className="relative block border-b-primary border-b">
                <a
                  href="about.html"
                  className="block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  About
                </a>
              </li>
              <li className="relative block border-b-primary border-b">
                <a
                  href="/#"
                  className="block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  Properties
                </a>
                <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                  <li>
                    <a
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                      href="/#"
                    >
                      Properties
                    </a>
                    <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                      <li>
                        <a
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                          href="properties-v1.html"
                        >
                          {" "}
                          properties v1
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                          href="properties-v2.html"
                        >
                          {" "}
                          properties v2
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                          href="add-properties.html"
                        >
                          add properties{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                      href="/#"
                    >
                      Properties with sidebar
                    </a>
                    <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                      <li>
                        <a
                          href="properties-left-side-bar.html"
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                        >
                          properties left side bar
                        </a>
                      </li>
                      <li>
                        <a
                          href="properties-right-side-bar.html"
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                        >
                          properties right side bar
                        </a>
                      </li>

                      <li>
                        <a
                          href="properties-list-left-side-bar.html"
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                        >
                          properties list left side bar
                        </a>
                      </li>

                      <li>
                        <a
                          href="properties-list-right-side-bar.html"
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                        >
                          properties list right side bar
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                      href="/#"
                    >
                      Property Details
                    </a>

                    <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                      <li>
                        <a
                          href="add-properties.html"
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                        >
                          add properties
                        </a>
                      </li>

                      <li>
                        <a
                          href="properties-details.html"
                          className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                        >
                          properties details
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="relative block border-b-primary border-b">
                <a
                  href="/#"
                  className="relative block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  Pages
                </a>

                <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                  <li>
                    <a
                      href="service.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="single-service.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      single service
                    </a>
                  </li>
                  <li>
                    <a
                      href="contact-us.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      contact us
                    </a>
                  </li>
                  <li>
                    <a
                      href="create-agency.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      create agency
                    </a>
                  </li>
                  <li>
                    <a
                      href="login.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      login
                    </a>
                  </li>
                  <li>
                    <a
                      href="register.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      register
                    </a>
                  </li>
                </ul>
              </li>

              <li className="relative block border-b-primary border-b">
                <a
                  href="/#"
                  className="relative block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  agency
                </a>

                <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                  <li>
                    <a
                      href="agency.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      agency
                    </a>
                  </li>
                  <li>
                    <a
                      href="create-agency.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      create agency
                    </a>
                  </li>

                  <li>
                    <a
                      href="agent.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      agent
                    </a>
                  </li>

                  <li>
                    <a
                      href="agency-details.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      agency details
                    </a>
                  </li>

                  <li>
                    <a
                      href="agent-details.html"
                      className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                    >
                      agent details
                    </a>
                  </li>
                </ul>
              </li>

              <li className="relative block border-b-primary border-b">
                <a
                  href="/#"
                  className="relative block capitalize text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  Blog
                </a>

                <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                  <li>
                    <a
                      href="blog-grid.html"
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                    >
                      blog grid
                    </a>
                  </li>
                  <li>
                    <a
                      href="blog-grid-left-side-bar.html"
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                    >
                      blog grid left side bar
                    </a>
                  </li>
                  <li>
                    <a
                      href="blog-grid-right-side-bar.html"
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                    >
                      blog grid right side bar
                    </a>
                  </li>
                  <li>
                    <a
                      href="blog-details.html"
                      className="text-sm py-2 px-[30px] text-black font-light block transition-all hover:text-secondary"
                    >
                      blog details
                    </a>
                  </li>
                </ul>
              </li>
              <li className="relative block border-b-primary border-b">
                <a
                  href="contact.html"
                  className="relative block capitalize text-black hover:text-secondary text-base my-2 py-1 px-5"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          {/* <!-- offcanvas-menu end --> */}

          <div className="px-5 flex flex-wrap mt-3 sm:hidden">
            <a
              href="/#"
              className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
            >
              Add Property
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
