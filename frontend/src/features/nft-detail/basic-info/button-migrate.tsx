import { Button } from "@/shared/components"
import React from "react"

const ButtonMigrate = () => {
  return (
    <div>
      <Button
        fillVariant="flat"
        className="rounded w-[320px] h-12 font-semibold !text-base !bg-light-orange"
        // onClick={handleOpen}
      >
        Migrate into NFT2.0
      </Button>
    </div>
  )
}

export default ButtonMigrate
