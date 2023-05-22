import logo from "@/assets/icons/logo.svg"
import dareNftLogo from "@/assets/icons/darenft-logo.svg"
import { CustomIcon } from "@/shared/components"
import i18n from "@/i18n/config"

const socialNetworks = [
  {
    href: "https://twitter.com/darenft",
    iconName: "twitter",
    name: "twitter",
  },
  {
    href: "https://www.facebook.com/groups/darenft",
    iconName: "facebook",
    name: "facebook",
  },
  {
    href: "https://medium.com/darenft",
    iconName: "medium",
    name: "medium",
  },
  {
    href: "https://t.me/darenft_official",
    iconName: "telegram",
    name: "telegram",
  },
]

const Footer = () => {
  const contactStyle =
    "marker:text-grey-blue hover:marker:text-white hover:underline hover:decoration-white hover:underline-offset-3 cursor-pointer"
  const contactPlatformStyle = "flex gap-x-2 cursor-pointer"

  return (
    <footer className="grow-0 relative bg-dark-strong-blue">
      <div className="w-full px-4 xl:px-14 2xl:px-48 3xl:px-64 py-10 lg:py-28 grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-8">
        {/* Logo branch  */}
        <div className=" mt-[-20px]">
          <div className="flex items-center cursor-pointer h-[80px]">
            <img src={logo} alt="logo" className="w-[90px] h-[66px]" />
            <div className="ml-1">
              <span className="text-lg leading-6 font-semibold text-white">DarePlay</span>
            </div>
          </div>
          <div className="text-white text-base leading-[26px] mt-2">
            A one-stop destination for web3 gaming.
          </div>
          <div className="flex items-center mt-5">
            <span className="text-white text-xs ">Powered by</span>
            <img src={dareNftLogo} alt="Dare NFT" />
          </div>
        </div>

        {/* Address  */}
        <div className="grid gap-4 text-white">
          <div className="uppercase text-strong-gray-100 font-semibold text-[12px]">
            Information
          </div>
          <div className="flex">
            <CustomIcon iconName="phone" className="w-[19px] h-[19px]" />
            <p className="ml-[9px] inline-block mb-0">+84 973 129 043</p>
          </div>
          <div className="flex">
            <CustomIcon iconName="mail" className="w-[19px] h-[19px]" />
            <a href="mailto:contact@dareplay.io" className="text-white ml-[9px]">
              contact@dareplay.io
            </a>
          </div>
          <div className="flex">
            <CustomIcon iconName="location-marker" className="w-[19px] h-[19px]" />
            <a
              href="https://goo.gl/maps/L23U5rjxJa4wAFgu8"
              target="_blank"
              className="text-white ml-[9px]"
            >
              66 Rangoon Road, 218356, Singapore
            </a>
          </div>
          <div className="flex">
            <CustomIcon iconName="clock" className="w-[19px] h-[19px]" />
            <p className="ml-[9px]">Monday – Friday, 8 a.m. – 6:00 p.m. EST</p>
          </div>
        </div>

        {/* Contact */}
        <div className="lg:col-span-1 grid grid-cols-2 justify-between gap-8 ">
          <div>
            <div className="uppercase text-strong-gray-100 font-semibold text-[12px] mb-[18px]">
              About
            </div>
            <ul className="list-disc pl-4 text-white space-y-4 marker:!text-white">
              <li className={contactStyle}>{i18n.t("Policy privacy")}</li>
              <li className={contactStyle}>{i18n.t("Terms of Use")}</li>
              <li className={contactStyle}>{i18n.t("Disclaimer")}</li>
            </ul>
          </div>

          <ul className="space-y-4">
            <div className="uppercase text-strong-gray-100 font-semibold text-[12px]">Social</div>
            {socialNetworks.map((item, key) => (
              <li className={contactPlatformStyle} key={key}>
                <CustomIcon iconName={item?.iconName as IconName} className="w-6" />
                <a
                  key={key}
                  href={item?.href}
                  target="_blank"
                  className="col-span-8 capitalize text-white"
                >
                  {item?.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
