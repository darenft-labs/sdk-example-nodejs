import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react"
import { Tabs } from "antd"
import clsx from "clsx"
import i18next from "i18next"
import { CustomIcon } from "@/shared/components/custom-icon"
const t = i18next.getFixedT(null, "shared")
import "./index.css"

interface OptionButtonProp
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const OptionButton = (props: OptionButtonProp) => {
  return (
    <button {...props} className={clsx("inactive-button", props.className)}>
      {props?.children}
    </button>
  )
}

const NotiItem = () => {
  return (
    <div className="noti-item-contaner">
      <CustomIcon iconName="list-check" className="w-4 h-4 flex-none mt-1" />
      <div className="grow space-y-1">
        <p className="mess-detail">
          Your offer to buy HeroSupperBrawl #12345 at 0.2 BNB has expired. Offer price has been
          refunded to your bidding wallet
        </p>
        <p className="mess-time">2h ago</p>
      </div>
      <div className={clsx("mess-active")} />
    </div>
  )
}

export const NotiComponent = () => {
  const [valueTab, setValueTab] = useState(0)

  return (
    <div className="group relative w-10 flex items-center justify-center">
      <button className="bell-container">
        <CustomIcon iconName="bell" />
        <div className="absolute -right-2.5 -top-2 bg-green-blue w-5 h-5 rounded-full text-white text-xxs pt-0.5">
          12
        </div>
      </button>

      <div className="noti-info-container h-10">
        <div className="noti-info-content">
          <p className="label">{t("notification.label")}</p>
          <div className="tab-noti-container">
            <OptionButton
              className={clsx(valueTab === 0 && "active-button")}
              onClick={() => setValueTab(0)}
            >
              {t("notification.all")}
            </OptionButton>
            <OptionButton
              className={clsx(valueTab === 1 && "active-button")}
              onClick={() => setValueTab(1)}
            >
              {t("notification.unread")}
            </OptionButton>
            <button className="mark-all-text">{t("notification.mark-all")}</button>
          </div>

          <Tabs
            defaultActiveKey={valueTab.toString()}
            activeKey={valueTab.toString()}
            className="!flex !flex-row !mt-4"
            tabBarStyle={{
              contentVisibility: "hidden",
            }}
          >
            <Tabs.TabPane key="0" className="tab-noti-pane">
              {Array(0)
                .fill(1)
                .map((i, idx) => (
                  <NotiItem key={idx} />
                ))}
            </Tabs.TabPane>
            <Tabs.TabPane key="1" className="tab-noti-pane">
              {Array(0)
                .fill(1)
                .map((i, idx) => (
                  <NotiItem key={idx} />
                ))}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
