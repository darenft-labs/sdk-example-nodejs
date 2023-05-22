import SuccessIcon from "@/assets/icons/success.svg"
import WarningIcon from "@/assets/icons/warning.svg"
import ErrorIcon from "@/assets/icons/error.svg"

export const BaseNotiData = {
  success: {
    icon: <img src={SuccessIcon} alt="success" className="w-10" />,
    title: <span className="text-white font-bold pl-4">Success</span>,
    className: "!bg-bluish-green-500 text-white w-400 flex gap-12",
    description: (event: string) => <span className="text-sm pl-4">{event}</span>,
  },
  warning: {
    icon: <img src={WarningIcon} alt="warning" />,
    title: <span className="text-pastel-red font-bold pl-4">Warning</span>,
    className: "!bg-melon-600 text-pastel-red w-400 flex gap-12",
    description: (event: string) => <span className="text-sm pl-4">{event}</span>,
  },
  error: {
    icon: <img src={ErrorIcon} alt="error" />,
    title: <span className="text-white font-bold pl-4">Error</span>,
    className: "!bg-light-maroon text-white w-400",
    description: (event: string) => <span className="text-sm pl-4">{event}</span>,
  },
}
