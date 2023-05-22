import closeGrayIc from "@/assets/icons/close-gray.svg"
import closeBlueIc from "@/assets/icons/close.svg"
import closeIc from "@/assets/icons/close-icon.svg"
import videoGameIc from "@/assets/icons/video-game.svg"
import starCalendarIc from "@/assets/icons/star-calendar.svg"
import boxIc from "@/assets/icons/box.svg"
import rocketIc from "@/assets/icons/rocket.svg"
import chevronDownIc from "@/assets/icons/chevron-down.svg"
import saveIc from "@/assets/icons/save.svg"
import cameraIc from "@/assets/icons/camera.svg"
import pencilIc from "@/assets/icons/pencil.svg"
import pencilFillWhiteIc from "@/assets/icons/pencil-fill-white.svg"
import recycleBinIc from "@/assets/icons/recycle-bin.svg"
import walletIc from "@/assets/icons/wallet.svg"
import gameControllerIc from "@/assets/icons/game-controller.svg"
import downIc from "@/assets/icons/down.svg"
import nextIc from "@/assets/icons/next.svg"
import upIc from "@/assets/icons/up.svg"
import bitcoinTalkIc from "@/assets/icons/bitcoin-talk.svg"
import webIc from "@/assets/icons/device-web.svg"
import iocIc from "@/assets/icons/device-ios.svg"
import androidIc from "@/assets/icons/device-android.svg"
import linuxIc from "@/assets/icons/device-linux.svg"
import windowIc from "@/assets/icons/device-windows.svg"
import xBoxIc from "@/assets/icons/device-xbox.svg"
import playstationIc from "@/assets/icons/device-playstation.svg"
import macIc from "@/assets/icons/device-mac.svg"
import nintendoIc from "@/assets/icons/device-nintendo.svg"
import crossIc from "@/assets/icons/cross.svg"
import infoIc from "@/assets/icons/info.svg"
import infoGreyIc from "@/assets/icons/info-grey.svg"
import arrowLeftIc from "@/assets/icons/arrow-left.svg"
import arrowIc from "@/assets/icons/arrow.svg"
import arrowDownSelectIc from "@/assets/icons/arrow-down-select.svg"
import searchIc from "@/assets/icons/search.svg"
import settingIc from "@/assets/icons/setting.svg"
import viewGridIc from "@/assets/icons/view-grid.svg"
import viewListIc from "@/assets/icons/view-list.svg"
import closeGreyIc from "@/assets/icons/close-grey.svg"
import closeGrayDefaultIc from "@/assets/icons/close-gray-default.svg"
import closeRedIc from "@/assets/icons/close-red.svg"
import chevronLeftIc from "@/assets/icons/chevron-left.svg"
import websiteIc from "@/assets/icons/website.svg"
import twitterIc from "@/assets/icons/twitter.svg"
import discordIc from "@/assets/icons/discord.svg"
import telegramIc from "@/assets/icons/telegram.svg"
import githubIc from "@/assets/icons/github.svg"
import youtubeIc from "@/assets/icons/youtube.svg"
import instagramIc from "@/assets/icons/instagram.svg"
import redditIc from "@/assets/icons/reddit.svg"
import mediumIc from "@/assets/icons/medium.svg"
import gitbookIc from "@/assets/icons/gitbook.svg"
import facebookIc from "@/assets/icons/facebook.svg"
import steamIc from "@/assets/icons/steam.svg"
import twitchIc from "@/assets/icons/twitch.svg"
import phoneIc from "@/assets/icons/phone.svg"
import mailIc from "@/assets/icons/mail.svg"
import locationMarkerIc from "@/assets/icons/location-marker.svg"
import clockIc from "@/assets/icons/clock.svg"
import walletConnect from "@/assets/icons/wallet-connect.svg"
import success from "@/assets/icons/success.svg"
import heartIc from "@/assets/icons/heart.svg"
import shareIc from "@/assets/icons/share.svg"
import eyeIc from "@/assets/icons/eye.svg"
import copyIc from "@/assets/icons/copy.svg"
import refeshIc from "@/assets/icons/refresh.svg"
import increaseIc from "@/assets/icons/up.svg"
import goBackIc from "@/assets/icons/go-back.svg"
import nextArrow from "@/assets/icons/next-arrow.svg"
import bigNextArrow from "@/assets/icons/big-next-arrow.svg"
import bigBackArrow from "@/assets/icons/big-back-arrow.svg"
import prevArrow from "@/assets/icons/prev-arrow.svg"
import optionIc from "@/assets/icons/option-icon.svg"
import arrowUp from "@/assets/icons/arrow-up.svg"
import arrowUpGreen from "@/assets/icons/arrow-up-green.svg"
import arrowDownRed from "@/assets/icons/arrow-down-red.svg"
import arrowDownBlack from "@/assets/icons/arrow-down-black.svg"
import writingIc from "@/assets/icons/writing.svg"
import emptyImage from "@/assets/icons/empty-image.svg"
import blackCloseIc from "@/assets/icons/black-close.svg"
import listCheckIc from "@/assets/icons/list-check.svg"
import walletConnectSelect from "@/assets/icons/wallet-connect-select.svg"
import bell from "@/assets/icons/bell.svg"
import logout from "@/assets/icons/logout.svg"
import chainIconWallet from "@/assets/icons/chain-icon-wallet.svg"
import star from "@/assets/icons/star.svg"
import exclamationIc from "@/assets/icons/exclamation.svg"
import arrowSmallLeftIc from "@/assets/icons/arrow-small-left.svg"
import chevronDownPoloBlueIc from "@/assets/icons/chevron-down-polo-blue.svg"
import currencyIcon from "@/assets/icons/currency-icon.svg"
import blueRightArrow from "@/assets/icons/blue-right-arrow.svg"
import starBoard from "@/assets/icons/star-board.svg"
import medalIc from "@/assets/icons/medal.svg"
import sliderNextArrow from "@/assets/icons/slider-next-arrow.svg"
import sliderPrevArrow from "@/assets/icons/slider-prev-arrow.svg"
import ticketIc from "@/assets/icons/ticket.svg"
import blockIc from "@/assets/icons/block.svg"
import rewardIc from "@/assets/icons/rewards.svg"
import whiteDownArrow from "@/assets/icons/white-down-arrow.svg"
import creditCardIc from "@/assets/icons/credit-card.svg"
import closeModalIc from "@/assets/icons/close-modal.svg"
import bscTestnet from "@/assets/icons/bsc-testnet.svg"
import migratedArrow from "@/assets/icons/migrated-arrow.svg"
import refreshIc from "@/assets/icons/refresh.svg"

