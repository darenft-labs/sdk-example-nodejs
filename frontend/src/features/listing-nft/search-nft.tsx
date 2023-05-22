import { useFilterQuery } from "@/hooks/use-filter-query"
import { CustomIcon, Input } from "@/shared/components"
import React, { useState } from "react"

const SearchNft = () => {
  // const { filters, onFilter } = useFilterQuery()
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (value: string) => {
    //TODO: Search
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="h-14 lg:w-[900px] w-full relative">
        <Input
          placeholder="Enter collection address or token ID to search"
          className="bg-gray-300 !h-14 !tracking-[2%] !px-[15px] lg:!text-[13px] !text-[11px] !leading-[18px] !text-black placeholder:text-light-gray-100 lg:placeholder:text-[12px] placeholder:text-[10px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onBlur={(e) => handleSearch(e?.target?.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e?.target?.value)
            }
          }}
        />
        <CustomIcon iconName="search" className="absolute right-3 top-1/2 translate-y-[-50%]" />
      </div>
    </div>
  )
}

export default SearchNft