interface Props
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  iconName: IconName
}

export function CustomIcon({ iconName, ...props }: Props) {
  switch (iconName) {
    case "black-close-icon":
      return <img src={blackCloseIc} alt="close" {...props} />
    case "close-icon":
      return <img src={closeIc} alt="close" {...props} />
    case "close-icon-gray":
      return <img src={closeGrayIc} alt="close" {...props} />
    case "close-icon-blue":
      return <img src={closeBlueIc} alt="close" {...props} />
    case "video-game":
      return <img src={videoGameIc} alt="video-game" {...props} />
    case "star-calendar":
      return <img src={starCalendarIc} alt="star-calendar" {...props} />
    case "box":
      return <img src={boxIc} alt="box" {...props} />
    case "chevron-down":
      return <img src={chevronDownIc} alt="rocket" {...props} />
    case "save":
      return <img src={saveIc} alt="rocket" {...props} />
    case "camera":
      return <img src={cameraIc} alt="rocket" {...props} />
    case "pencil":
      return <img src={pencilIc} alt="pencil" {...props} />
    case "pencil-fill-white":
      return <img src={pencilFillWhiteIc} alt="pencil" {...props} />
    case "recycle-bin":
      return <img src={recycleBinIc} alt="recycle-bin" {...props} />
    case "game-controller":
      return <img src={gameControllerIc} alt="game-controller" {...props} />
    case "rocket":
      return <img src={rocketIc} alt="rocket" {...props} />
    case "down":
      return <img src={downIc} alt="down" {...props} />
    case "next":
      return <img src={nextIc} alt="next" {...props} />
    case "up":
      return <img src={upIc} alt="up" {...props} />
    case "website":
      return <img src={websiteIc} alt="website" {...props} />
    case "twitter":
      return <img src={twitterIc} alt="twitter" {...props} />
    case "discord":
      return <img src={discordIc} alt="discord" {...props} />
    case "telegram":
      return <img src={telegramIc} alt="telegram" {...props} />
    case "github":
      return <img src={githubIc} alt="github" {...props} />
    case "youtube":
      return <img src={youtubeIc} alt="youtube" {...props} />
    case "instagram":
      return <img src={instagramIc} alt="instagram" {...props} />
    case "reddit":
      return <img src={redditIc} alt="reddit" {...props} />
    case "medium":
      return <img src={mediumIc} alt="medium" {...props} />
    case "gitbook":
      return <img src={gitbookIc} alt="gitbook" {...props} />
    case "bitcointalk":
      return <img src={bitcoinTalkIc} alt="bitcointalk" {...props} />
    case "web":
      return <img src={webIc} alt="web" {...props} />
    case "ios":
      return <img src={iocIc} alt="ios" {...props} />
    case "android":
      return <img src={androidIc} alt="android" {...props} />
    case "linux":
      return <img src={linuxIc} alt="linux" {...props} />
    case "windows":
      return <img src={windowIc} alt="windows" {...props} />
    case "xbox":
      return <img src={xBoxIc} alt="xbox" {...props} />
    case "playstation":
      return <img src={playstationIc} alt="playstation" {...props} />
    case "mac":
      return <img src={macIc} alt="mac" {...props} />
    case "nintendo":
      return <img src={nintendoIc} alt="nintendo" {...props} />
    case "cross":
      return <img src={crossIc} alt="cross" {...props} />
    case "info":
      return <img src={infoIc} alt="info" {...props} />
    case "info-grey":
      return <img src={infoGreyIc} alt="infoGreyIc" {...props} />
    case "arrow-left":
      return <img src={arrowLeftIc} alt="arrow-left" {...props} />
    case "arrow":
      return <img src={arrowIc} alt="arrow" {...props} />
    case "arrow-down-select":
      return <img src={arrowDownSelectIc} alt="arrow-down-select" {...props} />
    case "search":
      return <img src={searchIc} alt="search" {...props} />
    case "setting":
      return <img src={settingIc} alt="setting" {...props} />
    case "view-grid":
      return <img src={viewGridIc} alt="view-grid" {...props} />
    case "view-list":
      return <img src={viewListIc} alt="view-list" {...props} />
    case "close-grey":
      return <img src={closeGreyIc} alt="close-grey" {...props} />
    case "close-gray-default":
      return <img src={closeGrayDefaultIc} alt="close-gray-default" {...props} />
    case "close-red":
      return <img src={closeRedIc} alt="close-red" {...props} />
    case "chevron-left":
      return <img src={chevronLeftIc} alt="chevron-left" {...props} />
    case "facebook":
      return <img src={facebookIc} alt="facebook" {...props} />
    case "steam":
      return <img src={steamIc} alt="steam" {...props} />
    case "twitch":
      return <img src={twitchIc} alt="twitch" {...props} />
    case "success":
      return <img src={success} alt="success" {...props} />
    case "heart":
      return <img src={heartIc} alt="heart" {...props} />
    case "share":
      return <img src={shareIc} alt="share" {...props} />
    case "eye":
      return <img src={eyeIc} alt="eye" {...props} />
    case "copy":
      return <img src={copyIc} alt="copy" {...props} />
    case "refesh":
      return <img src={refeshIc} alt="refesh" {...props} />
    case "increase":
      return <img src={increaseIc} alt="increase" {...props} />
    case "go-back":
      return <img src={goBackIc} alt="go-back" {...props} />
    case "phone":
      return <img src={phoneIc} alt="phone" {...props} />
    case "mail":
      return <img src={mailIc} alt="mail" {...props} />
    case "location-marker":
      return <img src={locationMarkerIc} alt="location-marker" {...props} />
    case "clock":
      return <img src={clockIc} alt="clock" {...props} />
    case "wallet-connect":
      return <img src={walletConnect} alt="wallet-connect" {...props} />
    case "wallet-connect-select":
      return <img src={walletConnectSelect} alt="wallet-connect-select" {...props} />
    case "next-arrow":
      return <img src={nextArrow} alt="next-arrow" {...props} />
    case "prev-arrow":
      return <img src={prevArrow} alt="prev-arrow" {...props} />
    case "big-next-arrow":
      return <img src={bigNextArrow} alt="big-next-arrow" {...props} />
    case "big-back-arrow":
      return <img src={bigBackArrow} alt="big-back-arrow" {...props} />
    case "option-icon":
      return <img src={optionIc} alt="option-icon" {...props} />
    case "arrow-up-green":
      return <img src={arrowUpGreen} alt="arrow-up-green" {...props} />
    case "arrow-down-red":
      return <img src={arrowDownRed} alt="arrow-down-red" {...props} />
    case "arrow-down-black":
      return <img src={arrowDownBlack} alt="arrow-down-black" {...props} />
    case "writing":
      return <img src={writingIc} alt="writing" {...props} />
    case "arrow-up":
      return <img src={arrowUp} alt="arrow-down-red" {...props} />
    case "list-check":
      return <img src={listCheckIc} alt="icon" {...props} />
    default:
      return <img src={walletIc} alt="wallet" {...props} />
    case "bell":
      return <img src={bell} alt="bell" {...props} />
    case "chain-icon-wallet":
      return <img src={chainIconWallet} alt="chain-icon-wallet" {...props} />
    case "empty-image":
      return <img src={emptyImage} alt="empty-image" {...props} />
    case "star":
      return <img src={star} alt="star" {...props} />
    case "star-board":
      return <img src={starBoard} alt="star-board" {...props} />
    case "exclamation":
      return <img src={exclamationIc} alt="exclamation" {...props} />
    case "arrow-small-left":
      return <img src={arrowSmallLeftIc} alt="arrow-small-left" {...props} />
    case "logout":
      return <img src={logout} alt="logout" {...props} />
    case "blue-right-arrow":
      return <img src={blueRightArrow} alt="blue-right-arrow" {...props} />
    case "currency-icon":
      return <img src={currencyIcon} alt="currency-icon" {...props} />
    case "medal":
      return <img src={medalIc} alt="medal" {...props} />
    case "slider-next-arrow":
      return <img src={sliderNextArrow} alt="slider-next-arrow" {...props} />
    case "slider-prev-arrow":
      return <img src={sliderPrevArrow} alt="slider-prev-arrow" {...props} />
    case "ticket":
      return <img src={ticketIc} alt="ticket" {...props} />
    case "block":
      return <img src={blockIc} alt="block" {...props} />
    case "reward":
      return <img src={rewardIc} alt="reward" {...props} />
    case "white-down-arrow":
      return <img src={whiteDownArrow} alt="white-down-arrow" {...props} />

    case "close-modal":
      return <img src={closeModalIc} alt="close-modal" {...props} />
    case "chevron-down-polo-blue":
      return <img src={chevronDownPoloBlueIc} alt="chevron-down-polo-blue" {...props} />
    case "credit-card":
      return <img src={creditCardIc} alt="credit-card" {...props} />
    case "bsc-testnet":
      return <img src={bscTestnet} alt="bsc-testnet" {...props} />
    case "migrated-arrow":
      return <img src={migratedArrow} alt="migrated-arrow" {...props} />
    case "refresh":
      return <img src={refreshIc} alt="refresh" {...props} />
  }
}
